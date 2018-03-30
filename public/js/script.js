
//Menu développant
$('#gender-select').dropdown();

//Pour permettre de vider le combo
$('.vider').on('click', function() {
    $('#gender-select').dropdown('restore defaults');

});


//Pour passer a la page ninjify avec paramètre
$('.continuer').on('click', function() {
    let data=($('#gender-select').dropdown('get value'));
    let param='';
    for(let i=0; i< data.length-1;i++){
        param += data[i]+',';
    }
    location.href = `/ninjify?x=${param}`;
});

/*
$('.item').on('click',function(){
    path = window.location.pathname;
})
*/



