import { useState } from 'react'
import LeftArrowIcon from '../assets/solar_arrow-down-outline.svg'
import Tools from '../components/Tools'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export default function WriteArticle() {
    const [editing, setEditing] = useState(true)
    const [textValue, setTextvalue] = useState('')
    const [titleValue, setTitleValue] = useState('')
    const { state } = useAuthContext()

    const navigate = useNavigate()

    const toggleEditing = () => setEditing(prev => !prev)

    const handleSubmit = async () => {
        if (!textValue || !titleValue) return
        if (!state.user) return
        const firstRes = await fetch(`${import.meta.env.VITE_API}documents`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                name: titleValue,
                user_id: state.user.id,
                authority_level: 2,
                library_id: 1
            })
        })
        const firstJson = await firstRes.json()
        const documentId = firstJson.document.id
        const secondRes = await fetch(`${import.meta.env.VITE_API}articles`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                name: 'text',
                article_type: 'text',
                content: textValue,
                user_id: state.user.id,
                library_id: 1,
                document_id: documentId
            })
        })
        if (secondRes.ok) navigate(-1)
        else alert('error')
    }

    return (
        <div className='bg-csomegrey min-h-screen'>
            <p className='ml-[250px] font-inter font-medium text-3xl mt-20'>Режим {editing ? 'редактора' : 'чтения'}</p>
            <div className='font-inter text-[16px] w-fit font-extralight border-[1px] border-csomegrey2-2 rounded-xl text-black py-1 select-none cursor-pointer flex items-center px-3 gap-3 ml-[250px] mt-8'>
                <img src={LeftArrowIcon} className='w-[20px] h-[20px] rotate-180 block' />
                <span onClick={() => navigate(-1)}>вернуться</span>
            </div>
            <input className='ml-[250px] font-inter font-medium text-3xl mt-12 bg-transparent w-[1000px] block' placeholder='Напишите название статьи...' value={titleValue} onChange={e => setTitleValue(e.target.value)} />

            <section className="flex flex-col pl-[250px] w-[1520px] mt-6">
                <hr className="h-[3px] bg-csomegrey2-2 border-[1px] w-full mb-6" />
                <textarea className='font-inter text-[20px] font-extralight bg-transparent resize-none h-[450px]' value={textValue} placeholder='Напишите текст статьи...' onChange={e => setTextvalue(e.target.value)} ></textarea>
            </section>
            <div className='flex justify-end w-[1520px] mt-20'>
                {editing ? <div className='font-inter text-[16px] w-fit font-extralight border-[1px] border-csomegrey2-2 rounded-3xl text-black py-3 select-none cursor-pointer flex items-center px-7 gap-3 ml-[250px]' onClick={() => handleSubmit()}>
                    <span>Опубликовать</span>
                </div> : null}
            </div>
            <div className='mb-12' />
            <Tools toggleEditing={toggleEditing} />
        </div>
    )
}