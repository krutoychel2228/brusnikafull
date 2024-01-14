import { useEffect, useState } from "react"
import ArticleType from "../pages/Article"
import NavigationCard from "./NavigationCard"
import { InfoSubcategory } from "./types"

type ArticleType = {
    name: string
    content: string
    id: number
}

export function Subcategory({ title }: InfoSubcategory) {
    const [articles, setArticles] = useState<ArticleType[]>([])

    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_API}documents`, {
            method: "GET"
        })
        const json = await response.json()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setArticles(json.documents.filter((e: any) => e.articles.length >= 1).map((e: any) => {
            return {
                name: e.name,
                content: e.articles[0].content,
                id: e.id
            }
        }))
    }

    useEffect(() => { fetchData() }, [])


    return <>
        <p className='ml-[250px] font-inter font-medium text-3xl mt-20'>{title}</p>
        <section className='grid grid-cols-3 gap-4 ml-[250px] mt-12 w-[1270px]'>
            {articles.map((article, index) => <NavigationCard key={index} header={article.name} firstLine="" secondLine="" thirdLine="" to={`/articles?id=${article.id}`} />)}
            <NavigationCard header={"Новая статья..."} firstLine={''} secondLine={''} thirdLine={''} to={'/writearticle'} add />
        </section>
    </>
}