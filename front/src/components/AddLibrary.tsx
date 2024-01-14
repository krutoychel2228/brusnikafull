import { useAuthContext } from "../hooks/useAuthContext"

export default function AddLibrary() {
    const {state} = useAuthContext()

    const addLibrary = async () => {
        if (!state.user) return
        const response = await fetch(`${import.meta.env.VITE_API}libraries`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                name: 'Liba',
                user_id: state.user.id
            })
        })
        const json = await response.json()
        console.log(json)
    }

    return <>
    <div className="bg-red-500 w-40 h-40 cursor-pointer" onClick={() => addLibrary()}>
        {state.user ? 'добавить' : 'нужно зайти для добавления библиотеки'}
    </div>
    </>
}