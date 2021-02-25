import express from "express"
const app = express()

app.use(express.static('public'));

app.use((req,res)=>{
    res.status(404).json({message:"404 Not found"})
})

app.listen(8080, ()=>{
    console.log("server started! listening on port 8080")
})