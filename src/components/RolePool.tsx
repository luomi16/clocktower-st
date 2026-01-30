import { troubleBrewingRoles } from "../data/troubleBrewing";
import RoleToken from "./RoleToken";

export default function RolePool() {
  const townsfolk = troubleBrewingRoles.filter(r => r.alignment === "townsfolk");
  const outsiders = troubleBrewingRoles.filter(r => r.alignment === "outsider");
  const minions = troubleBrewingRoles.filter(r => r.alignment === "minion");
  const demon = troubleBrewingRoles.filter(r => r.alignment === "demon");

  return (
    <div style={{ padding: 12 }}>
      {/* 镇民 */}
      <h4>🟦 镇民(Townsfolk)</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {townsfolk.map(r => <RoleToken key={r.id} role={r} />)}
      </div>

      {/* 外来者 / 爪牙 / 恶魔 同一排 */}
      <h4 style={{ marginTop: 16 }}>🔵 外来者(Outsider) / 🟥 爪牙(Minions) / 🔴 恶魔(Demon)</h4>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* 外来者 */}
        <div style={{ display: "flex", gap: 6, marginRight: 112 }}>
          {outsiders.map(r => <RoleToken key={r.id} role={r} />)}
        </div>

        {/* 爪牙 */}
        <div style={{ display: "flex", gap: 6, marginRight: 112 }}>
          {minions.map(r => <RoleToken key={r.id} role={r} />)}
        </div>

        {/* 恶魔 */}
        <div style={{ display: "flex", gap: 6 }}>
          {demon.map(r => <RoleToken key={r.id} role={r} />)}
        </div>
      </div>
    </div>
  );
}
