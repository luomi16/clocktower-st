import type { Player, Seat } from "../types";
import PlayerToken from "./PlayerToken";

interface Props {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  seats: Seat[];
  setSeats: (seats: Seat[]) => void;
}

export default function PlayerList({
  players,
  setPlayers,
  seats,
  setSeats,
}: Props) {
  const usedPlayerIds = new Set(
    seats
      .map((s) => s.playerId)
      .filter((id): id is number => id !== undefined)
  );

  const availablePlayers = players.filter(
    (p) => !usedPlayerIds.has(p.id)
  );

  return (
    <div
      style={{ display: "flex", padding: 12 }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const type = e.dataTransfer.getData("type");
        if (type === "player") {
          const playerId = Number(e.dataTransfer.getData("playerId"));
          setSeats(
            seats.map((s) =>
              s.playerId === playerId ? { ...s, playerId: undefined } : s
            )
          );
        }
      }}
    >
      {availablePlayers.map((p) => (
        <PlayerToken
          key={p.id}
          player={p}
          onNameChange={(name) => {
            setPlayers(
              players.map((x) =>
                x.id === p.id ? { ...x, name } : x
              )
            );
          }}
        />
      ))}
    </div>
  );
}
