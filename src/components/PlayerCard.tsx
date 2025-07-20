import { Card } from "@/components/ui/card"
import type { Player } from "@/types"
import { useMatchStore } from "@/store/matchStore"

interface PlayerCardProps {
  player: Player
  isOpponent?: boolean
  showFormation?: boolean
}

export const PlayerCard = ({
  player,
  isOpponent = false,
  showFormation = false,
}: PlayerCardProps) => {
  const setSelectedPlayer = useMatchStore((state) => state.setSelectedPlayer)

  return (
    <Card
      onClick={() => setSelectedPlayer(player)} // ✅ Open modal
      className={`relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer
        ${isOpponent ? "border-red-500/30 hover:border-red-400" : "border-cyan-500/30 hover:border-cyan-400"}`}
    >
      {showFormation && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
          Formation
        </div>
      )}

      <div className="p-4 text-center">
        <div className="text-3xl mb-2">{player.avatar}</div>
        <div className="font-bold text-lg">{player.name}</div>
        <div className="text-sm text-gray-400">
          {player.position} • {player.team}
        </div>
        <div className="mt-2 text-yellow-400 font-mono font-semibold text-lg">
          {player.points.toFixed(1)} pts
        </div>
      </div>
    </Card>
  )
}
