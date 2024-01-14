import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { UserActions } from '../context/AuthContext'

export const useSignup = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email: string, password: string, first_name: string, last_name: string, role: number, username: string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${import.meta.env.VITE_API}users`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password, first_name, last_name, username, role })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            return false
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify({
                first_name: json.user.first_name,
                last_name: json.user.last_name,
                username: json.user.username,
                role: json.user.role,
                id: json.user.id,
                token: json.authToken.token
            }))
            dispatch({ type: UserActions.SET, payload: json })
            setIsLoading(false)
            return true
        }
    }

    return {signup, isLoading, error}
}