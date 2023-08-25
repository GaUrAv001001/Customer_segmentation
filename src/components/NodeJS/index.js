const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demoA');
    console.log('db connected');
}

const userSchema = new mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    
    // { 
    //     type: String,
    //     required: true,
    //     match: /.+\@.+\..+/,
    //     unique: true,
    //   },
    password : String,
  });

const UserA = mongoose.model('UserA', userSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.post('/demoA', async (req,res)=>{

    let user = new UserA();
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.email = req.body.email;
    user.password = req.body.password;
    const doc = await user.save();

    console.log(doc);
    res.json(doc);
})


// server.get('/demoA', async (req, res)=>{
//     const docs = await UserA.find({});
//     express.response.json(docs)
// })

server.listen(8080,()=>{
    console.log("Server started")
})






