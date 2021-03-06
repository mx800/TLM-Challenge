//Initialise Express
const express = require('express')
const router = express.Router();
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const async = require('async');


//-------------------------------------
//Connection BD
//-------------------------------------
mongoose.connect("mongodb://localhost:27017/buzzwords");
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
console.log("Connected to database");


    //Crée le shéma
    let buzzwordSchema = mongoose.Schema({
        buzzword: String,
        name: String
    });

    //Crée model that uses shema
    let BuzzwordGroup = mongoose.model('BuzzwordGroup',buzzwordSchema)


/*
//Permet d'ajouter du data
let buzzword = new BuzzwordGroup({
    buzzword: "Jade",
    name: "Feux"
});
buzzword.save(function(err,models){
    if(err) return console.error(err);
    console.log("Buzzword Save");
});
*/



//-------------------------------------
//Moteur de template
//-------------------------------------
app.set('view engine','ejs')


//-------------------------------------
//Middleware
//-------------------------------------
app.use('/asset', express.static('public'))
//app.use(bodyParser.urlencoded({extended:false}))
//app.use(bodyParser.json())


//----------------------------------
//Route
//----------------------------------
app.get('/', (request, response)=>{
    response.render('pages/home')
})

app.get('/jeux', (request, response)=>{
    //Récupère le data
    BuzzwordGroup.find({},function(err,buzzwordGroups){
        if(err){
            console.log(err)
        }
        response.render('pages/index',{buzzwordGroups: buzzwordGroups})
    });
})

app.get('/ninjify/', (request, response)=>{
   let param = request.query.x.split(',');
   let buzzwordCollection=[];
   let calls =[];

       for(let i=0;i<param.length-1;i++) {
            calls.push(function (callback) {
                BuzzwordGroup.find({buzzword: param[i]}, (err, name) => {
                    if (err) {
                        console.log(err)
                    }
                    callback(null, name)
                })
            })
        }
        //Fonction asynchrone du Foreach
        async.parallel(calls, function(err,result){
            if (err) {
                console.log(err)
            }
            console.log(result)
            response.render('pages/ninjify',{buzzwords: result})
        })
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

/*
router.route('/jeux')
.get(function(req,res){
    BuzzwordGroup.find({},function(err,buzzwordGroups) {
        if (err) {
            res.send({error: err});
        }
        res.json(buzzwordGroups)
    })
});
*/



//Définit le port de lecture
app.listen(8080)