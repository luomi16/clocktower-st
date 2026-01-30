import { troubleBrewingRoles } from "../data/troubleBrewing";
import RoleToken from "./RoleToken";

export default function RolePool() {
  return (
    <div style={{ padding: 12 }}>
      <h3>Roles</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {troubleBrewingRoles.map((r) => (
          <RoleToken key={r.id} role={r} />
        ))}
      </div>
    </div>
  );
}
