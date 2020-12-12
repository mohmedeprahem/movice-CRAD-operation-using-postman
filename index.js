const express = new require('express');
const app =  express();
const ganre = new require('./router/ganre')
const home = new require('./router/home')
const Joi = require('joi');

app.use('/api/ganre', ganre);
app.use('/', home);
app.use(express.json())


app.listen(3000 , () => console.log('the port 3000 is connecting..........'));