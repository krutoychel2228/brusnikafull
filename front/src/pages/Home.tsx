import NavigationCard from "../components/NavigationCard"

export default function Home() {

    return (
        <div className='bg-csomegrey min-h-screen'>
            <h1 className="font-grtskmegabold text-white text-sm bg-cred h-20 py-7 pl-[250px]">БРУСНИКА</h1>
            <div className="bg-white border-clightergrey h-20" />
            <div className="bg-clightestgrey border-clightergrey border-[1px] h-20" />
            <p className='ml-[250px] font-inter font-medium text-3xl mt-20'>Главная страница</p>
            <section className='grid grid-cols-3 gap-4 ml-[250px] mt-12 w-[1232px]'>
                <NavigationCard header="Производственная деятельность" firstLine="Заказчик" secondLine="Проектирование" thirdLine="Организация строительства" to="/proizvodstvennayadeyatelnost" />
                <NavigationCard header="Продажи" firstLine="Маркетинг" secondLine="Операционная реклама" thirdLine="Стратегическая маркетинговая деятельность" to="prodazhi"/>
                <NavigationCard header="Экономика и финансы" firstLine="Бухгалтерия" secondLine="Плановая экономика" thirdLine="Привлечение заемных средств" to="ekonomika"/>
                <NavigationCard header="Организационная деятельность" firstLine="IT" secondLine="Организационное развитие" thirdLine="Административная деятельность" to="organizacionnayadeyatelnost" />
            </section>
            <div className='mb-12' />
        </div>
    )
}