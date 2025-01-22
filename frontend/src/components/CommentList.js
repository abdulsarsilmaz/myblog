import React from "react";
import { MdDeleteForever } from "react-icons/md";

const CommentList = ({ comments,articleName,setArticleInfo }) => {

  const handleDeltee =async (key)=>{
    console.log(key)
    const data  =  await fetch(`/api/articles/${articleName}/${key}/delete`,{
      method:'delete'
    });
    const body = await data.json();
    setArticleInfo(body)
  }
  return (
    <>
    <div className="card p-2 bg-warning-subtle">
      <h4 className="fw-semibold">Comments:</h4>
      {
      comments.map((comment,key) => (
        <div className="bg-white rounded d-flex align-items-center justify-content-between p-3 m-1 border " key={key}>
          <div>
          <h6 className="">{comment.username.toUpperCase()}</h6>
          <p className="text-muted">{comment.text}</p>
          </div>
          <div onClick={()=>handleDeltee(key)} ><MdDeleteForever className="text-danger" size={25}/></div>
        </div>
      ))
      }
      </div>
    </>
  );
};

export default CommentList;
