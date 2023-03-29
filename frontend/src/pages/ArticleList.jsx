import articles from "./article-content"
import List from '@/components/List'

const ArticleList = () => {
    return (
        <>
            <h1>Articles</h1>
            <List articles={articles}/>

        </>
    )
}

export default ArticleList