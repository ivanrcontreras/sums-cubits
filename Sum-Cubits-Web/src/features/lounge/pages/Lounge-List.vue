<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";
import Button from "primevue/button";
import Tag from "primevue/tag";

import LoungeService from "@/features/lounge/services/LoungeService";

import type { RecoverSalonRequest } from "@/features/lounge/interfaces/RecoverSalonRequest";
import type { GetSalonListRequest } from "@/features/lounge/interfaces/GetSalonListRequest";

import type { SalonDtos } from "@/features/lounge/models/SalonDtos";

import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";


const router = useRouter();
const { t } = useI18n();

const loungeService = new LoungeService();

const salonSelected = ref<SalonDtos>();
const salonList = ref<SalonDtos[]>([]);

const getSalonList = async () => {
  const request: GetSalonListRequest = {
    activo: false
  }
  const response = await loungeService.getSalonList(request);  salonList.value = response.salonDtos;
};

const goToCreate = async () =>{
        await router.push({name: 'lounge-create'})
}

const goToUpdate = async () =>{
        await router.push({
            name: 'lounge-update',
            params: { salonId: salonSelected.value?.salonId}
        });
}

const goToDelete = async () =>{
  if (salonSelected.value) {
    await loungeService.delete(salonSelected.value.salonId)
    goToList()
  }
    
}

const goToRecover = async () =>{
    if (salonSelected.value) {
    const request : RecoverSalonRequest = {
      salonId: salonSelected.value.salonId
    }
    await loungeService.recover(request)
    goToList()
  }
}

const isLoungeActive = computed(() => {
  return salonSelected.value?.activo;
});

const goToList = async () =>{
    await getSalonList()
    await router.push({name: 'lounge-list'})
    salonSelected.value = undefined
}

onMounted(() => {
  goToList();
});
</script>
<template>
  <div class="w-full">
    <div class="grid">
        <Card>
            <template #content>
                <div class="button-row">
                    <Button
                    :label="$t('room.buttons.create')"
                    @click="goToCreate"
                    :disabled="!!salonSelected"
                    />
                    <Button
                    :label="$t('room.buttons.update')"
                    :disabled="!salonSelected || !isLoungeActive"
                    @click="goToUpdate"
                    />
                    <Button
                    :label="$t('room.buttons.delete')"
                    :disabled="!salonSelected || !isLoungeActive"
                    @click="goToDelete"
                    />
                    <Button
                    :label="$t('room.buttons.recover')"
                    :disabled="!salonSelected || isLoungeActive"
                    @click="goToRecover"
                    />
                </div>
            </template>
        </Card>
    </div>
    <div class="grid p-5">
      <Card>
        <template #content>
          <DataTable
            v-model:selection="salonSelected"
            :value="salonList"
            data-key="salonId"
            selection-mode="single"
            paginator
            :rows="5"
            :rows-per-page-options="[5, 10, 20]"
            paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          >
            <Column field="nombreSalon" :header="t('room.columns.room')"></Column>
            <Column field="activo">
              <template #body="salonItems: { data: SalonDtos }">
                <Tag :severity="salonItems.data.activo ? 'success' : 'danger'">{{ salonItems.data.activo ? t('room.columns.active') : t('room.columns.inactive') }}</Tag>
              </template></Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
