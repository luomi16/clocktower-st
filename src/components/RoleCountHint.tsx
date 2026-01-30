import type { RoleCount } from "../data/troubleBrewingSetup";

export default function RoleCountHint({ setup }: { setup?: RoleCount }) {
  if (!setup) return null;

  return (
    <div
      style={{
        padding: "8px 12px",
        margin: "8px 12px",
        background: "#f3f3f3",
        borderRadius: 6,
        fontSize: 13,
      }}
    >
      本局合法配置：
      <strong style={{ marginLeft: 8 }}>
        镇民 {setup.townsfolk} · 外来者 {setup.outsider} · 爪牙 {setup.minion} · 恶魔 {setup.demon}
      </strong>
    </div>
  );
}
