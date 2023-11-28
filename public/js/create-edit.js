const calzado = document.getElementById('cat-calzado');
const indumentaria = document.getElementById('cat-indumentaria');
const nums = document.getElementById('numeros');
const letr = document.getElementById('letras');


calzado.addEventListener('click', function(){
    letr.style.display = 'none';
    nums.style.display = 'block';
    document.querySelectorAll('#letras input[type=checkbox]').forEach(function(checkElement) {
        checkElement.checked = false;
    });
});

indumentaria.addEventListener('click', function(){
    nums.style.display = 'none';
    letr.style.display = 'block';
    document.querySelectorAll('#numeros input[type=checkbox]').forEach(function(checkElement) {
        checkElement.checked = false;
    });
})
