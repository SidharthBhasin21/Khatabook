const express= require('express');
const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))

console.log();


app.get('/', (req, res) => {
    fs.readdir(`./hisaab`,'utf-8',(err,files) => {
        err ? res.status(500).send('error') : res.render('index',{files})
    })
})
app.get('/create', (req, res) => {
        res.render('create')
})
app.get('/edit/:file', (req, res) => {
    fs.readFile(`./hisaab/${req.params.file}`,'utf-8',(err,data) => {
        err ? res.status(500).send(err) : 
        res.render('edit',{data, filename: req.params.file})
    })
})
app.get('/hisaab/:file', (req, res) => {
    fs.readFile(`./hisaab/${req.params.file}`,'utf-8',(err,data) => {
        err ? res.send(err) : res.render('hisaab',{data, filename: req.params.file})
    })
})
app.get('/delete/:file', (req, res) => {
    fs.unlink(`./hisaab/${req.params.file}`,(err) => {
        err ? res.send(err) :
        res.redirect('/')
    })
})

app.post('/createhisaab', (req, res) => {
    fs.writeFile(`./hisaab/${dayjs().format('DD-MM-YYYY')}.txt`, req.body.content, (err) => {
        err ? res.status(500).send(err) : res.redirect('/')
    })
})
app.post('/update/:filename', (req, res) => {
    fs.writeFile(`./hisaab/${req.params.filename}`, req.body.content, (err) => {
        err ? res.status(500).send(err) : res.redirect('/')
    })
})


app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})