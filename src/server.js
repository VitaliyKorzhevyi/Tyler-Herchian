const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('src'))


app.post('/', (req, res) =>{
    res.send()
})

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})
