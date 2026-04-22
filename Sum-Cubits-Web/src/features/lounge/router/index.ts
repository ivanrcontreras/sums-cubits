import type { RouteRecordRaw } from "vue-router";
import { RouterView } from "vue-router";
import { usePermissionGuard } from "@/composables/usePermissionGuard";



const LoungeList = () => import('@/features/lounge/pages/Lounge-List.vue');
const LoungeCreate = () => import('@/features/lounge/pages/Lounge-Create.vue');
const LoungeUpdate = () => import('@/features/lounge/pages/Lounge-Update.vue');

export const loungeRouter: RouteRecordRaw = {
path: 'lounge',
component: RouterView,
meta: { permissions: 'lounge' },
beforeEnter: usePermissionGuard,
children: [
    {
        path: '',
        name: 'lounge-list',
        component: LoungeList
    },
    {
        path:'create',
        name: 'lounge-create',
        component: LoungeCreate
    },
    {
        path: ':salonId/update',
        name: 'lounge-update',
        component: LoungeUpdate
    }
]
}

export default loungeRouter