
const express=require ('express');
const dotenv=require('dotenv').config()
const baglan=require('./config/db')
const colors=require('colors');
const cors = require('cors')

const PORT=process.env.PORT;

const app=express();

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/notlar',require('./routes/notRoute'))
app.use('/api/kullanicilar',require('./routes/kullaniciRoute'))

baglan()

app.listen(PORT,()=>console.log(`Server ${PORT} üzerinden yayında`.magenta))