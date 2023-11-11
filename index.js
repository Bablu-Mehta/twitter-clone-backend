const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



//DB Driver starts here--------------------------------------------------------
const uri = "mongodb+srv://twitter_admin:4TVzrsssrIBu4hv3@cluster0.f0dqmzq.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const postCollection = client.db('database').collection('posts'); //this is post collection
    const userCollection = client.db('database').collection('users'); //this is user collection

    //get
    app.get('/post', async(req, res)=>{
      const post = await postCollection.find().toArray();
      res.send(post);
    });

    //post
    app.post('/post', async(req, res)=>{
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    });
  } 
  catch(error){
    console.log(error);
  }
  // finally {
  //   console.log("connecting to db")
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  //   console.log("Work is done")
  // }
}
run().catch(console.dir);


//DB Driver starts here-------------------------------------------------------------------


app.get('/', (req, res) => {
  res.send('Hello World ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})