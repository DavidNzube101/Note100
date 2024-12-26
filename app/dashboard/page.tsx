'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DbORM } from '@/SarahDB-Client/db'
import { SDBEIsFound } from '@/SarahDB-Client/SarahDB-Extenstion'
import { useRouter } from 'next/router'

interface Note {
  id: string
  name: string
  content: string
  timestamp: string
  datestamp: string
  lecturer: string
  is_premium: string
  textbook: string
  manual: string
}

interface User {
  id: string
  email: string
  name: string
  is_premium_account: string
}

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [newNote, setNewNote] = useState({
    name: '',
    content: '',
    lecturer: '',
    is_premium: 'No'
  })
  const dbORM = new DbORM()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const allNotes = await dbORM.getAll('Notes') as Record<string, Note>
      setNotes(Object.values(allNotes))

      const userId = localStorage.getItem('userId')
      if (userId) {
        const userResult = await SDBEIsFound('UserN100', 'id', userId)
        if (userResult && userResult.status[0] !== "not found") {
          const allUsers = await dbORM.getAll('UserN100') as Record<string, User>
          const currentUser = allUsers[userResult.status[1]]
          setUser(currentUser)
          setIsAdmin(currentUser.email === 'admin@note100.com')
        } else {
          // If user not found, redirect to login
          router.push('/login')
        }
      } else {
        // If no userId in localStorage, redirect to login
        router.push('/login')
      }
    }

    fetchData()
  }, [router])

  const handlePayment = () => {
    router.push('/premium')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewNote(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setNewNote(prev => ({ ...prev, is_premium: checked ? 'Yes' : 'No' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const timestamp = new Date().toLocaleTimeString()
    const datestamp = new Date().toISOString().split('T')[0]
    const noteData = {
      ...newNote,
      timestamp,
      datestamp,
      textbook: 'Nil',
      manual: 'Nil'
    }
    await dbORM.addEntry('Notes', noteData)
    const updatedNotes = await dbORM.getAll('Notes') as Record<string, Note>
    setNotes(Object.values(updatedNotes))
    setNewNote({ name: '', content: '', lecturer: '', is_premium: 'No' })
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome to Note100, {user?.name}</h1>
        {user?.is_premium_account !== 'True' && (
          <Button onClick={handlePayment}>Upgrade to Premium</Button>
        )}
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Notes</TabsTrigger>
          <TabsTrigger value="premium">Premium Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <Card key={note.id} className={note.is_premium === 'Yes' && user?.is_premium_account !== 'True' ? 'opacity-50' : ''}>
                <CardHeader>
                  <CardTitle>{note.name}</CardTitle>
                  <CardDescription>{note.lecturer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{note.is_premium === 'Yes' && user?.is_premium_account !== 'True' ? 'Premium Content' : note.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="premium">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.filter(note => note.is_premium === 'Yes').map((note) => (
              <Card key={note.id} className={user?.is_premium_account !== 'True' ? 'opacity-50' : ''}>
                <CardHeader>
                  <CardTitle>{note.name}</CardTitle>
                  <CardDescription>{note.lecturer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{user?.is_premium_account === 'True' ? note.content : 'Premium Content'}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {isAdmin && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Admin: Add New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                placeholder="Note Title" 
                name="name" 
                value={newNote.name} 
                onChange={handleInputChange} 
                required 
              />
              <Input 
                placeholder="Lecturer" 
                name="lecturer" 
                value={newNote.lecturer} 
                onChange={handleInputChange} 
                required 
              />
              <Textarea 
                placeholder="Note Content" 
                name="content" 
                value={newNote.content} 
                onChange={handleInputChange} 
                required 
              />
              <div className="flex items-center space-x-2">
                <Switch 
                  id="premium-mode" 
                  checked={newNote.is_premium === 'Yes'}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="premium-mode">Premium Note</Label>
              </div>
              <Button type="submit">Add Note</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}