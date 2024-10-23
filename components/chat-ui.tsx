'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Folder, Menu, MessageSquare, Plus, Send } from "lucide-react"
import { useState } from 'react'

export function ChatUi() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Previous Chat 1" },
    { id: 2, title: "Previous Chat 2" },
    { id: 3, title: "Previous Chat 3" },
  ])

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left Column */}
      <div className="w-64 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <Button className="w-full justify-start" variant="outline">
            <Plus className="mr-2 h-4 w-4" /> NEW FILE
          </Button>
        </div>
        <div className="p-4 flex-1">
          <h2 className="font-semibold mb-2">Folder Embedding</h2>
          <Input type="file" className="mb-2" {...{ webkitdirectory: "true" } as any} />
          <Button className="w-full">
            <Folder className="mr-2 h-4 w-4" /> Embed Folder
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Chat</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4">
          {/* Chat messages would go here */}
          <div className="space-y-4">
            <div className="bg-muted p-3 rounded-lg">
              <p>Hello! How can I assist you today?</p>
            </div>
            <div className="bg-primary text-primary-foreground p-3 rounded-lg ml-auto max-w-[80%]">
              <p>Can you help me with React hooks?</p>
            </div>
            {/* More messages... */}
          </div>
        </ScrollArea>
        <div className="border-t border-border p-4">
          <form className="flex items-center space-x-2">
            <Textarea 
              placeholder="Type your message here..." 
              className="flex-1 min-h-[50px] max-h-[200px]"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Right Sidebar for Chat History */}
      {isSidebarOpen && (
        <div className="w-64 border-l border-border">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Chat History</h2>
          </div>
          <ScrollArea className="h-full">
            {chatHistory.map((chat) => (
              <Button key={chat.id} variant="ghost" className="w-full justify-start p-4">
                <MessageSquare className="mr-2 h-4 w-4" />
                {chat.title}
              </Button>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}