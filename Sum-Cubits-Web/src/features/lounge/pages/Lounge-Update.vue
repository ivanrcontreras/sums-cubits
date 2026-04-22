<script setup lang="ts">
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Button from "primevue/button";

import LoungeService from "@/features/lounge/services/LoungeService";

import type { UpdateSalonRequest } from "@/features/lounge/interfaces/UpdateSalonRequest";
import type { GetSalonListRequest } from "@/features/lounge/interfaces/GetSalonListRequest";

import { computed, onMounted, ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const loungeService = new LoungeService();

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const form = ref<UpdateSalonRequest>({});
const salonId = Number(route.params["salonId"]) ?? 0;

const isFormValid = computed(() => {
  return (
    form.value.nombreSalon !== undefined &&
    form.value.nombreSalon !== null &&
    form.value.nombreSalon.trim() !== ""
  );
});

const loadSalon = async () => {
  const request: GetSalonListRequest = {
    activo: false,
  };
  const response = await loungeService.getSalonList(request);
  const salon = response.salonDtos?.find((s) => s.salonId === salonId);
  if (salon) {
    form.value = { salonId: salon.salonId, nombreSalon: salon.nombreSalon };
  }
};

const submitForm = async () => {
  const request: UpdateSalonRequest = {
    salonId: salonId,
    nombreSalon: form.value.nombreSalon,
  };
  await loungeService.update(request);
  await goToSalonesList();
};

const goToSalonesList = async () => {
  await router.push({ name: "lounge-list" });
};

onMounted(async () => {
  await loadSalon();
});
</script>
<template>
  <form @submit.prevent>
    <div class="grid">
      <Card>
        <template #content>
          <div class="field">
            <label for="name">{{t('room.inputtext.roomname')}}</label>
            <InputText
              id="salonId"
              type="text"
              v-model="form.nombreSalon"
              class="w-full"
              :invalid="!form.nombreSalon"
              :value="form.nombreSalon"
            />
          </div>
        </template>
      </Card>
    </div>
    <div class="grid p-2">
      <Card>
        <template #content>
          <div class="button-row">
            <Button
              type="button"
              :label="t('room.buttons.cancel')"
              class="p-button-secondary"
              variant="outlined"
              rounded
              @click="goToSalonesList"
            />
            <Button
              type="button"
              :label="t('room.buttons.save')"
              class="p-button-success mr-2"
              :disabled="!isFormValid"
              variant="outlined"
              rounded
              @click="submitForm"
            />
          </div>
        </template>
      </Card>
    </div>
  </form>
</template>
<style scoped></style>
