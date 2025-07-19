import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { useMatchStore } from "@/store/matchStore"

export const ChatTab = () => {
  const chatMessages = useMatchStore((s) => s.chatMessages)
  const chatMessage = useMatchStore((s) => s.chatMessage)
  const setChatMessage = useMatchStore((s) => s.setChatMessage)
  const addChatMessage = useMatchStore((s) => s.addChatMessage)

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        user: "You",
        message: chatMessage,
        timestamp: new Date(),
        isOwn: true,
      }
      addChatMessage(newMessage)
      setChatMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage()
  }

  return (
    <div>
      <ScrollArea className="h-64 mb-4 pr-2">
        <div className="space-y-3">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.isOwn
                    ? "bg-cyan-500/20 text-cyan-100"
                    : "bg-gray-700/50 text-gray-100"
                }`}
              >
                <div className="font-semibold text-xs mb-1">{message.user}</div>
                <div>{message.message}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Type your message..."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={sendMessage} variant="secondary" className="px-3">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
