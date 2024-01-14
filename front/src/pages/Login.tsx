import KeyIcon from '../assets/key.svg'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogin } from '../hooks/useLogin'

export default function Login() {

    const savedPassword = JSON.parse(localStorage.getItem('password') ?? 'null')
    const savedEmail = JSON.parse(localStorage.getItem('email') ?? 'null')

    const [username, setUsername] = useState(savedEmail ? savedEmail : '')
    const [password, setPassword] = useState(savedPassword ? savedPassword : '')
    const [passwordHidden, setPasswordHidden] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [wrongCredentials, setWrongCredentials] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const { state } = useAuthContext()
    const { login } = useLogin()

    const navigate = useNavigate()


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const success = await login(username, password)
        if (success) navigate('/')
    }

    useEffect(() => { if (state.user) navigate('/') }, [state.user, navigate])

    return (
        <article className="bg-cgrey h-[100vh]">
            <hr className="border-0" />
            <section className="bg-white w-[500px] h-[595px] mx-auto mt-24 rounded-[36px] border-black border-2">
                <div className="flex place-content-between py-5 pl-6 pr-4 select-none">
                    <p className="text-2xl inter">Авторизация</p>
                </div>
                <hr className='border-0 h-[1px] bg-clightergrey' />
                <form onSubmit={handleSubmit}>
                    <div className={`flex place-content-between mt-12 border-[1px] mx-4 py-5 rounded-md border-clightergrey`}>
                        <input className='mr-4 ml-3 block flex-grow outline-none' type="text" placeholder='Username' value={username} onChange={e => {
                            setWrongCredentials(false)
                            setUsername(e.target.value)
                        }} />
                    </div>
                    <div className={`flex place-content-between mt-12 border-[1px] mx-4 py-5 rounded-md ${(passwordError || wrongCredentials) ? 'border-cpalered' : 'border-clightergrey'}`}>
                        <img className='w-7 ml-5' src={KeyIcon} />
                        <input className='ml-3 block flex-grow outline-none' type={passwordHidden ? 'password' : 'text'} placeholder='Пароль' value={password} onChange={e => {
                            setWrongCredentials(false)
                            setPasswordError('')
                            setPassword(e.target.value)
                        }} />
                        <div className='border-clightergrey border-l-[1px] mr-4 pl-2 cursor-pointer' onClick={() => setPasswordHidden(prev => !prev)}>Скрыть</div>
                    </div>
                    {(passwordError && !wrongCredentials) ? <p className='absolute text-cpalered ml-4 mt-1'>{passwordError}</p> : null}
                    {wrongCredentials ? <p className='absolute text-cpalered ml-4 mt-1 inter'>Указаны неверные данные</p> : null}

                    <div className='flex place-content-between mt-12 mx-4'>
                        <div className='flex gap-2'>
                            <input className='w-4' type="checkbox" defaultChecked={rememberMe} onClick={() => setRememberMe(prev => !prev)} />
                            <p className='text-lg inter'>Запомнить меня</p>
                        </div>
                        <p className='font-bold text-lg inter'>Забыли пароль?</p>
                    </div>
                    <div className='mx-4 mt-8'>
                        <button className='bg-cred w-full h-16 font-bold text-white text-xl rounded-xl inter'>
                            Войти
                        </button>
                        <div className='bg-csomegrey2-1 w-full h-16 font-bold text-white text-xl rounded-xl inter cursor-pointer mt-4 flex place-content-center items-center' onClick={() => navigate('/signup')}>
                            <span className='h-fit'>Зарегистрироваться</span>
                        </div>
                    </div>
                </form>
            </section>
        </article>
    )
}