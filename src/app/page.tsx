'use client'

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

export default function Home() {
  const activeTab = useMatchStore((state) => state.activeTab)
  const setActiveTab = useMatchStore((state) => state.setActiveTab)
  const soundEnabled = useMatchStore((state) => state.soundEnabled)
  const setSoundEnabled = useMatchStore((state) => state.setSoundEnabled)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black relative overflow-hidden text-white">
      {/* 🌟 Background Effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* 🧭 Navigation Bar */}
      <Card className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 border-2 border-purple-500/30 mb-6 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              FANTASY FACE-OFF ARENA
            </h1>
            <div className="flex items-center space-x-4">
              <Button
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
        </div>
      </Card>

      {/* 🗂️ Main Content */}
      <main className="relative z-10 p-4 max-w-6xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-gray-700">
            <TabsTrigger
              value="battle"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              <Zap className="w-4 h-4 mr-2" />
              Battle
            </TabsTrigger>
            <TabsTrigger
              value="formation"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              <Target className="w-4 h-4 mr-2" />
              Formation
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
            >
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Stats
            </TabsTrigger>
          </TabsList>

          {/* Tab Content Areas */}
          <TabsContent value="battle">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              Battle tab content goes here...
            </div>
          </TabsContent>

          <TabsContent value="formation">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              Formation view goes here...
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              Match history content goes here...
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              Chat interface goes here...
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="p-4 border border-gray-700 rounded-lg bg-black bg-opacity-50">
              Stats dashboard goes here...
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
