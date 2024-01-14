type SotrudnikProps = {
    first_name: string
    last_name: string
    role: number
}

export default function Sotrudnik({ first_name, last_name, role }: SotrudnikProps) {
    return <>
        <hr className="h-[2px] bg-csomegrey2-2 border-[1px]" />
        <div className="flex w-full mt-4 items-center justify-between mb-4">
            <span className="text-[20px] font-inter">Сотрудник</span>
            <span className="text-[14px] font-inter">{first_name} {last_name}</span>
            <span className="text-[14px] font-inter">1-3 года</span>
            <span className="text-[14px] font-inter">Екатеринбург</span>
            <select className='w-[150px] bg-csomegrey text-csomegrey2-1 h-8 border-[1px] border-clightergrey rounded-md ml-4 pl-2 outline-none cursor-pointer' defaultValue={role === 0 ? 'sotrudnik'  : role === 1 ? 'redaktor' : role === 2 ? 'administrator' : ''}>
            <option value="sotrudnik" className='g-csomegrey text-csomegrey2-1'>Сотрудник</option>
            <option value="redaktor" className='g-csomegrey text-csomegrey2-1'>Редактор</option>
            <option value="administrator" className='g-csomegrey text-csomegrey2-1'>Администратор</option>
        </select>
    </div >
        <div className="flex justify-end pt-[4.5rem]">
            <div className='font-inter text-[12px] w-24 text-center font-extralight border-[1px] border-csomered-1 rounded-xl text-black py-1 px-2 select-none cursor-pointer mb-4'>
                удалить
            </div>
        </div>
    </>
}




