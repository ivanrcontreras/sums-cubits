<script setup lang="ts">
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Button from "primevue/button";

import LoungeService from "@/features/lounge/services/LoungeService";
import { useErrorStore } from "@/store/useErrorStore";

import type { CreateSalonRequest } from "@/features/lounge/interfaces/CreateSalonRequest";
import { computed, ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const loungeService = new LoungeService();

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const form = ref<CreateSalonRequest>({});

const isFormValid = computed(() => {
  return (
    form.value.nombreSalon !== undefined &&
    form.value.nombreSalon !== null &&
    form.value.nombreSalon.trim() !== ""
  );
});

const submitForm = async () => {
  await loungeService.create(form.value);
  await goToList();
};

const goToList = async () => {
  await router.push({ name: "lounge-list" });
};
</script>
<template>
  <form @submit.prevent>
    <div class="w-full">
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
                :label="$t('room.buttons.cancel')"
                class="p-button-secondary"
                variant="outlined"
                rounded
                @click="goToList"
              />
              <Button
                type="button"
                :label="$t('room.buttons.save')"
                class="p-button-success mr-2"
                @click="submitForm"
                variant="outlined"
                rounded
                :disabled="!isFormValid"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </form>
</template>
<style scoped></style>
