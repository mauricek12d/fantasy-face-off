"use client"

import { PlayerCard } from "@/components/PlayerCard"
import type { Player } from "@/types"

interface FormationViewProps {
  team: Player[]
  isOpponent?: boolean
}

export const FormationView = ({ team, isOpponent = false }: FormationViewProps) => {
  return (
    <div className="relative w-full h-96 bg-gradient-to-b from-green-800/20 to-green-900/20 rounded-lg border-2 border-green-500/30 overflow-hidden">
      {/* 🟢 Field Lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-green-400/20"
            style={{ top: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>

      {/* 🧑‍🤝‍🧑 Players on Field */}
      {team.map((player) => (
        <div
          key={player.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${player.formationPosition.x}%`,
            top: `${player.formationPosition.y}%`,
          }}
        >
          <PlayerCard player={player} isOpponent={isOpponent} showFormation />
        </div>
      ))}
    </div>
  )
}
