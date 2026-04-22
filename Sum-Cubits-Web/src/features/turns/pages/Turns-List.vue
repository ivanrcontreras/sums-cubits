<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";
import Button from "primevue/button";
import Tag from "primevue/tag";

import TurnsService from "@/features/turns/services/TurnsService";

import type { GetTurnoListRequest } from "@/features/turns/interfaces/GetTurnoListRequest";
import type { RecoverTurnoRequest } from "@/features/turns/interfaces/RecoverTurnoRequest"; 

import type { TurnoDto } from "@/features/turns/models/TurnoDto";

import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";


const router = useRouter();
const { t } = useI18n();

const turnoSelected = ref<TurnoDto>();
const turnoList = ref<TurnoDto[]>([]);

const turnsService = new TurnsService();

const isTurnsActive = computed(() => {
  return turnoSelected.value?.activo;
});

const getTurnoList = async () => {
  const request: GetTurnoListRequest = {
    activo: false
  }
  const response = await turnsService.getTurnoList(request);  turnoList.value = response.turnoDto;
}

const goToCreate = async () =>{
        await router.push({name: 'turns-create'})
}

const goToUpdate = async () =>{
        await router.push({
            name: 'turns-update',
            params: { turnoId: turnoSelected.value?.turnoId}
        });
}

const goToDelete = async () =>{
  if (turnoSelected.value) {
    await turnsService.delete(turnoSelected.value.turnoId)
    goToList()
  }
    
}

const goToRecover = async () => {
  if (turnoSelected.value) {
    const request: RecoverTurnoRequest = {
      turnoId: turnoSelected.value.turnoId
    }
    await turnsService.recover(request)
    goToList()
  }
}

const goToList = async () =>{
  await getTurnoList()
  await router.push({name: 'turns-list'})
  turnoSelected.value = undefined
}
onMounted(() => {
  getTurnoList();
})
</script>
<template>
    <div class="w-full">
        <div class="grid">
            <Card>
                <template #content>
                    <div class="button-row">
                        <Button
                        :label="$t('turns.buttons.create')"
                        @click="goToCreate"
                        :disabled="!!turnoSelected" 
                        />
                        <Button
                        :label="$t('turns.buttons.update')"
                        @click="goToUpdate"
                        :disabled="!turnoSelected || !isTurnsActive" 
                         />
                         <Button
                        :label="$t('turns.buttons.delete')"
                        @click="goToDelete"
                        :disabled="!turnoSelected || !isTurnsActive" 
                         />
                         <Button
                        :label="$t('turns.buttons.recover')"
                        @click="goToRecover"
                        :disabled="!turnoSelected || isTurnsActive" 
                         />
                    </div>
                </template>
            </Card>
        </div>
        <div class="grid p-5">
            <Card>
                <template #content>
                    <DataTable
                    v-model:selection="turnoSelected"
                    :value="turnoList"
                    data-key="turnoId"
                    selection-mode="single"
                    paginator
                    :rows="5"
                    :rows-per-page-options="[5,10,20]"
                    >
                    <Column field="nombreTurno" :header="t('turns.columns.turn')"></Column>
                    <Column field="horaInicio" :header="t('turns.columns.hourstart')"></Column>
                    <Column field="horaFin" :header="t('turns.columns.hourend')"></Column>
                    <Column field="activo">
                        <template #body=" turnsItems:{data: TurnoDto}">
                            <Tag :value="turnsItems.data.activo ? t('turns.columns.active') : t('turns.columns.inactive')" :severity="turnsItems.data.activo ? 'success' : 'danger'"></Tag>
                        </template>
                    </Column>
                    </DataTable>
                </template>

            </Card>
        </div>

    </div>

</template>
<style scoped></style>