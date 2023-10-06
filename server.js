const express = require('express');
const app = express();

const port = 8081;

app.use(express.static(__dirname + '/public'));


console.log(__dirname + '/public/template')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/template/index.html')
})

app.get('/carte', (req, res) => {

    res.sendFile(__dirname + '/public/template/carte.html');
});

app.get('/rap-fr', (req, res) => {

    res.sendFile(__dirname + '/public/template/rap-fr.html');
});

app.get('/rap-us', (req, res) => {

    res.sendFile(__dirname + '/public/template/rap-us.html');
});

app.get('/electro', (req, res) => {

    res.sendFile(__dirname + '/public/template/electro.html');
});

app.get('/drill', (req, res) => {

    res.sendFile(__dirname + '/public/template/drill.html');
});

app.get('/rock', (req, res) => {

    res.sendFile(__dirname + '/public/template/rock.html');
});

app.get('/douceur', (req, res) => {

    res.sendFile(__dirname + '/public/template/douceur.html');
});

app.get('/pop', (req, res) => {

    res.sendFile(__dirname + '/public/template/pop.html');
});

app.get('/credits', (req, res) => {

    res.sendFile(__dirname + '/public/template/credits.html');
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
