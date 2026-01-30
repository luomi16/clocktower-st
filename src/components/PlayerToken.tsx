import type { Player } from "../types";

interface Props {
  player: Player;
  onNameChange: (name: string) => void;
}

export default function PlayerToken({ player, onNameChange }: Props) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("type", "player");
        e.dataTransfer.setData("playerId", String(player.id));
      }}
      style={{
        padding: "6px 8px",
        border: "1px solid #ccc",
        borderRadius: 6,
        cursor: "grab",
        background: "#fafafa",
        textAlign: "center",
        marginRight: 8,
        width: 80,
      }}
    >
      <div
        style={{
          fontWeight: 600,
          fontSize: 13,
          marginBottom: 4,
        }}
      >
        #{player.id + 1}
      </div>
      <input
        value={player.name}
        placeholder="Name"
        onChange={(e) => onNameChange(e.target.value)}
        style={{
          width: "100%",
          fontSize: 12,
          textAlign: "center",
          border: "none",
          outline: "none",
          background: "transparent",
        }}
      />
    </div>
  );
}
