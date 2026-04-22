import { type RouteRecordRaw, RouterView } from "vue-router";
import { usePermissionGuard } from "@/composables/usePermissionGuard";

const ReservationList = () => import('@/features/reservation/pages/Reservation-List.vue');

export const reservationRouter: RouteRecordRaw = {
    path: 'reservations',
    component: RouterView,
    meta: { permissions: 'reservations' },
    beforeEnter: usePermissionGuard,
    children: [
        {
            path: '',
            name: 'reservation-list',
            component: ReservationList
        }
    ]
}

const MyReservation = () => import('@/features/reservation/pages/MyReservation.vue');

export const myReservationRouter: RouteRecordRaw = {
path: 'myreservation',
component: RouterView,
children: [
    {
        path: '',
        name: 'myreservation',
        component: MyReservation
    }
]
}