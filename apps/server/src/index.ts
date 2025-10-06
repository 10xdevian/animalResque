// todo to do
// 1. add zod
// 2. add hashed password
// 3. check the singup and singin route on postman

import prisma from "@workspace/db/client";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.post("api/v1/signup", async (req, res) => {
  const { email, name, username, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUser) {
    res.status(400).json({
      message: "user already exists Please Login ",
    });
    return;
  }

  await prisma.user.create({
    data: {
      email,
      name,
      username,
      password,
    },
  });

  res.status(200).json({
    message: "user signup Done",
  });
});

app.post("api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!existingUser) {
    res.status(400).json({
      message: "user Not Exists please Signup first",
    });
    return;
  }

  // check password

  if (existingUser.password !== password) {
    res.status(400).json({
      message: "password not correct",
    });
  }

  // generate token

  const token = jwt.sign(existingUser.id as unknown as string, "ilovekiyara");

  res.status(200).json({
    message: "user signin Done",
    token,
  });
});

// todo is to add middleware without login you cant post
app.post("api/v1/post", async (req, res) => {
  const { title, description, image, placeName, address, location } = req.body;

   const post = await prisma.post.create({
     data: {
       title,
       description,
       image,
       placeName,
       address,
      latitude :  location.langitude,
      logibtude : location.longitude,
      //@ts-ignore // fixed after addining middleware 
	    userId : req.user.id
     },
   });


res.status(200).json({
message :"Post is Created"
post
})

});

app.get("/", (req, res) => {
  res.send("Hello server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`);
});
