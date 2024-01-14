type AddFormulaProps = {
    handleToggle(): void
}

export default function AddFormula({ handleToggle }: AddFormulaProps) {
    return <>
        <div className="fixed top-0 left-0 w-full h-full" onClick={() => handleToggle()} />
        <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black font-inter font-bold text-3xl p-6 w-[1000px] h-[300px] shadow-xl flex flex-col">
            <p className="font-inter text-2xl font-medium">Создание формулы</p>
            <div className="pt-12 flex gap-10">
                <input type="text" placeholder="Введите название формулы" className="w-[362px] h-12 font-inder text-lg border-black border-[1px] pl-4" />
                <input type="text" placeholder="Введите название формулы" className="w-[537px] h-12 font-inder text-lg border-black border-[1px] pl-4" />
            </div>
            <div className='font-inter text-[15px] h-10  self-end mt-16 w-32 text-center font-extralight border-[1px] border-cgrey rounded-[2rem] text-black py-1 px-2 select-none cursor-pointer'>
                    Сохранить
                </div>
        </section>
    </>
}