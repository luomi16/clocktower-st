import { useState } from "react";
import { type Script } from "../types";

interface Props {
  onStart: (script: Script, playerCount: number) => void;
}

export default function SetupScreen({ onStart }: Props) {
  const [script, setScript] = useState<Script>("trouble_brewing");
  const [playerCount, setPlayerCount] = useState(5);

  return (
    <div style={{ padding: 24 }}>
      <h1>🩸 Blood on the Clocktower</h1>

      <div>
        <label>Script:</label>
        <select
          value={script}
          onChange={(e) => setScript(e.target.value as Script)}
        >
          <option value="trouble_brewing">暗流涌动（Trouble Brewing）</option>
        </select>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Players:</label>
        <select
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
        >
          {Array.from({ length: 11 }, (_, i) => i + 5).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <button
        style={{ marginTop: 24 }}
        onClick={() => onStart(script, playerCount)}
      >
        Start Game
      </button>
    </div>
  );
}
