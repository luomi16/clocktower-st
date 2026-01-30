import type { Player } from "../types";
import PlayerToken from "./PlayerToken";

interface Props {
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

export default function PlayerList({ players, setPlayers }: Props) {
  return (
    <div style={{ display: "flex", padding: 12 }}>
      {players.map((p) => (
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
