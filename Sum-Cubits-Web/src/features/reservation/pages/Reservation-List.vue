<script setup lang="ts">
import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DatePicker from "primevue/datepicker";

import ReservationService from "@/features/reservation/services/ReservationService";

import type { ReservaDto } from "@/features/reservation/models/ReservaDto";

import { watch, ref, computed } from "vue";
import { useI18n } from "vue-i18n";

import type { GetReservationListRequest } from "@/features/reservation/interfaces/GetReservationListRequest";

// Auth, Router & i18n
const { t } = useI18n();

const reservationService = new ReservationService();

const selectedDate = ref<Date>()
const reservationSelected = ref<ReservaDto>()
const reservationsList = ref<ReservaDto[]>([])

const getReservationList = async () => {
  const request: GetReservationListRequest = {
    reservationDate: selectedDate.value ? formatDate(selectedDate.value) : undefined
  }

  const cleanRequest = Object.fromEntries(
    Object.entries(request).filter(([_, v]) => v !== undefined)
  ) as GetReservationListRequest

  const response = await reservationService.getReservationList(cleanRequest)
  reservationsList.value = response.reservationDto || []
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

watch(selectedDate, () => {
  getReservationList()
}, { immediate: true })
</script>
<template>
   <div class="w-full">
    <div class="grid m-2">
      <Card>
        <template #header>
          <div class="flex flex-col gap-3 p-4">
            <!-- Fecha de Reserva -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <div class="flex items-center gap-2">
                <span class="text-lg sm:text-xl whitespace-nowrap">
                  {{ t('reservationslist.select.dateselect')}}:
                </span>
              </div>
              <DatePicker
                v-model="selectedDate"
                dateFormat="yy-mm-dd"
                :placeholder="t('reservationslist.select.dateselect')"
                show-clear
              />
            </div>
          </div>
        </template>
        <template #content>
          <DataTable
            v-model:selection="reservationSelected"
            :value="reservationsList"
            data-key="reservaId"
            selection-mode="single"
            paginator
            :rows="5"
            :rows-per-page-options="[5, 10, 20]"
          >
            <Column field="fechaReserva" :header="t('reservationslist.columns.reserve')"></Column>
            <Column field="fullNameUser" :header="t('reservationslist.columns.user')"></Column>
            <Column field="phoneUser" :header="t('reservationslist.columns.contact')"></Column>
            <Column field="nameTurn" :header="t('reservationslist.columns.turn')"></Column>
            <Column field="hourStart" :header="t('reservationslist.columns.hourstart')"></Column>
            <Column field="hourEnd" :header="t('reservationslist.columns.hourend')"></Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>
<style scoped></style>
