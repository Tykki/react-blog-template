import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import articles from './article-content'
import CommentForm from '../components/CommentForm'
import CommentsList from '../components/CommentsList'
import Err404 from './Err404'
import useUser from '../hooks/useUser'

const Article = () => {
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: [], canUpvote: false})
    const {canUpvote} = articleInfo
    const {id} = useParams()
    const {user, isLoading} = useUser()

    useEffect(()=>{
        const loadInfo = async () => {
            const token = user && await user.getIdToken()
            const header = token ? {authtoken: token} : {}
            await fetch(`/api/articles/${id}`, {
                headers: header,
            }).then(res => res.json())
            .then(data => setArticleInfo(data))
            
        }
        !isLoading ? loadInfo() : false
    }, [isLoading, user])

    const article = articles.find(article => article.name === id)
    
    const upVote = async () => {
        const token = user && await user.getIdToken()
        const header = token ? {authtoken: token} : {}
        await fetch(`/api/articles/${id}/upvote`, {
            method: 'PUT',
            headers: header,
        }).then(res => res.json()).then(data => setArticleInfo(data))
    }
    if (!article) {
        return <Err404 />
    } 
    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
            {user
                ? <button onClick={upVote}> {canUpvote ? 'Upvote' : 'Already Upvoted'}</button>
                : <button>Log in to upvote</button>
            }
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((paragraph, i) => 
                <p key={i}>{paragraph}</p>
            )}
            {user
                ? <CommentForm articleName={id} updateComments={data => setArticleInfo(data)} />
                : <button>Log in to add comments</button>
            }
            <CommentsList comments={articleInfo.comments}/>
        </>
    )
}

export default Article