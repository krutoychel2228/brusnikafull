import { useNavigate } from "react-router-dom"
import { UserActions } from "../context/AuthContext"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: UserActions.REMOVE, payload: null})
        navigate('/')
    }

    return {logout}
}