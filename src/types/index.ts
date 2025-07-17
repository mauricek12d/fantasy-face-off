// Player type
export interface Player {
  id: string
  name: string
  position: string
  points: number
  avatar: string
  team: string
  stats: {
    passingYards?: number
    rushingYards?: number
    receivingYards?: number
    touchdowns: number
    interceptions?: number
    fumbles?: number
    targets?: number
    receptions?: number
    fieldGoals?: number
    fieldGoalAttempts?: number
  }
  formationPosition: {
    x: number
    y: number
  }
}

// Chat message type
export interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: Date
  isOwn: boolean
}

// Match history type
export interface MatchHistory {
  id: string
  date: Date
  duration: string
  result: 'win' | 'loss' | 'draw'
  score: {
    user: number
    opponent: number
  }
  opponent: string
  yourScore: number
  highlights?: string[]
}
