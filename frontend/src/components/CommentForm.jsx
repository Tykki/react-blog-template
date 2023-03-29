import {useState} from 'react'
import useUser from '../hooks/useUser'

const CommentForm = ({articleName, updateComments}) => {
    const [comment, setComment] = useState('')
    const {user} = useUser()
    const addComment = async () =>{
        const token = user && await user.getIdToken()
        const header = token ? {authtoken: token, 'content-type': 'application/json'} : {}
        await fetch(`/api/articles/${articleName}/comments`, {
            method: 'post',
            headers: header,
              body: JSON.stringify({
                text: comment
              }),
        }).then(res => res.json())
        .then(data => updateComments(data))
    }

    return (
        <div id="add-comment-form">
            <h3>Add A Comment</h3>
            {user && <p>You are posting as <b>{user.email}</b></p>}
            <br />
            <label htmlFor="comment">
                Comment: 
                <textarea type="text" name="comment" rows='4' cols='50' value={comment} onChange={e => setComment(e.target.value)}/>
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}
export default CommentForm