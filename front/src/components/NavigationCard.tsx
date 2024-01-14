import RightArrowIcon from '../assets/solar_arrow-down-outline.svg'
import { useNavigate } from 'react-router-dom'

type NavigationCardProps = {
    header: string
    firstLine: string
    secondLine: string
    thirdLine: string
    fourthLine?: string
    to: string
    add?: boolean
}

export default function NavigationCard({ header, firstLine, secondLine, thirdLine, fourthLine, to, add }: NavigationCardProps) {

    const navigate = useNavigate()

    return <section className="w-[400px] h-[320px] bg-white rounded-3xl flex flex-col px-8 justify-between cursor-pointer">
        <div className='pt-6'>
            <p className='font-inter font-medium text-[20px]'>{header}</p>
            <p className='font-inter pt-6 text-[15px]'>{firstLine}</p>
            <p className='font-inter pt-2 text-[15px]'>{secondLine}</p>
            <p className='font-inter pt-2 text-[15px]'>{thirdLine}</p>
            {fourthLine ? <p className='font-inter pt-2 text-[15px]'>{fourthLine}</p> : null}
        </div>
        <div className='flex items-center font-light self-end pb-6 gap-2 font-inter text-[16px]' onClick={() => to && navigate(to)}>{add ? 'Добавить' : 'Перейти'}<img className='bg-csomegrey rounded-full w-[20px] h-[20px]' src={RightArrowIcon} /></div>
    </section>
}