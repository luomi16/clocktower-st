import type { Player, Seat } from "../types";
import type { Role } from "../data/troubleBrewing";
import type { RoleCount } from "../data/troubleBrewingSetup";
import { troubleBrewingRoles } from "../data/troubleBrewing";

interface Props {
  players: Player[];
  seats: Seat[];
  setSeats: (seats: Seat[]) => void;
  setup: RoleCount;
}

const roleMap: Map<string, Role> = new Map(
  troubleBrewingRoles.map((r) => [r.id, r])
);

function countRolesByAlignment(seats: Seat[]) {
  return seats.reduce(
    (acc, seat) => {
      if (!seat.roleId) return acc;
      const role = roleMap.get(seat.roleId);
      if (!role) return acc;
      acc[role.alignment]++;
      return acc;
    },
    { townsfolk: 0, outsider: 0, minion: 0, demon: 0 }
  );
}

export default function CircleBoard({
  players,
  seats,
  setSeats,
  setup,
}: Props) {
  const radius = 180;
  const center = 220;

  const roleCounts = countRolesByAlignment(seats);
  const warnings: string[] = [];

  if (roleCounts.townsfolk > setup.townsfolk)
    warnings.push(`镇民超出 ${roleCounts.townsfolk - setup.townsfolk} 个`);
  if (roleCounts.outsider > setup.outsider)
    warnings.push(`外来者超出 ${roleCounts.outsider - setup.outsider} 个`);
  if (roleCounts.minion > setup.minion)
    warnings.push(`爪牙超出 ${roleCounts.minion - setup.minion} 个`);
  if (roleCounts.demon > setup.demon)
    warnings.push(`恶魔超出 ${roleCounts.demon - setup.demon} 个`);

  return (
    <>
      {warnings.length > 0 && (
        <div
          style={{
            margin: "8px 12px",
            padding: "8px 12px",
            background: "#ffecec",
            color: "#c0392b",
            border: "1px solid #c0392b",
            borderRadius: 6,
          }}
        >
          ⚠️ 当前角色配置不合法：
          <ul>
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

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
          const angle = (2 * Math.PI * index) / seats.length;
          const x = center + radius * Math.cos(angle) - 45;
          const y = center + radius * Math.sin(angle) - 35;

          const role = seat.roleId ? roleMap.get(seat.roleId) : undefined;
          const player = players.find((p) => p.id === seat.playerId);

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
                      if (s.roleId === roleId)
                        return { ...s, roleId: undefined };
                      if (s.seatId === seat.seatId)
                        return { ...s, roleId };
                      return s;
                    })
                  );
                }

                if (type === "player") {
                  const playerId = Number(
                    e.dataTransfer.getData("playerId")
                  );
                  setSeats(
                    seats.map((s) => {
                      if (s.playerId === playerId)
                        return { ...s, playerId: undefined };
                      if (s.seatId === seat.seatId)
                        return { ...s, playerId };
                      return s;
                    })
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
