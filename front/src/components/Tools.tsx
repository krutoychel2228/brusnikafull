import { useState } from 'react'
import CalculatorIcon from '../assets/bi_calculator-fill.svg'
import ButtonIcon from '../assets/knopka.svg'
import RedactIcon from '../assets/redact.svg'
import ListedFormula from './ListedFormula'

type ToolsProps = {
    toggleEditing(): void
}

export default function Tools({ toggleEditing }: ToolsProps) {
    const [showOptions, setShowOptions] = useState(false)
    const [showFormulas, setShowFormulas] = useState(false)

    return <div className="fixed bottom-10 right-10">
        <div className='relative'>
            <img src={ButtonIcon} className='w-[60px] h-[60px] select-none cursor-pointer' onClick={() => {
                setShowOptions(prev => !prev)
                setShowFormulas(false)
                }} />
            {showOptions && showFormulas ?
                <div className='absolute w-[325px] h-[700px] bottom-[216px] right-[0px] bg-white shadow-md rounded-md flex flex-col px-4'>
                    <span className='font-inter text-lg font-semibold mt-4 '>Список формул</span>
                    <div className=' h-[234px] mt-4  flex flex-col overflow-y-scroll formulaScrollbar'>
                        <div className='border-[1px] border-csomegrey2-2 mr-6' />
                        <ListedFormula />
                        <ListedFormula />
                        <ListedFormula />
                        <ListedFormula />
                        <ListedFormula />
                        <ListedFormula />
                    </div>
                    <div className=' flex flex-col'>
                        <div className='text-csomegrey2-2 text-lg border-[1px] border-black mx-4 mt-6 h-8 rounded-lg text-center'>
                            &#123;var1&#125;+&#123;var2&#125;*2
                        </div>
                        <div className='flex flex-col mt-6 gap-4'>
                            <input type="text" className='block pl-4 h-8 border-[1px] border-black mx-4 rounded-lg text-csomegrey2-2 text-lg' placeholder='Введите var1' />
                            <input type="text" className='block pl-4 h-8 border-[1px] border-black mx-4 rounded-lg text-csomegrey2-2 text-lg' placeholder='Введите var2' />
                            <input type="text" className='block pl-4 h-8 border-[1px] border-black mx-4 rounded-lg text-csomegrey2-2 text-lg' placeholder='Введите var3' />
                            <input type="text" className='block pl-4 h-8 border-[1px] border-black mx-4 rounded-lg text-csomegrey2-2 text-lg' placeholder='Введите var4' />
                        </div>
                        <div className='font-inter text-lg border-[1px] border-black text-center mx-4 mt-6 h-8 rounded-lg cursor-text'>
                            Вывод
                        </div>
                        <div className='font-inter text-lg border-[1px] border-black text-center w-40 self-end mt-12 rounded-3xl cursor-pointer select-none'>
                            Рассчитать
                        </div>
                    </div>
                </div>
                : null}
            {showOptions ?
                <div className='absolute bottom-[75px] right-0 w-[220px] h-[122px] bg-white rounded-md shadow-md'>
                    <div className='h-[60px] flex items-center px-4 select-none cursor-pointer'>
                        <img src={RedactIcon} className='w-[33px] h-[33px]' />
                        <span className='font-inter pl-3' onClick={() => toggleEditing()}>Редактировать</span>
                    </div>
                    <div className='h-[1px] bg-csomegrey2-2' />
                    <div className='h-[60px] flex items-center px-4 select-none cursor-pointer'>
                        <img src={CalculatorIcon} className='w-[33px] h-[33px]' />
                        <span className='font-inter pl-3' onClick={() => setShowFormulas(prev => !prev)}>Формулы</span>
                    </div>
                </div>
                : null}
        </div>
    </div>
}