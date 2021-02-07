const express = require('express') //importar express
const app = express();  //objeto tipo express

app.use(express.json()) //es un midelware (petición-respuesta)

app.get("/", (req, res, next) => {
    res.json("Hello world");
});

app.listen(5000, ()=> {
    console.log("Listening on htpp://localhost:5000/");
}); 
