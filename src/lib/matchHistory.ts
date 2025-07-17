import { MatchHistory } from "@/types"

export const matchHistory: MatchHistory[] = [
  {
      id: "1",
      opponent: "DragonSlayer99",
      result: "win",
      date: new Date(2024, 0, 15),
      duration: "15:23",
      score: {
          user: 124.5,
          opponent: 118.2,
      },
      yourScore: 0
  },
  {
      id: "2",
      opponent: "GridIronGoat",
      result: "loss",
      date: new Date(2024, 1, 3),
      duration: "13:47",
      score: {
          user: 110.8,
          opponent: 115.0,
      },
      yourScore: 0
  },
  {
      id: "3",
      opponent: "FantasyFrenzy",
      result: "draw",
      date: new Date(2024, 2, 10),
      duration: "14:10",
      score: {
          user: 98.2,
          opponent: 98.2,
      },
      yourScore: 0
  },
]
