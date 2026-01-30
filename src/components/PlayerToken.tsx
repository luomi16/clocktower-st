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
        padding: 8,
        border: "1px solid #ccc",
        marginRight: 8,
        width: 80,
      }}
    >
      <div>#{player.id + 1}</div>
      <input
        placeholder="Name"
        value={player.name}
        onChange={(e) => onNameChange(e.target.value)}
        style={{ width: "100%" }}
      />
    </div>
  );
}
