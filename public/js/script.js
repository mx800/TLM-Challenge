
//Menu développant
$('#gender-select').dropdown();

//Pour permettre de vider le combo
$('.vider').on('click', function() {
    $('#gender-select').dropdown('restore defaults');

});

/*
//Pour passer a la page ninjify
$('.continuer').on('click', function() {
    location.href = "/ninjify"
});
*/

$('.item').on('click',function(){
    path = window.location.pathname;
})




