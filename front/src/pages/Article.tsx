import { useEffect, useState } from 'react'
import LeftArrowIcon from '../assets/solar_arrow-down-outline.svg'
import Tools from '../components/Tools'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Article() {
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const navigate = useNavigate()
    const toggleEditing = () => setEditing(prev => !prev)

    const searchParams = useSearchParams()[0]
    const id = searchParams.get('id')

    const fetchData = async (id: string) => {
        const response = await fetch(`${import.meta.env.VITE_API}documents/${id}`, {
            method: "GET"
        })
        const json = await response.json()
        if (response.ok) {
            setTitle(json.document.name)
            setContent(json.document.articles[0].content)
        }
    }

    useEffect(() => {fetchData(id ?? '')}, [id])

    return (
        <div className='bg-csomegrey min-h-screen'>
            <p className='ml-[250px] font-inter font-medium text-3xl mt-20'>Режим {editing ? 'редактора' : 'чтения'}</p>
            <div className='font-inter text-[16px] w-fit font-extralight border-[1px] border-csomegrey2-2 rounded-xl text-black py-1 select-none cursor-pointer flex items-center px-3 gap-3 ml-[250px] mt-8'>
                <img src={LeftArrowIcon} className='w-[20px] h-[20px] rotate-180 block' />
                <span onClick={() => navigate(-1)}>вернуться</span>

            </div>
            <p className='ml-[250px] font-inter font-medium text-3xl mt-12'>{title}</p>

            <section className="flex flex-col pl-[250px] w-[1520px] mt-6">
                <hr className="h-[3px] bg-csomegrey2-2 border-[1px] w-full mb-6" />
                <span className='font-inter text-[20px] font-extralight'>
                    {content}
                </span>
            </section>
            <div className='flex justify-end w-[1520px] mt-20'>
                {editing ? <div className='font-inter text-[16px] w-fit font-extralight border-[1px] border-csomegrey2-2 rounded-3xl text-black py-3 select-none cursor-pointer flex items-center px-7 gap-3 ml-[250px]'>
                    <span>Сохранить</span>
                </div> : null}
            </div>
            <div className='mb-12' />
            <Tools toggleEditing={toggleEditing} />
        </div>
    )
}