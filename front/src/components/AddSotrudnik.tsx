type AddSotrudnikProps = {
    handleToggle(): void
}

export default function AddSotrudnik({ handleToggle }: AddSotrudnikProps) {
    return <>
        <div className="fixed top-0 left-0 w-full h-full" onClick={() => handleToggle()} />
        <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black font-inter font-bold text-3xl p-6 w-[1000px] h-[320px] shadow-xl flex flex-col">
            <p className="font-inter text-2xl font-medium">Добавить сотрудника</p>
            <div className="pt-12 flex gap-2">
                <input type="text" placeholder="ФИО сотрудника" className="w-[362px] h-12 font-inder text-lg border-black border-[1px] pl-4" />
                <select className='font-inter text-lg w-[207px] bg-white text-white2-1 border-[1px] border-clightergrey rounded-md ml-4 pl-2 outline-none cursor-pointer'>
                    <option value="" selected className='g-white text-white2-1'>Вакансия</option>
                    <option value="lol" className='g-white text-white2-1'>Архитектор</option>
                    <option value="lol2" className='g-white text-white2-1'>Сеньор</option>
                    <option value="lol22" className='g-white text-white2-1'>Мидл</option>
                </select>
                <select className='font-inter text-lg w-[207px] bg-white text-white2-1 border-[1px] border-clightergrey rounded-md ml-4 pl-2 outline-none cursor-pointer'>
                    <option value="" selected className='g-white text-white2-1'>Опыт</option>
                    <option value="lol" className='g-white text-white2-1'>1-3 года</option>
                    <option value="lol2" className='g-white text-white2-1'>Больше 3 лет</option>
                </select>
                <select className='font-inter text-lg w-[207px] bg-white text-white2-1 border-[1px] border-clightergrey rounded-md ml-4 pl-2 outline-none cursor-pointer'>
                    <option value="" selected className='g-white text-white2-1'>Город</option>
                    <option value="lol" className='g-white text-white2-1'>Москва</option>
                    <option value="lol2" className='g-white text-white2-1'>Екатеринбург</option>
                </select>
            </div>
            <div className='font-inter text-[15px] h-10  self-end mt-24 w-32 text-center font-extralight border-[1px] border-cgrey rounded-[2rem] text-black py-1 px-2 select-none cursor-pointer'>
                    Сохранить
                </div>
        </section>
    </>
}