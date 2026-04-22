import type { RouteRecordRaw } from "vue-router";
import { RouterView } from "vue-router";
import { usePermissionGuard } from "@/composables/usePermissionGuard";

const LoungeList = () => import('@/features/turns/pages/Turns-List.vue');
const LoungeCreate = () => import('@/features/turns/pages/Turns-Create.vue');
const LoungeUpdate = () => import('@/features/turns/pages/Turns-Update.vue');

export const turnsRouter: RouteRecordRaw = {
path: 'turns',
component: RouterView,
meta: { permissions: 'turns' },
beforeEnter: usePermissionGuard,
children: [
    {
        path: '',
        name: 'turns-list',
        component: LoungeList
    },
    {
        path:'create',
        name: 'turns-create',
        component: LoungeCreate
    },
    {
        path: ':turnoId/update',
        name: 'turns-update',
        component: LoungeUpdate
    }
]
}

export default turnsRouter