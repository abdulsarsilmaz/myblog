import React from "react";
import { Link } from "react-router-dom";

const ArticleList=({articles})=>(
    <>
    <br/>
    {
    articles.map((article,key)=>(
        
        <div className="text-decoration-none " key = {key} >
          
            <Link to={`/article/${article.name}`}><h2> {article.title}</h2></Link>
            <p>{article.content[0].substring(0,150)}.....</p>
        
        </div >
    ))
}
</>
);

export default ArticleList;
