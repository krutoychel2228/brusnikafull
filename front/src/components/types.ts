export type Article = {
    title: string
    link: string
}

export type InfoSubcategory = {
    title: string
    link: string
    endpoint: string
    firstArticle: Article
    secondArticle: Article
    thirdArticle: Article
    fourthArticle: Article

}

export type InfoCategoryProps = {
    title: string
    link: string
    firstSubcategory: InfoSubcategory
    secondSubcategory: InfoSubcategory
    thirdSubcategory: InfoSubcategory
}