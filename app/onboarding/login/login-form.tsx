'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export default function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()
            console.log("API Response", data);

            if (!response.ok) {
                throw new Error(data.error || 'Login failed')
            }

            localStorage.setItem('sessionToken', data.sessionToken)
            localStorage.setItem('userId', data.id)
            localStorage.setItem('userEmail', data.email)
            localStorage.setItem('isAdmin', data.isAdmin)

            data.isAdmin ? router.push('/admin-dashboard') : router.push('/dashboard')
            console.log('isAdmin', data.isAdmin);
            console.log("ereeee", data.sessionToken, data.id, localStorage);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-[350px] border border-solid border-[#000] rounded-lg">
            <CardHeader>
                <CardTitle>Login to Note100</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full bg-black rounded-full hover:bg-[#2a2a2a]" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-center w-full">
                    Don't have an account? <Link className='text-blue-600' href="/onboarding/register">Register Here</Link>
                </p>
            </CardFooter>
        </Card>
    )
}

