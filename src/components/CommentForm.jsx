import {useState} from 'react'

const CommentForm = ({articleName, updateComments}) => {
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const addComment = async () =>{
        // const commentToAdd = {
        //     postedBy: name,
        //     text: comment
        //   }
        await fetch(`http://localhost:8000/api/articles/${articleName}/comments`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                postedBy: name,
                text: comment
              }),
        }).then(res => res.json())
        .then(data => updateComments(data))
    }

    return (
        <div id="add-comment-form">
            <h3></h3>
            <label htmlFor="">
                Name: 
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <label htmlFor="">
                Comment: 
                <textarea type="text" rows='4' cols='50' value={comment} onChange={e => setComment(e.target.value)}/>
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}
export default CommentForm