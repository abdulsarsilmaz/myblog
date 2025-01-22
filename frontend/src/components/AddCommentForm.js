import React, { useState } from "react";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');
    const addComment = async () => {
        if(!username) {
            alert("PLEASE FILL YOUR NAME !!")
            return;
        }
        if(!commentText)
            { 
                alert("PLEASE WRITE A COMMENT !!")
                return;}

        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: 'post',
            body: JSON.stringify({ username, text: commentText }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await result.json();
        setArticleInfo(body);
        setUsername('');
        setCommentText('');
    }
    
    
    return (
        <div id="add-comment-form">
            <h3 className="text-secondary fw-bolder">Add a Comment</h3>
            <table>
                <tr>
                    <td>
                        <label className="form-label"> Name :</label>
                    </td>
                    <td><input  type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                    </td>
                </tr>
                <tr >
                    <td>
                        <label className="form-label ">Comment:</label>
                    </td>
                    <td>
                        <textarea  rows="2" cols="30" value={commentText} onChange={(event) => setCommentText(event.target.value)}></textarea>
                    </td>
                </tr>
            </table>
            <button className="btn btn-secondary mt-2" onClick={() => addComment()}>Add Comment</button>
        </div>
    );
}

export default AddCommentForm;