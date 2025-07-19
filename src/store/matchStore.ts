import { create } from "zustand"
import { Player, ChatMessage } from "@/types"

interface MatchState {
  activeTab: string
  matchTime: number
  yourScore: number
  opponentScore: number
  isLive: boolean
  selectedPlayer: Player | null
  soundEnabled: boolean
  chatMessage: string
  chatMessages: ChatMessage[]

  setActiveTab: (tab: string) => void
  setMatchTime: (time: number | ((prev: number) => number)) => void
  setYourScore: (score: number | ((prev: number) => number)) => void
  setOpponentScore: (score: number | ((prev: number) => number)) => void
  setIsLive: (live: boolean) => void
  setSelectedPlayer: (player: Player | null) => void
  setSoundEnabled: (enabled: boolean) => void
  setChatMessage: (message: string) => void
  addChatMessage: (message: ChatMessage) => void
}

export const useMatchStore = create<MatchState>((set) => ({
  activeTab: "battle",
  matchTime: 900,
  yourScore: 86.0,
  opponentScore: 82.5,
  isLive: false,
  selectedPlayer: null,
  soundEnabled: true,
  chatMessage: "",
  chatMessages: [],

  setActiveTab: (tab) => set({ activeTab: tab }),

  setMatchTime: (time) =>
    set((state) => ({
      matchTime: typeof time === "function" ? time(state.matchTime) : time,
    })),

  setYourScore: (score) =>
    set((state) => ({
      yourScore: typeof score === "function" ? score(state.yourScore) : score,
    })),

  setOpponentScore: (score) =>
    set((state) => ({
      opponentScore: typeof score === "function" ? score(state.opponentScore) : score,
    })),

  setIsLive: (live) => set({ isLive: live }),
  setSelectedPlayer: (player) => set({ selectedPlayer: player }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setChatMessage: (message) => set({ chatMessage: message }),
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
}))
