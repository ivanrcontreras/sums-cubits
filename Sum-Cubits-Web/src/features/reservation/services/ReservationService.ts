import { useHttp } from "@/composables/useHttp";

//import Response or Request 
import type { GetReservationListResponse } from "@/features/reservation/interfaces/GetReservationListResponse";
import type { GetReservationListRequest } from "@/features/reservation/interfaces/GetReservationListRequest";
import type { GetAvailableTurnsRequest } from "@/features/reservation/interfaces/GetAvailableTurnsRequest";
import type { GetAvailableTurnsResponse } from "@/features/reservation/interfaces/GetAvailableTurnsResponse";

//import Dtos
import type { DeleteReservationRequest } from "@/features/reservation/interfaces/DeleteReservationRequest";
import type { CreateReservationRequest } from "@/features/reservation/interfaces/CreateReservationRequest";

export default class ReservationService {
    API_URL = 'reservations'

 async getMyReservationList(): Promise<GetReservationListResponse> {
    const url = `${this.API_URL}/myreservations`
    const { data } = await useHttp(url).get().json<GetReservationListResponse>()
    return data.value ?? { reservationDto: [] }
  }

   async getReservationList(request: GetReservationListRequest): Promise<GetReservationListResponse> {
    const url = `${this.API_URL}`
    const { data } = await useHttp(url,request).get().json<GetReservationListResponse>()
    return data.value ?? { reservationDto: [] }
  }


 async deleteReservation(request: DeleteReservationRequest): Promise<void> {
    const url = `${this.API_URL}`
    const { data } = await useHttp(url).delete(request).json()
    return data.value
 }

    async createReservation(request: CreateReservationRequest): Promise<void> {
    const { data } = await useHttp(`${this.API_URL}`).post(request).json()
    return data.value
  }

  async getAvailableTurns(request: GetAvailableTurnsRequest): Promise<GetAvailableTurnsResponse> {
    const { data } = await useHttp(`${this.API_URL}/available-turns`).post(request).json()
    return data.value ?? { allOcuped: false, mesagge: null, turnsDtos: []}
  }
}