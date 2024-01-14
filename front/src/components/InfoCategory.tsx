import { Route, Routes } from "react-router-dom"
import NavigationCard from "./NavigationCard"
import { InfoCategoryProps } from "./types"
import { Subcategory } from "./Subcategory"




export default function InfoCategory({ title, firstSubcategory, secondSubcategory, thirdSubcategory }: InfoCategoryProps) {
    return <Routes>
        <Route path='/' element={<>
            <p className='ml-[250px] font-inter font-medium text-3xl mt-20'>{title}</p>
            <section className='grid grid-cols-3 gap-4 ml-[250px] mt-12 w-[1270px]'>
                <NavigationCard header={firstSubcategory.title} firstLine={firstSubcategory.firstArticle.title} secondLine={firstSubcategory.secondArticle.title} thirdLine={firstSubcategory.thirdArticle.title} to={firstSubcategory.link} />
                <NavigationCard header={secondSubcategory.title} firstLine={secondSubcategory.secondArticle.title} secondLine={secondSubcategory.secondArticle.title} thirdLine={secondSubcategory.thirdArticle.title} to={secondSubcategory.link} />
                <NavigationCard header={thirdSubcategory.title} firstLine={thirdSubcategory.firstArticle.title} secondLine={thirdSubcategory.secondArticle.title} thirdLine={thirdSubcategory.thirdArticle.title} to={thirdSubcategory.link} />
            </section>
        </>} />
        <Route path={'/' + firstSubcategory.link.split('/')[2]} element={
            <Subcategory
                title={firstSubcategory.title}
                firstArticle={firstSubcategory.firstArticle}
                secondArticle={firstSubcategory.secondArticle}
                thirdArticle={firstSubcategory.thirdArticle}
                fourthArticle={firstSubcategory.fourthArticle}
                link={firstSubcategory.link}
                endpoint=""
            />}>
        </Route>
        <Route path={'/' + secondSubcategory.link.split('/')[2]} element={
            <Subcategory
                title={secondSubcategory.title}
                firstArticle={secondSubcategory.firstArticle}
                secondArticle={secondSubcategory.secondArticle}
                thirdArticle={secondSubcategory.thirdArticle}
                fourthArticle={secondSubcategory.fourthArticle}
                link={secondSubcategory.link}
                endpoint=""
            />}>
        </Route>
        <Route path={'/' + thirdSubcategory.link.split('/')[2]} element={
            <Subcategory
                title={thirdSubcategory.title}
                firstArticle={thirdSubcategory.firstArticle}
                secondArticle={thirdSubcategory.secondArticle}
                thirdArticle={thirdSubcategory.thirdArticle}
                fourthArticle={thirdSubcategory.fourthArticle}
                link={thirdSubcategory.link}
                endpoint=""
            />}>
        </Route>
    </Routes>
}