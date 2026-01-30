import type { Role } from "../data/troubleBrewing";

interface Props {
  role: Role;
}

export default function RoleToken({ role }: Props) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("type", "role");
        e.dataTransfer.setData("roleId", role.id);
      }}
      style={{
        padding: 8,
        border: "1px solid #333",
        borderRadius: 6,
        marginRight: 6,
        background: "#eee",
        cursor: "grab",
        fontSize: 12,
      }}
    >
      {role.name}
    </div>
  );
}
