const express = require ('express');

const bodyParser = require ('body-parser');

const app =express();

const ports =  process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Acces-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.listen(ports, ()=>console.log(`Escuchando el puerto ${ports}`))