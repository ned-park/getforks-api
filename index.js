
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import mainRoutes from "./routes/main.js"
import dashboardRoutes from "./routes/dashboard.js"
import userRoutes from "./routes/user.js"


// import session from "express-session"
// import MongoStore from "connect-mongo"

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

try {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
  })

  console.log(`MongoDB Connected: ${conn.connection.host}`)
} catch (err) {
  console.error(err)
  process.exit(1)
}


// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI
//     })
//   })
// )

app.use(bodyParser.json());

app.use('/', mainRoutes)
// app.use('/search', searchRoutes)
// app.use('/about', aboutRoutes)
// app.use('/comment', commentRoutes)
app.use('/users', userRoutes)
app.use('/:user', dashboardRoutes)


// app.listen(PORT, ()=>{
//   console.log(`Server is running on port: ${PORT}`)
// })