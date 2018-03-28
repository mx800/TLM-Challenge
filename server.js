//Initialise Express
let express = require('express')
let app = require('express')()

//Définit le style de template
app.set('view engine','ejs')

app.use('/asset', express.static('public'))

app.get('/', (request, response)=>{
    response.render('pages/home',{test:'Salut'})
    // response.render('pages/home',{test:'Salut'})   Pour envoyer un paramètre
})
app.get('/test', (request, response)=>{
    response.render('pages/index')

})

//Définit le port de lecture
app.listen(8080)