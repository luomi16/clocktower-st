export type Script = "trouble_brewing";

export interface Player {
  id: number;
  name: string;
}

export interface Seat {
  seatId: number;
  roleId?: string;
  playerId?: number;
}

