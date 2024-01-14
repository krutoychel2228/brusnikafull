import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"

export default function NavSection() {

    const { state } = useAuthContext()
    const {logout} = useLogout()
    const navigate = useNavigate()

    const location = window.location.href.split('/')
    const page = location[location.length - 1]
    const shouldShow = page !== 'signup' && page !== 'login'


    return <>
        {shouldShow ? <>
            <div className="bg-cred h-20  pl-[250px]">
                <div className="flex w-[1270px] justify-between">
                    <p className="font-grtskmegabold text-white text-md py-7 select-none cursor-pointer" onClick={() => navigate('/')}>БРУСНИКА</p>
                    <p className="font-grtskmegabold text-white text-md py-7 select-none cursor-pointer" onClick={() => {
                        if (!state.user) navigate('/login')
                        else logout()
                    }}>{state.user ? 'ВЫЙТИ' : 'ВОЙТИ'}</p>
                </div>

            </div>

            <div className="bg-white border-clightergrey h-20" />
            <div className="bg-clightestgrey border-clightergrey border-[1px] h-20" />
        </> : null}
    </>
}