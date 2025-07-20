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
import { DialogModal } from "@/components/DialogModal"
import { LiveDot } from "@/components/ui/LiveDot"
import { GradientButton } from "@/components/GradientButton"

export default function Home() {
  const {
    activeTab,
    setActiveTab,
    soundEnabled,
    setSoundEnabled,
    isLive,
    setIsLive,
  } = useMatchStore()

  const crowdAudioRef = useRef<HTMLAudioElement>(null)
  const airhornRef = useRef<HTMLAudioElement>(null)
  const whistleRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const crowd = crowdAudioRef.current
    if (!crowd) return

    crowd.volume = 0.3
    crowd.muted = !soundEnabled

    if (isLive && soundEnabled) {
      crowd.play().catch(err => console.warn("Crowd audio failed to play:", err))
    } else {
      crowd.pause()
      crowd.currentTime = 0
    }
  }, [isLive, soundEnabled])

  const playSound = (ref: React.RefObject<HTMLAudioElement | null>) => {
    if (!soundEnabled || !ref.current) return
    ref.current.currentTime = 0
    ref.current.volume = 0.8
    ref.current.play().catch(err => console.warn("Failed to play sound:", err))
  }

  const toggleMatch = () => {
    setIsLive(!isLive)
    if (!isLive) {
      playSound(whistleRef)
      setTimeout(() => playSound(airhornRef), 500)
    } else {
      playSound(whistleRef)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden text-white">
      {/* Audio */}
      <audio ref={crowdAudioRef} loop preload="auto">
        <source src="/sounds/crowd.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={airhornRef} preload="auto">
        <source src="/sounds/airhorn.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={whistleRef} preload="auto">
        <source src="/sounds/whistle.mp3" type="audio/mpeg" />
      </audio>

      {/* Header */}
      <Card className="bg-gradient-to-r from-gray-800 to-gray-700 border-2 border-purple-500/30 mb-6 text-white">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">FANTASY FACE-OFF ARENA</h1>
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
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-green-400 text-green-400">
                Online
              </Badge>
              {isLive && <LiveDot size="sm" />}
            </div>
          </div>
        </div>
      </Card>

      {/* Main */}
      <main className="relative z-10 p-4 max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-gray-900/50 border border-gray-700">
            <TabsTrigger value="battle" className="text-white data-[state=active]:text-cyan-400 data-[state=active]:bg-cyan-500/20">
              <Zap className="w-4 h-4 mr-2" /> Battle
            </TabsTrigger>
            <TabsTrigger value="formation" className="text-white data-[state=active]:text-green-400 data-[state=active]:bg-green-500/20">
              <Target className="w-4 h-4 mr-2" /> Formation
            </TabsTrigger>
            <TabsTrigger value="history" className="text-white data-[state=active]:text-yellow-400 data-[state=active]:bg-yellow-500/20">
              <History className="w-4 h-4 mr-2" /> History
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-white data-[state=active]:text-purple-400 data-[state=active]:bg-purple-500/20">
              <MessageCircle className="w-4 h-4 mr-2" /> Chat
            </TabsTrigger>
            <TabsTrigger value="stats" className="text-white data-[state=active]:text-orange-400 data-[state=active]:bg-orange-500/20">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormationView team={yourTeam} />
                <FormationView team={opponentTeam} isOpponent />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              <ChatTab />
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                Match history content goes here...
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                Stats dashboard content goes here...
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Match button */}
        <div className="text-center mt-6">
          <GradientButton onClick={toggleMatch}>
            {isLive ? "End Match" : "Start Match"}
          </GradientButton>
        </div>

        {/* Live Status */}
        {isLive && (
          <div className="mt-2 flex justify-center">
            <LiveDot size="md" label="Match in Progress" />
          </div>
        )}

        <DialogModal />
      </main>
    </div>
  )
}
