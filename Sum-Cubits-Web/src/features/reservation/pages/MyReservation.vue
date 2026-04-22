<script setup lang="ts">
//import components
import Button from "primevue/button";
import Card from "primevue/card";
import Tag from "primevue/tag";
import Panel from "primevue/panel";
import Dialog from "primevue/dialog";
import MultiSelect from "primevue/multiselect";
import DatePicker from "primevue/datepicker";
import Message from "primevue/message";
import Select from "primevue/select";


//import services
import ReservationService from "@/features/reservation/services/ReservationService";
import LoungeService from "@/features/lounge/services/LoungeService";

// imprt Dtos
import type { ReservaDto } from "@/features/reservation/models/ReservaDto";
import type { TurnoDto } from "@/features/turns/models/TurnoDto";
import type { SalonDtos } from "@/features/lounge/models/SalonDtos";

//import Request/Response
import type { GetReservationListResponse } from "@/features/reservation/interfaces/GetReservationListResponse";
import type { CreateReservationRequest } from "@/features/reservation/interfaces/CreateReservationRequest";
import type { GetAvailableTurnsRequest } from "@/features/reservation/interfaces/GetAvailableTurnsRequest";
import type { GetAvailableTurnsResponse } from "@/features/reservation/interfaces/GetAvailableTurnsResponse";
import type { DeleteReservationRequest } from "@/features/reservation/interfaces/DeleteReservationRequest";
import type { GetSalonListRequest } from "@/features/lounge/interfaces/GetSalonListRequest";

import { onMounted, ref, computed} from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

// Auth, Router & i18n
const auth = useAuth0();
const { t } = useI18n();
const router = useRouter();

// service
const reservationService = new ReservationService();
const loungeService = new LoungeService();

//const
const showCreateModal = ref(false);
const selectedReservation = ref<Date>();
const selectedTurnos = ref<number[]>([]);
const turnosDisponibles = ref<TurnoDto[]>([]);
const availabilityMessage = ref<string | null>(null);
const salonList = ref<SalonDtos[]>(); // lista de salones disponibles
const salonSelectedId = ref<number | null>(null); // id del salón seleccionado
const minDate = ref<Date>(new Date());

// State Reservation
const reservations = ref<ReservaDto[]>([]);

//Methods
const getMyReservationList = async () => {
  const response: GetReservationListResponse =
    await reservationService.getMyReservationList();
  reservations.value = response.reservationDto;
};

const getAvailableTurns = async () => {
  if (!selectedReservation.value || !salonSelectedId.value) return;

  const fechaReserva = formatDate(selectedReservation.value);
  const request: GetAvailableTurnsRequest = {
    fechaReserva: fechaReserva,
    salonId: salonSelectedId.value || 0,
  };
  const response: GetAvailableTurnsResponse =
    await reservationService.getAvailableTurns(request);
  turnosDisponibles.value = response.turnsDtos || [];
};

const createReservation = async (fechaReservaRequest: string) => {
  const request: CreateReservationRequest = {
    fechaReserva: fechaReservaRequest,
    idSalon: salonSelectedId.value ?? 0,
    idTurnos: selectedTurnos.value,
  };
  await reservationService.createReservation(request);
  cancelEdit();
  await goToHome();
};

const deleteReservation = async (fechaReservaRequest: string) => {
  const request: DeleteReservationRequest = {
    fechaReserva: fechaReservaRequest,
  };
  await reservationService.deleteReservation(request);
  await goToHome();
};

const getSalonList = async () => {
  const request: GetSalonListRequest = {
    activo: true,
  };
  const response = await loungeService.getSalonList(request);
  salonList.value = response.salonDtos;
};

const hasReservations = computed(() => reservations.value.length > 0);

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const cancelEdit = () => {
  showCreateModal.value = false;
  selectedReservation.value = undefined;
  selectedTurnos.value = [];
  turnosDisponibles.value = [];
  availabilityMessage.value = null;
  salonSelectedId.value = null;
};

const goToHome = () => {
  getMyReservationList();
  router.push({ name: "my-reservation" });
};

//OnMounted home
onMounted(async () => {
  getMyReservationList();
  getSalonList();
});
</script>

<template>
  <div class="w-full">
    <div class="flex justify-content-end">
      <span class="text-xl">{{ t('myreservation.titles.myreservations') }}</span>
    </div>
    <div>
      <Panel toggleable class="border border-sky-900 rounded-lg shadow-sm">
        <template #header>
          <div class="flex align-items-center gap-3">
            <Button
              :label="t('myreservation.buttons.reserveroom')"
              icon="pi pi-calendar"
              class="p-button-rounded text-lg"
              size="small"
              variant="outlined"
              rounded
              severity="info"
              @click="showCreateModal = true"
            />
          </div>
        </template>
        <template #default>
          <!-- Empty State -->
          <div v-if="!hasReservations" class="text-center py-8">
            <p class="text-neutral-500">{{t('myreservation.select.nothavereservation')}}</p>
          </div>

          <!-- Reservations List -->
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <Card
              v-for="(reservation, index) in reservations"
              :key="index"
              class="border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <template #title
                ><i class="pi pi-calendar"></i>
                <span class="ml-2"> {{ reservation.fechaReserva }} </span>
              </template>
              <template #subtitle>
                <div class="flex flex-wrap gap-2 mt-2">
                  <div class="flex flex-wrap items-center gap-2">
                    <i class="pi pi-clock text-sm sm:text-base"></i>
                    <Tag
                      v-for="turno in reservation.listTurnsDto"
                      :key="turno.turnoId"
                      severity="primary"
                      class="text-xs sm:text-sm md:text-base px-2 py-1"
                      v-tooltip.bottom="{
                        value: `${turno.horaInicio} - ${turno.horaFin}`,
                        showOnDisabled: true,
                      }"
                    >
                      {{ turno.nombreTurno }}
                    </Tag>
                  </div>
                </div>
              </template>
              <template #content>
                <div class="grid">
                  <div class="col-12">
                    <div class="button-row">
                      <Button
                        icon="pi pi-trash"
                        text
                        rounded
                        size="small"
                        severity="danger"
                        @click="deleteReservation(reservation.fechaReserva)"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Panel>
    </div>

    <!-- Modal de Edición -->
    <Dialog
      v-model:visible="showCreateModal"
      :modal="true"
      :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :contentClass="'overflow-y-auto'"
      @hide="cancelEdit"
    >
      <template #header>
    <div class="flex flex-col gap-3">
      <!-- Fecha de Reserva -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-2">
        <div class="flex items-center gap-2">
          <span class="text-lg sm:text-xl whitespace-nowrap">
            {{ t('myreservation.buttons.createreserve') }}:
          </span>
        </div>
        <DatePicker
          v-model="selectedReservation"
          dateFormat="yy-mm-dd"
          :minDate="minDate"
          :placeholder="t('myreservation.select.selectedreserve')"
          class="w-full sm:w-auto sm:flex-1"
          @date-select="getAvailableTurns"
        />
      </div>
      
      <!-- Selección de Salón -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-2">
        <div class="flex items-center gap-2">
          <span class="text-lg sm:text-xl whitespace-nowrap">
            {{ t('myreservation.titles.room')}}:
          </span>
        </div>
        <Select
          v-model="salonSelectedId"
          :options="salonList"
          optionLabel="nombreSalon"
          optionValue="salonId"
          :placeholder="t('myreservation.select.selectedroom')"
          class="w-full sm:w-auto sm:flex-1"
          @change="getAvailableTurns"
        />
      </div>
    </div>
      </template>

      <div class="flex items-center gap-4 mb-1">
        <label for="turnos" class="font-semibold">
          <i class="pi pi-clock">
            <span class="text-xl ml-2">{{ t('myreservation.titles.turns')}}:</span>
          </i>
        </label>
        <MultiSelect
          v-model="selectedTurnos"
          :options="turnosDisponibles"
          optionLabel="nombreTurno"
          optionValue="turnoId"
          :placeholder="
            selectedReservation && turnosDisponibles.length === 0
              ? t('myreservation.select.availableshifts')
              : t('myreservation.select.shiftsnotavailable')
          "
          class="w-min-full"
          display="chip"
          :disabled="
            !selectedReservation ||
            turnosDisponibles.length === 0 ||
            !salonSelectedId
          "
          :show-toggle-all="false"
        />
      </div>

      <!-- Mensaje de disponibilidad -->
      <Message v-if="availabilityMessage" severity="warn" class="mt-3">
        {{ availabilityMessage }}
      </Message>

      <template #footer>
        <Button
          type="button"
          :label="t('myreservation.buttons.cancel')"
          class="p-button-secondary"
          variant="outlined"
          rounded
          @click="cancelEdit"
        />
        <Button
          type="button"
          :label="t('myreservation.buttons.save')"
          class="p-button-success mr-2"
          variant="outlined"
          rounded
          :disabled="!selectedReservation || selectedTurnos.length === 0"
          @click="
            createReservation(
              selectedReservation ? formatDate(selectedReservation) : '',
            )
          "
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped></style>
