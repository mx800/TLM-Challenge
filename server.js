//Initialise Express
let express = require('express')
let app = express()
let bodyParser = require('body-parser')


//-------------------------------------
//Moteur de template
//-------------------------------------
app.set('view engine','ejs')


//-------------------------------------
//Middleware
//-------------------------------------
app.use('/asset', express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//----------------------------------
//Route
//----------------------------------
app.get('/', (request, response)=>{
    response.render('pages/home')
    // response.render('pages/home',{test:'Salut'})   Pour envoyer un paramètre
})
app.get('/jeux', (request, response)=>{
    response.render('pages/index')
})
app.get('/ninjify', (request, response)=>{
    response.render('pages/ninjify')
})
app.get('/*', (request, response)=>{
    response.redirect('/')
})

/*
app.post('/',(request,response)=>{
    if (request.body.message === undefined || request.body.message === ''){
        response.render('pages/index', {error: "Vous devez sélectionner un nom"})
    }
})
*/

//Définit le port de lecture
app.listen(8080)