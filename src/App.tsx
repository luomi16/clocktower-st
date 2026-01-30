import { useEffect, useState } from "react";
import SetupScreen from "./components/SetupScreen";
import PlayerList from "./components/PlayerList";
import CircleBoard from "./components/CircleBoard";
import RolePool from "./components/RolePool";
import type { Player, Script, Seat } from "./types";
import { troubleBrewingSetup } from "./data/troubleBrewingSetup";
import RoleCountHint from "./components/RoleCountHint";

const STORAGE_KEY = "clocktower-st-state";

interface PersistedState {
  script: Script;
  players: Player[];
  seats: Seat[];
}

export default function App() {
  const [script, setScript] = useState<Script | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);

  /* -----------------------------
   * 从 localStorage 恢复
   * ----------------------------- */
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as PersistedState;
      setScript(parsed.script);
      setPlayers(parsed.players);
      setSeats(parsed.seats);
    } catch (e) {
      console.warn("Failed to restore state from localStorage", e);
    }
  }, []);

  /* -----------------------------
   * 自动保存到 localStorage
   * ----------------------------- */
  useEffect(() => {
    if (!script) return;

    const payload: PersistedState = {
      script,
      players,
      seats,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [script, players, seats]);

  const playerCount = players.length;
  const setup = troubleBrewingSetup[playerCount];

  /* -----------------------------
   * 尚未开始：选择剧本 & 人数
   * ----------------------------- */
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

  /* -----------------------------
   * 主界面（全屏响应式）
   * ----------------------------- */
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "0 16px 24px",
      }}
    >
      {/* =============================
         顶部控制条（稳定不抖）
         ============================= */}
      <div
        style={{
          padding: "12px 0",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          columnGap: 16,
        }}
      >
        {/* ⬅️ Back：清空一切，重新选剧本 */}
        <button
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
            whiteSpace: "nowrap",
            justifySelf: "start",
          }}
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            setScript(null);
            setPlayers([]);
            setSeats([]);
          }}
        >
          ⬅ Back
        </button>

        {/* 中间占位（让左右完全独立） */}
        <div />

        {/* 👉 右侧：规则提示 + Reset（固定区域） */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifySelf: "end",
            minWidth: 420, // ⭐ 锁住右侧，防止 RoleCountHint 变化导致抖动
            justifyContent: "flex-end",
          }}
        >
          {setup && <RoleCountHint setup={setup} />}

          {/* 🔄 Reset：只清圆盘 */}
          <button
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onClick={() => {
              setSeats(
                players.map((_, i) => ({
                  seatId: i,
                }))
              );
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* =============================
         主内容区
         ============================= */}
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
