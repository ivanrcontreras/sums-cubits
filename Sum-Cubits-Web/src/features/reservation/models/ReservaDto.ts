import type { TurnoDto } from "@/features/turns/models/TurnoDto";
export interface ReservaDto {
  fechaReserva: string;
  listTurnsDto: TurnoDto[];
  fullNameUser: string;
  phoneUser: string;
  nameTurn: string;
  hourStart: string;
  hourEnd: string;
}