import { useEffect, useState } from "react";
import type { Player, Seat } from "../types";
import type { Role } from "../data/troubleBrewing";
import type { RoleCount } from "../data/troubleBrewingSetup";
import { troubleBrewingRoles } from "../data/troubleBrewing";

interface Props {
  players: Player[];
  seatCount: number;
  setup: RoleCount;
}

/**
 * Build a quick lookup map for roles
 */
const roleMap: Map<string, Role> = new Map(
  troubleBrewingRoles.map((r) => [r.id, r])
);

/**
 * Count how many roles of each alignment are currently on the board
 */
function countRolesByAlignment(seats: Seat[]) {
  return seats.reduce(
    (acc, seat) => {
      if (!seat.roleId) return acc;

      const role = roleMap.get(seat.roleId);
      if (!role) return acc;

      acc[role.alignment]++;
      return acc;
    },
    {
      townsfolk: 0,
      outsider: 0,
      minion: 0,
      demon: 0,
    }
  );
}

export default function CircleBoard({
  players,
  seatCount,
  setup,
}: Props) {
  const [seats, setSeats] = useState<Seat[]>([]);

  /**
   * Rebuild seats whenever player count changes
   */
  useEffect(() => {
    setSeats(
      Array.from({ length: seatCount }, (_, i) => ({
        seatId: i,
      }))
    );
  }, [seatCount]);

  const radius = 180;
  const center = 220;

  // ---- role count & warnings ----
  const roleCounts = countRolesByAlignment(seats);

  const warnings: string[] = [];

  if (roleCounts.townsfolk > setup.townsfolk) {
    warnings.push(
      `镇民超出 ${roleCounts.townsfolk - setup.townsfolk} 个`
    );
  }
  if (roleCounts.outsider > setup.outsider) {
    warnings.push(
      `外来者超出 ${roleCounts.outsider - setup.outsider} 个`
    );
  }
  if (roleCounts.minion > setup.minion) {
    warnings.push(
      `爪牙超出 ${roleCounts.minion - setup.minion} 个`
    );
  }
  if (roleCounts.demon > setup.demon) {
    warnings.push(
      `恶魔超出 ${roleCounts.demon - setup.demon} 个`
    );
  }

  return (
    <>
      {/* 🔴 warning bar */}
      {warnings.length > 0 && (
        <div
          style={{
            margin: "8px 12px",
            padding: "8px 12px",
            background: "#ffecec",
            color: "#c0392b",
            border: "1px solid #c0392b",
            borderRadius: 6,
            fontSize: 13,
          }}
        >
          ⚠️ 当前角色配置不合法：
          <ul style={{ margin: "4px 0 0 16px" }}>
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 🩸 circle board */}
      <div
        style={{
          margin: "40px auto",
          width: 440,
          height: 440,
          borderRadius: "50%",
          border: "2px solid black",
          position: "relative",
        }}
      >
        {seats.map((seat, index) => {
          const angle = (2 * Math.PI * index) / seatCount;
          const x = center + radius * Math.cos(angle) - 45;
          const y = center + radius * Math.sin(angle) - 35;

          const role = seat.roleId
            ? roleMap.get(seat.roleId)
            : undefined;

          const player = players.find(
            (p) => p.id === seat.playerId
          );

          return (
            <div
              key={seat.seatId}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const type = e.dataTransfer.getData("type");

                if (type === "role") {
                  const roleId = e.dataTransfer.getData("roleId");

                  setSeats(
                    seats.map((s) => {
                      // ① 先清掉这个角色在其他座位上的残留
                      if (s.roleId === roleId) {
                        return { ...s, roleId: undefined };
                      }

                      // ② 再放到当前座位
                      if (s.seatId === seat.seatId) {
                        return { ...s, roleId };
                      }

                      return s;
                    })
                  );
                }

                if (type === "player") {
                  const playerId = Number(
                    e.dataTransfer.getData("playerId")
                  );
                  setSeats(
                    seats.map((s) =>
                      s.seatId === seat.seatId
                        ? { ...s, playerId }
                        : s
                    )
                  );
                }
              }}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 90,
                minHeight: 70,
                border: "1px dashed #666",
                borderRadius: 8,
                padding: 6,
                background: "#fafafa",
                textAlign: "center",
                fontSize: 12,
              }}
            >
              <div>
                {role ? (
                  <>
                    <div style={{ fontWeight: 600 }}>{role.zh}</div>
                    <div style={{ fontSize: 10 }}>{role.en}</div>
                  </>
                ) : (
                  "Drop Role"
                )}
              </div>

              <div style={{ marginTop: 4 }}>
                {player
                  ? player.name || `#${player.id + 1}`
                  : "Drop Player"}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
