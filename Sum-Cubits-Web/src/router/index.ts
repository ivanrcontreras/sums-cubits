import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@auth0/auth0-vue'
import type { Router } from 'vue-router'
import { reservationRouter, myReservationRouter } from '@/features/reservation/router'
import { loungeRouter } from '@/features/lounge/router'
import { turnsRouter} from '@/features/turns/router'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: 'myreservation',
      beforeEnter: authGuard,
      component: () => import('@/components/Shell-Component.vue'),
      children: [
        myReservationRouter,
        reservationRouter,
        loungeRouter,
        turnsRouter
      ]
    },
    {path: '/:catchAll(.*)*', redirect: '/' }
  ]
})

export default router
