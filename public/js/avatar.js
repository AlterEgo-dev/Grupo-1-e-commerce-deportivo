const inputImagen = document.getElementById('subir-perfil');
const fotoPerfil = document.querySelector('.foto-perfil');
const textoMostrado = document.querySelector('.texto-mostrado')


inputImagen.addEventListener('change', function() {

    const miImagen = inputImagen.files[0];

    if (miImagen) {
        const imagenUrl = URL.createObjectURL(miImagen);
        fotoPerfil.style.backgroundImage = `url('${imagenUrl}')`;
        textoMostrado.style.display = 'flex';
    } else {
        fotoPerfil.style.backgroundImage = 'none';
    }
});
