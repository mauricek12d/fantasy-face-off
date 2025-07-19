'use client'

import { useRef, useEffect } from "react"
import { useMatchStore } from "@/store/matchStore"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Volume2,
  VolumeX,
  Zap,
  Target,
  History,
  MessageCircle,
  BarChart3,
} from "lucide-react"
import { BattleTab } from "@/components/BattleTab"
import { FormationView } from "@/components/FormationView"
import { ChatTab } from "@/components/ChatTab"
import { opponentTeam, yourTeam } from "@/lib/mockData"

export default function Home() {
  // 🧠 Zustand State
  const activeTab = useMatchStore((state) => state.activeTab)
  const setActiveTab = useMatchStore((state) => state.setActiveTab)
  const soundEnabled = useMatchStore((state) => state.soundEnabled)
  const setSoundEnabled = useMatchStore((state) => state.setSoundEnabled)
  const isLive = useMatchStore((state) => state.isLive)
  const setIsLive = useMatchStore((state) => state.setIsLive)

  // 🔈 Audio Refs
  const crowdAudioRef = useRef<HTMLAudioElement>(null)
  const airhornRef = useRef<HTMLAudioElement>(null)
  const whistleRef = useRef<HTMLAudioElement>(null)

  // 🔁 Crowd noise effect toggle
  useEffect(() => {
    const crowd = crowdAudioRef.current
    if (!crowd) return

    crowd.volume = 0.3
    crowd.muted = !soundEnabled

    if (isLive && soundEnabled) {
      crowd.play().catch(err =>
        console.warn("Crowd audio failed to play:", err)
      )
    } else {
      crowd.pause()
      crowd.currentTime = 0
    }
  }, [isLive, soundEnabled])

  // 🔊 Play a one-time sound
  const playSound = (ref: React.RefObject<HTMLAudioElement | null>) => {
    if (!soundEnabled || !ref.current) return
    ref.current.currentTime = 0
    ref.current.volume = 0.8
    ref.current.play().catch(err =>
      console.warn("Failed to play sound:", err)
    )
  }

  // 🟢 Match toggle with whistle or airhorn
  const toggleMatch = () => {
    setIsLive(!isLive)
    if (!isLive) {
      playSound(whistleRef) // match starting
      setTimeout(() => playSound(airhornRef), 500) // add airhorn slightly after
    } else {
      playSound(whistleRef) // match ending
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden text-white">
      {/* 🎵 Hidden Audio Elements */}
      <audio ref={crowdAudioRef} loop preload="auto">
        <source src="/sounds/crowd.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={airhornRef} preload="auto">
        <source src="/sounds/airhorn.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={whistleRef} preload="auto">
        <source src="/sounds/whistle.mp3" type="audio/mpeg" />
      </audio>

      {/* 🧭 Navbar */}
      <Card className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 border-2 border-purple-500/30 mb-6 backdrop-blur-sm">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            FANTASY FACE-OFF ARENA
          </h1>
          <div className="flex items-center space-x-4">
            <Button
              title={soundEnabled ? "Mute Sound" : "Enable Sound"}
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-gray-400 hover:text-white"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
            <Badge variant="outline" className="border-green-400 text-green-400">
              Online
            </Badge>
          </div>
        </div>
      </Card>

      {/* 🔄 Main Tabs */}
      <main className="relative z-10 p-4 max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-gray-700">
            <TabsTrigger value="battle" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Zap className="w-4 h-4 mr-2" /> Battle
            </TabsTrigger>
            <TabsTrigger value="formation" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Target className="w-4 h-4 mr-2" /> Formation
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
              <History className="w-4 h-4 mr-2" /> History
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <MessageCircle className="w-4 h-4 mr-2" /> Chat
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              <BarChart3 className="w-4 h-4 mr-2" /> Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="battle">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              <BattleTab />
            </div>
          </TabsContent>

          <TabsContent value="formation">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              <FormationView team={yourTeam} />
              <FormationView team={opponentTeam} isOpponent />
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              <ChatTab />
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              Match history content goes here...
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              Stats dashboard goes here...
            </div>
          </TabsContent>
        </Tabs>

        {/* 🎮 Match Toggle */}
        <div className="text-center mt-6">
          <Button
            onClick={toggleMatch}
            variant="default"
            className={`text-white font-bold px-6 py-2 ${
              isLive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLive ? "End Match" : "Start Match"}
          </Button>
        </div>
      </main>
    </div>
  )
}
