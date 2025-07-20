import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { useMatchStore } from "@/store/matchStore"
import { formatTime } from "@/utils/formatTime"
import { PlayerCard } from "@/components/PlayerCard"
import { yourTeam, opponentTeam } from "@/lib/mockData"
import type { Player } from "@/types"

export const BattleTab = () => {
  const yourScore = useMatchStore((s) => s.yourScore)
  const opponentScore = useMatchStore((s) => s.opponentScore)
  const matchTime = useMatchStore((s) => s.matchTime)
  const isLive = useMatchStore((s) => s.isLive)

  const setMatchTime = useMatchStore((s) => s.setMatchTime)
  const setYourScore = useMatchStore((s) => s.setYourScore)
  const setOpponentScore = useMatchStore((s) => s.setOpponentScore)

  // 🕒 Live Match Timer & Score Updater
  useEffect(() => {
    if (isLive && matchTime > 0) {
      const timer = setInterval(() => {
        setMatchTime((prev) => prev - 1)

        if (Math.random() > 0.95) {
          setYourScore((prev) => prev + Math.random() * 2)
        }
        if (Math.random() > 0.95) {
          setOpponentScore((prev) => prev + Math.random() * 2)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isLive, matchTime, setMatchTime, setYourScore, setOpponentScore])

  return (
    <div className="space-y-6">
      {/* ⚔️ Scorecard */}
      <Card className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 border-2 border-yellow-500/30">
        <div className="p-6">
          <div className="flex items-center justify-between">
            {/* Your Team Score */}
            <div className="text-center flex-1">
              <div className="text-cyan-400 font-bold text-lg mb-1">YOUR TEAM</div>
              <div className="text-3xl font-black text-white">{yourScore.toFixed(1)}</div>
            </div>

            {/* Live Status & Timer */}
            <div className="text-center px-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {isLive && <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />}
                <span className={`font-bold ${isLive ? "text-red-400" : "text-gray-400"}`}>
                  {isLive ? "LIVE" : "READY"}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-xl font-bold">{formatTime(matchTime)}</span>
              </div>
            </div>

            {/* Opponent Score */}
            <div className="text-center flex-1">
              <div className="text-red-400 font-bold text-lg mb-1">OPPONENT</div>
              <div className="text-3xl font-black text-white">{opponentScore.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* 🧑‍🤝‍🧑 Side-by-side Player Columns */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Your Team - Left */}
  <div className="space-y-4">
    <h2 className="text-center text-cyan-400 font-bold text-lg">Your Team</h2>
    {yourTeam.map((player: Player) => (
      <PlayerCard key={player.id} player={player} />
    ))}
  </div>

  {/* Opponent Team - Right */}
  <div className="space-y-4">
    <h2 className="text-center text-red-400 font-bold text-lg">Opponent</h2>
    {opponentTeam.map((player: Player) => (
      <PlayerCard key={player.id} player={player} isOpponent />
    ))}
  </div>
</div>

    </div>
  )
}
