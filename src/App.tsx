import { useState } from "react";
import SetupScreen from "./components/SetupScreen";
import PlayerList from "./components/PlayerList";
import CircleBoard from "./components/CircleBoard";
import RolePool from "./components/RolePool";
import type { Player, Script } from "./types";
import { troubleBrewingSetup } from "./data/troubleBrewingSetup";
import RoleCountHint from "./components/RoleCountHint";

export default function App() {
  const [script, setScript] = useState<Script | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
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
        }}
      />
    );
  }

  return (
    <div>
      {setup && <RoleCountHint setup={setup} />}
      <RolePool />
      <PlayerList players={players} setPlayers={setPlayers} />
      <CircleBoard players={players} seatCount={players.length} />
    </div>
  );
}
