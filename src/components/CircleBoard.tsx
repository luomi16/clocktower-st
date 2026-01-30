import { useEffect, useState } from "react";
import type { Player, Seat } from "../types";
import { troubleBrewingRoles } from "../data/troubleBrewing";

interface Props {
    players: Player[];
    seatCount: number;
}

export default function CircleBoard({ players, seatCount }: Props) {
    const [seats, setSeats] = useState<Seat[]>([]);

    useEffect(() => {
        setSeats(
            Array.from({ length: seatCount }, (_, i) => ({
                seatId: i,
            }))
        );
    }, [seatCount]);

    const radius = 180;
    const center = 220;

    return (
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

                const role = troubleBrewingRoles.find(
                    (r) => r.id === seat.roleId
                );
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
                                    seats.map((s) =>
                                        s.seatId === seat.seatId
                                            ? { ...s, roleId }
                                            : s
                                    )
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
    );
}
