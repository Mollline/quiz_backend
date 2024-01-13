const factRouter = require('./router/factRouter')
const userrouter = require('./router/userRoutes')
const express = require('express')
const connect = require('./database/db')
const cors =require('cors')


const app = express();
const port = 8080

app.use(express.json())
app.use(cors());


app.use(userrouter);
app.use(factRouter);

connect()

app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})
