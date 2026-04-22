<script setup lang="ts">
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Button from "primevue/button";
import DatePicker from "primevue/datepicker";

import TurnsService from "@/features/turns/services/TurnsService";

import type { CreateTurnoRequest } from "@/features/turns/interfaces/CreateTurnoRequest";

import { computed, ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const turnsService = new TurnsService();

const router = useRouter();
const { t } = useI18n();

const form = ref<CreateTurnoRequest>({});

const horaInicioDate = ref<Date | null>(null);
const horaFinDate = ref<Date | null>(null);

const isFormValid = computed(() => {
  return (
    form.value.nombreTurno !== undefined &&
    form.value.nombreTurno.trim() !== "" &&
    horaInicioDate.value !== null &&
    horaFinDate.value !== null
  );
});

const dateToTimeString = (date: Date | null): string | undefined => {
  if (!date) return undefined;

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const submitForm = async () => {
  const request: CreateTurnoRequest = {
    nombreTurno: form.value.nombreTurno,
    horaInicio: dateToTimeString(horaInicioDate.value),
    horaFin: dateToTimeString(horaFinDate.value),
  };
  await turnsService.create(request);
  await goToTurnosList();
};

const goToTurnosList = async () => {
  await router.push({ name: "turns-list" });
};
</script>
<template>
  <form @submit.prevent>
    <div class="grid">
      <Card>
        <template #content>
          <div class="field">
            <label for="name" class="block mb-2">{{t('turns.inputtext.turn')}}</label>
            <InputText
              id="nombreTurno"
              v-model="form.nombreTurno"
              class="w-full mb-6"
              :invalid="!isFormValid"
              :value="form.nombreTurno"
            />
          </div>
          <div class="field">
            <label for="horaInicio" class="block mb-2">{{ t('turns.inputtext.hourstart') }}</label>
            <DatePicker
              id="horaInicio"
              v-model="horaInicioDate"
              show-icon
              fluid
              icon-display="input"
              time-only
              hour-format="24"
              class="w-full mb-3"
            >
              <template #inputicon="slotProps"
                ><i
                  class="pi pi-clock"
                  @click="slotProps.clickCallback"
                ></i></template
            ></DatePicker>
          </div>
          <div class="field">
            <label for="horaFin" class="block mb-2">{{t('turns.inputtext.hourend')}}</label>
            <DatePicker
              id="horaFin"
              v-model="horaFinDate"
              show-icon
              fluid
              icon-display="input"
              time-only
              hour-format="24"
              class="w-full mb-3"
            >
              <template #inputicon="slotProps"
                ><i
                  class="pi pi-clock"
                  @click="slotProps.clickCallback"
                ></i></template
            ></DatePicker>
          </div>
        </template>
      </Card>
      <div class="grid p-2">
        <Card>
          <template #content>
            <div class="button-row">
              <Button
                type="button"
                :label="t('turns.buttons.cancel')"
                class="p-button-secondary"
                variant="outlined"
                rounded
                @click="goToTurnosList"
              />
              <Button
                type="button"
                :label="t('turns.buttons.save')"
                class="p-button-success mr-2"
                variant="outlined"
                rounded
                :disabled="!isFormValid"
                @click="submitForm"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </form>
</template>
<style scoped></style>
