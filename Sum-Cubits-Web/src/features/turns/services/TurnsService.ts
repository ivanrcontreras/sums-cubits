import { useHttp } from "@/composables/useHttp";

import type { GetTurnoListResponse } from "@/features/turns/interfaces/GetTurnoListResponse";
import type { GetTurnoListRequest } from "@/features/turns/interfaces/GetTurnoListRequest";
import type { CreateTurnoRequest } from "@/features/turns/interfaces/CreateTurnoRequest";
import type { UpdateTurnoRequest } from "@/features/turns/interfaces/UpdateTurnoRequest";
import type { RecoverTurnoRequest } from "../interfaces/RecoverTurnoRequest";

export default class TurnsService {
    API_URL = 'turnos'

    async getTurnoList(request: GetTurnoListRequest): Promise<GetTurnoListResponse> {
        const { data } = await useHttp(`${this.API_URL}/activos`).post(request).json()
        return data.value ?? { turnoDto: [] }
    }

    async create(request: CreateTurnoRequest): Promise<void> {
        await useHttp(this.API_URL).post(request)
    }

    async update(request: UpdateTurnoRequest): Promise<void> {
        await useHttp(this.API_URL).put(request)
    }

    async delete(turnoId: number): Promise<void> {
        await useHttp(`${this.API_URL}/${turnoId}`).delete()
    }

    async recover(request: RecoverTurnoRequest): Promise<void> {
        await useHttp(`${this.API_URL}/recover/`).put(request).json()
    }

}
