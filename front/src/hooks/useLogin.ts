import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { UserActions } from '../context/AuthContext'

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (username: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const base64Credentials = btoa(`${username}:${password}`);

        const response = await fetch(`${import.meta.env.VITE_API}users/login`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${base64Credentials}`,
                'Content-type': 'application/json'
            }
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

    return { login, isLoading, error }
}