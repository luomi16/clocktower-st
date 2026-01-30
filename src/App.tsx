import { useState } from "react";
import SetupScreen from "./components/SetupScreen";
import PlayerList from "./components/PlayerList";
import CircleBoard from "./components/CircleBoard";
import RolePool from "./components/RolePool";
import type { Player, Script, Seat } from "./types";
import { troubleBrewingSetup } from "./data/troubleBrewingSetup";
import RoleCountHint from "./components/RoleCountHint";

export default function App() {
  const [script, setScript] = useState<Script | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);

  const playerCount = players.length;
  const setup = troubleBrewingSetup[playerCount];

  if (!script) {
    return (
      <SetupScreen
        onStart={(script, count) => {
          setScript(script);
          setPlayers(
            Array.from({ length: count }, (_, i) => ({
              id: i,
              name: "",
            }))
          );
          setSeats(
            Array.from({ length: count }, (_, i) => ({
              seatId: i,
            }))
          );
        }}
      />
    );
  }

  return (
    <div>
      {setup && <RoleCountHint setup={setup} />}

      <RolePool seats={seats} setSeats={setSeats} />

      <PlayerList
        players={players}
        setPlayers={setPlayers}
        seats={seats}
        setSeats={setSeats}
      />

      <CircleBoard
        players={players}
        seats={seats}
        setSeats={setSeats}
        setup={setup}
      />
    </div>
  );
}
