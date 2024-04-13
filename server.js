const express = require('express')
const {fetchData} = require('./timelimitedCache')
const app = express()


app.use(express.json())

const PORT = process.env.PORT || 8001;



app.get('/', async (req,res)=>{
    const data = await fetchData()
    res.send(data)
})





app.listen(PORT, ()=>{
    console.log(`Server runs on port: ${PORT}`);
})