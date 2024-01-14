import { useState } from 'react'
import MagnifierIcon from '../assets/simple-line-icons_magnifier.svg'
import Formula from '../components/Formula'
import AddFormula from '../components/AddFomula'

export function Formuly() {
    const [showCreate, setShowCreate] = useState(false)

    const handleToggle = () => {
        if (showCreate) document.body.classList.remove('overflow-hidden')
        else document.body.classList.add('overflow-hidden')
        setShowCreate(prev => !prev)
    }

    return (
        <div className='bg-csomegrey min-h-screen'>
            <p className='ml-[250px] font-inter font-semibold text-3xl mt-20'>Формулы</p>
            <section className="flex pl-[250px] w-[1520px] mt-16">
                <div className="col-span-2 flex border-clightergrey border-[1px] rounded-md flex-grow">
                    <div className='border-clightergrey border-r-[1px] h-[46px] w-[51px] flex items-center justify-center'><img src={MagnifierIcon} className='block max-w-full w-[20px] h-[20px]' /></div>
                    <input className='block outline-none mr-4 ml-6 bg-csomegrey flex-grow' type="text" placeholder='Название формулы' />
                </div>

                <div className='ml-4'>
                    <button className='bg-cdarkergrey rounded-md text-md text-white h-full w-48'>Найти</button>
                </div>
            </section>
            <section className='flex flex-col pl-[250px] w-[1520px]'>
                <div className='flex mt-12 mb-8 justify-between items-center'>
                    <p className='font-inder text-[15px] underline text-csomegrey2-1'>10 формул</p>
                    <div className='font-inter text-[12px] w-24 text-center font-extralight border-[1px] border-cgreen-1 rounded-xl text-black py-1 px-2 select-none cursor-pointer' onClick={() => handleToggle()}>
                        Добавить
                    </div>
                </div>
                <Formula />
                <Formula />
                <Formula />
                <Formula />
                <Formula />
                <Formula />
                <Formula />
                <Formula />
                <Formula />
                <Formula />
                <hr className="h-[2px] bg-csomegrey2-2 border-[1px]" />
            </section>

            <div className='mb-12' />
            {showCreate ? <AddFormula handleToggle={handleToggle} /> : null}
        </div>
    )
}