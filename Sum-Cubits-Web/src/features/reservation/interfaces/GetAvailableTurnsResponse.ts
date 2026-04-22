import type { TurnoDto } from "@/features/turns/models/TurnoDto";

export interface GetAvailableTurnsResponse {
    allOcuped: boolean;
    mesagge: string | null;
    turnsDtos?: TurnoDto[];
}