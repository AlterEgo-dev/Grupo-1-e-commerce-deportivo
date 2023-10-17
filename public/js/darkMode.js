document.addEventListener('DOMContentLoaded', function () {
    const miBoton = document.getElementById('input');
    const miFooter = document.querySelector('footer');
    const miNavbar = document.querySelector('header');
    const miBody = document.querySelector('body');
    const ofertasHeader = document.querySelector('p.desc-ofertas-header');
    const titulosPrincipales = document.querySelectorAll('h3, div.check-info, div.delete-info');
    const titulosInteres = document.querySelectorAll('div.title-interes, div.text-interes, div.price-category')
    const categNav = document.querySelectorAll('a.categ-nav')
    const interesInfo = document.querySelectorAll('p.interes-info-1, p.interes-info-2')
    const formEdit = document.querySelectorAll('label.form-radio, label.label-form, div.form-check')
    
    let estiloOscuro = false;

    miBoton.addEventListener('click', function () {
        if (miNavbar && miFooter && miBody) {
            if (estiloOscuro) {
                miNavbar.style.backgroundColor = '';
                miFooter.style.backgroundColor = '';
                miBody.style.backgroundColor = '';
                miBody.style.color = '';
                ofertasHeader.style.color = '';
                for(let i = 0 ; i < titulosPrincipales.length; i++){
                    titulosPrincipales[i].style.color = '';
                }
                for(let i = 0 ; i < titulosInteres.length; i++){
                    titulosInteres[i].style.color = '';
                }
                for(let i = 0 ; i < categNav.length; i++){
                    categNav[i].style.color = '';
                }
                for(let i = 0 ; i < interesInfo.length; i++){
                    interesInfo[i].style.color = '';
                }
                for(let i = 0 ; i < formEdit.length; i++){
                    formEdit[i].style.color = '';
                }
                
            } else {
                miNavbar.style.backgroundColor = '#171717';
                miFooter.style.backgroundColor = '#171717';
                miBody.style.backgroundColor = '#171717';
                miBody.style.color = 'white';
                ofertasHeader.style.color = 'black';
                for(let i = 0 ; i < titulosPrincipales.length; i++){
                    titulosPrincipales[i].style.color = 'white';
                }
                for(let i = 0 ; i < titulosInteres.length; i++){
                    titulosInteres[i].style.color = 'black';
                }
                for(let i = 0 ; i < categNav.length; i++){
                    categNav[i].style.color = 'white';
                }
                for(let i = 0 ; i < interesInfo.length; i++){
                    interesInfo[i].style.color = 'white';
                }
                for(let i = 0 ; i < formEdit.length; i++){
                    formEdit[i].style.color = 'black';
                }
            }
            estiloOscuro = !estiloOscuro;
        }
    });
});

