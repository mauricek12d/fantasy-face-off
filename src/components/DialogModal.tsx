"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useMatchStore } from "@/store/matchStore"

export const DialogModal = () => {
  const selectedPlayer = useMatchStore((state) => state.selectedPlayer)
  const setSelectedPlayer = useMatchStore((state) => state.setSelectedPlayer)

  if (!selectedPlayer) return null

  const { name, avatar, position, team, points, stats } = selectedPlayer

  return (
    <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-cyan-500/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400 flex items-center gap-3">
            <span className="text-4xl">{avatar}</span>
            {name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-2 text-sm">
          <p><strong>Team:</strong> {team}</p>
          <p><strong>Position:</strong> {position}</p>
          <p><strong>Total Points:</strong> {points.toFixed(1)} pts</p>

          <div className="mt-4">
            <h3 className="text-cyan-300 font-semibold mb-1">📊 Player Stats</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              {stats.passingYards !== undefined && (
                <li><strong>Passing Yards:</strong> {stats.passingYards}</li>
              )}
              {stats.rushingYards !== undefined && (
                <li><strong>Rushing Yards:</strong> {stats.rushingYards}</li>
              )}
              {stats.receivingYards !== undefined && (
                <li><strong>Receiving Yards:</strong> {stats.receivingYards}</li>
              )}
              {stats.touchdowns !== undefined && (
                <li><strong>Touchdowns:</strong> {stats.touchdowns}</li>
              )}
              {stats.interceptions !== undefined && (
                <li><strong>Interceptions:</strong> {stats.interceptions}</li>
              )}
              {stats.fumbles !== undefined && (
                <li><strong>Fumbles:</strong> {stats.fumbles}</li>
              )}
              {stats.receptions !== undefined && (
                <li><strong>Receptions:</strong> {stats.receptions}</li>
              )}
              {stats.targets !== undefined && (
                <li><strong>Targets:</strong> {stats.targets}</li>
              )}
              {stats.fieldGoals !== undefined && (
                <li><strong>Field Goals:</strong> {stats.fieldGoals}</li>
              )}
              {stats.fieldGoalAttempts !== undefined && (
                <li><strong>FG Attempts:</strong> {stats.fieldGoalAttempts}</li>
              )}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
