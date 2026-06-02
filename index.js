const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Configuração Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Para conseguir ler os dados que vêm do formulário 
app.use(express.urlencoded({ extended: true }));

// "Banco de dados" de mentirinha para os vídeos
var listaVideos = [
    {
        titulo: "Meu primeiro video",
        nomeCriador: "lala",
        descricao: "Um video legal",
        visualizacoes: 10,
        curtidas: 5,
        hashtag: "dev",
        urlVideo: "http://video.com",
        urlThumbnail: "https://picsum.photos/200"
    }
];

// --- EXERCÍCIOS DE ROTAS ---

// Questão 1 e 12
app.get('/', function(req, res) {
    res.render('home');
});

// Questão 2
app.get('/sobre', function(req, res) {
    res.send('Esta aplicação foi feita para aprender Express!');
});

// Questão 3
app.get('/contato', function(req, res) {
    var dadosContato = {
        email: "contato@email.com",
        telefone: "(81) 99999-9999"
    };
    res.json(dadosContato);
});

// Questão 4
app.get('/erro', function(req, res) {
    res.status(404).send('Página não encontrada');
});

// Questão 5
app.get('/inicio', function(req, res) {
    res.redirect('/');
});

// --- EXERCÍCIOS DE PARÂMETROS ---

// Questão 6
app.get('/usuarios/:id', function(req, res) {
    var id = req.params.id;
    res.send('Usuário ' + id);
});

// Questão 7
app.get('/produtos/:nome', function(req, res) {
    var nome = req.params.nome;
    res.send('Produto: ' + nome);
});

// Questão 8
app.get('/filmes/:id/:nome', function(req, res) {
    var id = req.params.id;
    var nome = req.params.nome;
    res.send('ID do filme: ' + id + ' | Nome do filme: ' + nome);
});

// --- EXERCÍCIOS DE QUERY STRING ---

// Questão 9
app.get('/buscar', function(req, res) {
    var nomeBusca = req.query.nome;
    res.send('Buscando por: ' + nomeBusca);
});

// Questão 10
app.get('/produtos', function(req, res) {
    var cat = req.query.categoria;
    var pag = req.query.pagina;
    res.send('Categoria: ' + cat + ' | Página: ' + pag);
});

// Questão 11
app.get('/usuarios-filtro', function(req, res) {
    var idade = req.query.idade;
    res.send('Filtrando usuários com idade ' + idade);
});

// --- EXERCÍCIOS DE HANDLEBARS ---

// Questão 13 e 15
app.get('/perfil', function(req, res) {
    var usuario = {
        nome: "Carlos Silva",
        idade: 20,
        vip: true,
        bloqueado: false
    };
    res.render('perfil', usuario);
});

// Questão 14 e 16
app.get('/filmes-lista', function(req, res) {
    var filmes = [
        { nome: "Vingadores", ano: 2012 },
        { nome: "Batman", ano: 2022 },
        { nome: "Spider-man", ano: 2021 }
    ];
    res.render('filmes', { lista: filmes });
});

// --- TIKTOK CLONE (Questão 17) ---

// Página que mostra os vídeos
app.get('/videos', function(req, res) {
    res.render('videos', { videos: listaVideos });
});

// Página do formulário
app.get('/videos/cadastrar', function(req, res) {
    res.render('cadastrar');
});

// Rota que recebe os dados do formulário e salva
app.post('/videos', function(req, res) {
    var novo = {
        titulo: req.body.titulo,
        nomeCriador: req.body.nomeCriador,
        descricao: req.body.descricao,
        visualizacoes: req.body.visualizacoes,
        curtidas: req.body.curtidas,
        hashtag: req.body.hashtag,
        urlVideo: req.body.urlVideo,
        urlThumbnail: req.body.urlThumbnail
    };
    
    listaVideos.push(novo);
    res.redirect('/videos');
});

app.listen(3000, function() {
    console.log('Servidor funcionando na porta 3000');
});
