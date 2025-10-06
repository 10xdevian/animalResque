console.log("server is running hello!!")

import express from "express";
import cors from "cors";


const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors())

app.post("api/v1/signup", (req, res)=> {

const {email, name , username , image , password }= req.body;



const post = await db.user.create({
data :{
email,
name ,
username ,
password,
image,
}

})

res.status(200).json({
message :"user signup Done"
})

}
)


app.post("api/v1/signin", (req, res)=> {

const { username ,  password }= req.body;



const  existingUser  = await db.user.find({

where :{
username
}
})

if(!existingUser){
res.status(400).json({

message:"user Not Exists please Signup first"

})
}

// check password 

if(existingUser.password !== password ){
res.status(400).json({

message:"password not correct"

})
} 

// generate token 

const token = jwt.sign()
res.status(200).json({
message :"user signup Done"
})

}
)







app.post("api/v1/post", (req, res)=> {

const {title , description , image ,placeName , address, location }= req.body;

const post = await db.post.create({
data :{

title ,
description ,
image, 
placeName ,
address, 
location,
}

})


}
)


app.get("/", (req, res)=> {
res.send("Hello server")
}
)



app.listen(PORT, ()=> {
console.log(`Server is running on port : http://localhost:${PORT}`)
});

