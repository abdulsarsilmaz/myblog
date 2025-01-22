import React from 'react';
import { BiSolidLike } from "react-icons/bi"
import { BiSolidDislike } from "react-icons/bi";

const UpvotesSection =({articleName, upvotes, setArticleInfo,downvotes})=>{
   
    const upvoteArticle = async()=>{
         const result = await fetch(`/api/articles/${articleName}/upvotes`,{
            method: 'post',
         });
         const body = await result.json(); 
         setArticleInfo(body);
    };

    const downvoteArticle = async()=>{
        const result = await fetch(`/api/articles/${articleName}/downvotes`,{
           method: 'post',
        });
        const body = await result.json(); 
        setArticleInfo(body);
   };

    return(
        <div  className='d-flex align-items-center gap-3 '>
             <div><span className='text-danger fw-bolder'>Upvotes</span> & <span className='text-secondary fw-bolder'>Downvotes</span> this Article</div>
             <div className='d-flex gap-1'>
            <button className='btn btn-sm btn-outline-danger fw-bolder' onClick={()=>upvoteArticle()}><BiSolidLike/>{upvotes}</button>
            <button className='btn btn-sm btn-outline-secondary fw-bolder' onClick={()=>downvoteArticle()}><BiSolidDislike/>{downvotes}</button>
            </div>
        </div>
    );
};

export default UpvotesSection;