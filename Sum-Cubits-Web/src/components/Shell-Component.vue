<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import ProgressBar from "primevue/progressbar";
import ProgressSpinner from "primevue/progressspinner";
import Menubar from "primevue/menubar";
import Message from "primevue/message";
import Button from "primevue/button";

import UserService from "@/features/users/services/UserService";
import RoleService from "@/features/roles/services/RoleService";

import type { VistaDto } from "@/features/views/models/VistaDto";

import { useLoadingStore } from "@/store/useLoadingStore";
import { useUserStore } from "@/features/users/store";
import { useErrorStore } from "@/store/useErrorStore";

import { RouterView, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { useI18n } from "vue-i18n";

const roleService = new RoleService();
const userService = new UserService();

const loadingStore = useLoadingStore();
const userStore = useUserStore();
const errorStore = useErrorStore();
const router = useRouter();
const auth = useAuth0();
const { t } = useI18n();

const menuItemList = ref<MenuItem[]>([]);

const anyMenuList = computed(() => {
  return menuItemList.value.length > 0;
});

const getViewList = async () => {
  const roleId = await userService.getRoleId();
  const viewsList = await roleService.getViewList(roleId);
  if (viewsList) {
    menuItemList.value = viewsList.map(mapTo);
    userStore.setUserPermissions(viewsList.map((view) => view.nombreVista));
  }
};

const mapTo = (view: VistaDto) => {
  return {
    label: t(`shell.titles.${view.nombreVista}`),
    command: () => goToRouteByName(view.ruta),
  } as MenuItem;
};

const goToRouteByName = (name: string) => {
  router.push({ name: name });
};

const logout = () => {
  auth.logout({ logoutParams: { returnTo: window.location.origin } });
}



onMounted(async () => {
  await getViewList();
});
</script>

<template>
  <div>
    <div v-if="anyMenuList">
      <Menubar :model="menuItemList">
        <template #end>
          <div class="flex items-center gap-2">
            <span class="p-mr-2"
              >{{ auth.user?.value?.name }}
              <Button
                icon="pi pi-fw pi-power-off"
                class="p-button-danger m-2"
                @click="logout"
              />
            </span>
          </div>
        </template>
      </Menubar>
    </div>
    <div class="p-1 md:p-6">
      <div v-if="!anyMenuList" class="mb-4 p-4 text-center">
        <ProgressSpinner />
      </div>
      <ProgressBar
        v-if="loadingStore.isLoading"
        class="mb-3"
        style="height: 6px"
        mode="indeterminate"
      ></ProgressBar>
      <Message
        v-if="errorStore.isAnyError"
        class="mb-3"
        :closable="false"
        :severity="errorStore.errorSeverity"
      >
        {{ errorStore.errorMessage }}
      </Message>
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
