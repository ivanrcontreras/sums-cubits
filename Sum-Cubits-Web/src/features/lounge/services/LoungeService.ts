import { useHttp } from "@/composables/useHttp";

//import Response or Request 

import type { GetSalonListResponse } from "@/features/lounge/interfaces/GetSalonListResponse";
import type { GetSalonListRequest } from "@/features/lounge/interfaces/GetSalonListRequest";
import type { CreateSalonRequest } from "@/features/lounge/interfaces/CreateSalonRequest";
import type { UpdateSalonRequest } from "@/features/lounge/interfaces/UpdateSalonRequest";
import type { RecoverSalonRequest } from "@/features/lounge/interfaces/RecoverSalonRequest";

export default class LoungeService {
    API_URL = 'salones'

     async getSalonList(request: GetSalonListRequest): Promise<GetSalonListResponse> {
        const { data } = await useHttp(`${this.API_URL}/activos`).post(request).json()
        return data.value ?? { salonDtos: [] }
      }

      async create(request: CreateSalonRequest): Promise<void> {
        await useHttp(this.API_URL).post(request)
      }

      async update(request: UpdateSalonRequest): Promise<void> {
        await useHttp(this.API_URL).put(request)
      }

      async delete(salonId: number): Promise<void> {
        await useHttp(`${this.API_URL}/${salonId}`).delete()
      }

      async recover(request: RecoverSalonRequest): Promise<void> {
        await useHttp(`${this.API_URL}/recover`).put(request).json()
      }
}
