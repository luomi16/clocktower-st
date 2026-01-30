import type { Role } from "../data/troubleBrewing";

export default function RoleToken({ role }: { role: Role }) {
  const colorMap: Record<string, string> = {
    townsfolk: "#444",
    outsider: "#1e90ff",
    minion: "#c0392b",
    demon: "#8e0000",
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("type", "role");
        e.dataTransfer.setData("roleId", role.id);
      }}
      style={{
        padding: "6px 8px",
        border: `1px solid ${colorMap[role.alignment]}`,
        borderRadius: 6,
        fontSize: 12,
        cursor: "grab",
        color: colorMap[role.alignment],
        background: "#fafafa",
        textAlign: "center",
        minWidth: 80,
      }}
    >
      <div style={{ fontWeight: 600 }}>{role.zh}</div>
      <div style={{ fontSize: 10 }}>{role.en}</div>
    </div>
  );
}
