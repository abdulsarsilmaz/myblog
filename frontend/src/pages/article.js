import React from "react";
import { Link } from "react-router-dom";
import articles from "./article-content";

const Article=()=>(
    <>
    {
    articles.map((article,key)=>(
        
        <div  key={key}>
          
            <Link  to={`/article/${article.name}`}><h2> {article.name}</h2></Link>
            <p>{article.content[0].substring(0,150)}</p>
        
        </div>
    ))
}
</>
);

export default Article;
