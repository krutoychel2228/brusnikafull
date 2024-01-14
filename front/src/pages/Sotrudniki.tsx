import { useEffect, useState } from 'react'
import MagnifierIcon from '../assets/simple-line-icons_magnifier.svg'
import Sotrudnik from '../components/Sotrudnik'
import AddSotrudnik from '../components/AddSotrudnik'
import React from 'react'

type Worker = {
    first_name: string
    last_name: string
    role: number
}

export default function Sotrudniki() {
    const [showAdd, setShowAdd] = useState(false)
    const [workers, setWorkers] = useState<Worker[]>([])
    const [displayWorkers, setDisplayWorkers] = useState<Worker[]>([])
    const [searchInput, setSearchInput] = useState('')

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setSearchInput(newValue)
        setDisplayWorkers(workers.filter(e => `${e.first_name} ${e.last_name}`.toLowerCase().startsWith(newValue.toLowerCase())))
    }

    const handleToggle = () => {
        if (showAdd) document.body.classList.remove('overflow-hidden')
        else document.body.classList.add('overflow-hidden')
        setShowAdd(prev => !prev)
    }
    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_API}users`, {
            method: "GET"
        })
        if (!response.ok) return console.log(response)
        const json = await response.json()
        setWorkers(json.users)
        setDisplayWorkers(json.users)
    }

    useEffect(() => { fetchData() }, [])
    useEffect(() => {console.log(workers)}, [workers])

    let stringEnd = ''
    const numberString = displayWorkers.length.toString()
    const index = numberString.length - 1
    if (numberString[index] !== '1') stringEnd = 'ов'
    if (numberString[index] === '2' || numberString[index] === '3' || numberString[index] === '4') stringEnd = 'а'

    return (
        <div className='bg-csomegrey min-h-screen'>
            <p className='ml-[250px] font-inter font-semibold text-3xl mt-20'>Сотрудники</p>
            <section className="flex pl-[250px] w-[1520px] mt-16">
                <div className="col-span-2 flex border-clightergrey border-[1px] rounded-md w-[412px]">
                    <div className='border-clightergrey border-r-[1px] h-[46px] w-[51px] flex items-center justify-center'><img src={MagnifierIcon} className='block max-w-full w-[20px] h-[20px]' /></div>
                    <input className='block outline-none mr-4 ml-6 bg-csomegrey flex-grow' type="text" placeholder='ФИО сотрудника' value={searchInput} onChange={handleChange} />
                </div>
                <select className='w-[207px] bg-csomegrey text-csomegrey2-1 border-[1px] border-clightergrey rounded-md ml-4 pl-2 outline-none cursor-pointer'>
                    <option value="" selected className='g-csomegrey text-csomegrey2-1'>Вакансия</option>
                    <option value="lol" className='g-csomegrey text-csomegrey2-1'>Архитектор</option>
                    <option value="lol2" className='g-csomegrey text-csomegrey2-1'>Сеньор</option>
                    <option value="lol22" className='g-csomegrey text-csomegrey2-1'>Мидл</option>
                </select>
                <select className='w-[207px] bg-csomegrey text-csomegrey2-1 border-[1px] border-clightergrey rounded-md ml-4 pl-2 outline-none cursor-pointer'>
                    <option value="" selected className='g-csomegrey text-csomegrey2-1'>Опыт</option>
                    <option value="lol" className='g-csomegrey text-csomegrey2-1'>1-3 года</option>
                    <option value="lol2" className='g-csomegrey text-csomegrey2-1'>Больше 3 лет</option>
                </select>
                <select className='w-[207px] bg-csomegrey text-csomegrey2-1 border-[1px] border-clightergrey rounded-md ml-4 pl-2 outline-none cursor-pointer'>
                    <option value="" selected className='g-csomegrey text-csomegrey2-1'>Город</option>
                    <option value="lol" className='g-csomegrey text-csomegrey2-1'>Москва</option>
                    <option value="lol2" className='g-csomegrey text-csomegrey2-1'>Екатеринбург</option>
                </select>
                <div className='ml-4'>
                    <button className='bg-cdarkergrey rounded-md text-md text-white h-full w-48'>Найти</button>
                </div>
            </section>
            <section className='flex flex-col pl-[250px] w-[1520px]'>
                <div className='flex mt-12 mb-8 justify-between items-center'>
                    <p className='font-inder text-[15px] underline text-csomegrey2-1'>{displayWorkers.length} сотрудник{stringEnd}</p>
                    <div className='font-inter text-[12px] font-extralight border-[1px] border-cgreen-1 rounded-xl text-black py-1 px-2 select-none cursor-pointer' onClick={() => handleToggle()}>
                        добавить
                    </div>
                </div>
                {displayWorkers.map((worker, index) => <React.Fragment key={index}><Sotrudnik first_name={worker.first_name} last_name={worker.last_name} role={worker.role}/></React.Fragment>)}
                <hr className="h-[2px] bg-csomegrey2-2 border-[1px]" />

            </section>

            <div className='mb-12' />
            {showAdd ? <AddSotrudnik handleToggle={handleToggle} /> : null}
        </div>
    )
}