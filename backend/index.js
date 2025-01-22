const { MongoClient } = require('mongodb');
const bodyParser = require("body-parser");
const express = require("express")


const app = express();

app.use(bodyParser.json());

const withDB = async (operation, res) => {
  try {
    const client = await MongoClient.connect('mongodb+srv://pallavimishra102:4qQwfqBJwPD246hf@cluster0.aft45.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db('my-blog');
    await operation(db);
    client.close();
  }
  catch (error) {
    res.status(500).json({ message: 'Error: connecting to db', error });
  }
}

app.get('/api/articles/:name', async (req, res) => {
  withDB(async (db) => {

    const articleName = req.params.name;
    const articlesInfo = await db.collection('articles').findOne({ name: articleName });
    res.status(200).json(articlesInfo);
  }, res);
})


app.post('/api/articles/:name/upvotes', async (req, res) => {
  withDB(async (db) => {
    try {
      const name = req.params.name;
      const article = await db.collection('articles').findOne({ name: name });

      if (!article) {
        const articleInfo = {
          name: name,
          upvotes: 1,
          downvotes:0,
          comments: []
        };
        await db.collection('articles').insertOne(articleInfo);
        return res.status(200).json(articleInfo);
      } else {
        await db.collection('articles').updateOne(
          { name: name },
          { '$set': { upvotes: article.upvotes + 1 } }
        );

        const updatedArticleInfo = await db.collection('articles').findOne({ name: name });
        return res.status(200).json(updatedArticleInfo);
      }

    } catch (err) {
      res.status(400).json({ message: 'An error occurred', err });
    }
  }, res);
});

app.post('/api/articles/:name/downvotes', async (req, res) => {
  withDB(async (db) => {
    try {
      const name = req.params.name;
      const article = await db.collection('articles').findOne({ name: name });

      if (!article) {
        const articleInfo = {
          name: name,
          upvotes: 0,
          downvotes:1,
          comments: []
        };
        await db.collection('articles').insertOne(articleInfo);
        return res.status(200).json(articleInfo);
      } else {
        await db.collection('articles').updateOne(
          { name: name },
          { '$set': { downvotes: article.downvotes + 1 } }
        );

        const updatedArticleInfo = await db.collection('articles').findOne({ name: name });
        return res.status(200).json(updatedArticleInfo);
      }

    } catch (err) {
      res.status(400).json({ message: 'An error occurred', err });
    }
  }, res);
});


app.post('/api/articles/:name/add-comment', async (req, res) => {
  try {
    await withDB(async (db) => {
      const articleName = req.params.name;
      const { username, text } = req.body;

      const articlesInfo = await db.collection('articles').findOne({ name: articleName });

      if (!articlesInfo) {
        const newArticle = {
          name: articleName,
          upvotes: 0,
          downvotes:0,
          comments: [{ username, text }]
        };
        await db.collection('articles').insertOne(newArticle);
        return res.status(200).json(newArticle);
      }

      else {
        await db.collection('articles').updateOne(
          { name: articleName },
          {
            '$set': {
              comments: articlesInfo.comments.concat({ username, text })
            }
          }
        );

        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
        return res.status(200).json(updatedArticleInfo);
      }
    }, res);
  } catch (error) {
    res.status(400).json({ message: 'can not connected', error });
  }
});

app.delete('/api/articles/:name/:key/delete', async (req, res) => {
  try {
    const { name, key } = req.params;
    const value = parseInt(key, 10);  
    await withDB(async (db) => {
      //for delete a document from collection
      //await db.collection('articles).deleteOne({name:name})

      const articleInfo = await db.collection('articles').findOne({ name: name });
      const updatedComments = articleInfo.comments.filter((comment, index) => index !== value);
      await db.collection('articles').updateOne({ name: name },
        { 
          '$set': { 
            comments: updatedComments }
           }
      );
      
      const updatedArticleInfo = await db.collection('articles').findOne({ name: name });
      // if(  updatedArticleInfo.comments.length===0 && updatedArticleInfo.upvotes===0 && updatedArticleInfo.downvotes===0 ){
      //    await db.collection('articles').deleteOne({name:name})
      

      //    return res.status(200).json(newArticle);
      // }
      // else{
      //   return res.status(200).json(updatedArticleInfo);
      // }
      return res.status(200).json(updatedArticleInfo);
    }, res);
    
  } catch (error) {
    res.status(400).json({ message: 'An error occurred', error });
  }
});





app.listen(8000, () => console.log("I am Listening to the port 8000"))
