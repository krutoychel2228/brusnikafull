export default function Formula() {
    return <>
        <hr className="h-[2px] bg-csomegrey2-2 border-[1px]" />
        <div className="flex w-full items-start pt-2 justify-between mb-4">
            <span className="text-[20px] font-inter">Расчет площади внутренней площади квартиры</span>
            <div className="flex flex-col gap-4 pt-8">
                <div className='font-inter text-[12px] w-32 text-center font-extralight border-[1px] border-cgrey rounded-xl text-black py-1 px-2 select-none cursor-pointer'>
                    Редактировать
                </div>
                <div className='font-inter text-[12px] w-32 text-center font-extralight border-[1px] border-csomered-1 rounded-xl text-black py-1 px-2 select-none cursor-pointer'>
                    Удалить
                </div>
            </div>
        </div>
    </>
}