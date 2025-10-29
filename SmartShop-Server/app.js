const express = require('express');
const app = express()

app.use(express.json())
app.get('/', (req, res) => {
    res.send("Hellow")

})

app.post("/movies", (req,res)=> {
    console.log(req.body)

})

app.get('/movies/:genre', (req, res) => {
    const genre = req.params.genre
    res.send(`You selected ${genre}!`)
})


//start server
app.listen(8080, () => {
    console.log("Server is running");
})