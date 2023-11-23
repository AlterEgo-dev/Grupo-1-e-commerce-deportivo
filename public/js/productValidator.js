window.addEventListener("load", function(){
    let formulario = document.querySelector("form.formulario");
    let campoNombre = document.querySelector("input#campo-nombre");
    let campoPrecio = document.querySelector("input#campo-precio");
    let campoImg = document.querySelector("input#campo-img");
    let campoImg2 = document.querySelector("input#campo-img2");
    let campoDescripcion = document.querySelector("textarea#descripcion");
    let campoCuidados = document.querySelector("textarea#cuidados");
    let ulErrores = document.querySelector("div.errores-product ul");
    
   
   
    formulario.addEventListener("submit", function(e){
        
        ulErrores.innerHTML = "";

        let errores = [];

        // Campo Nombre
        if(campoNombre.value == ""){
            errores.push("El campo de nombre esta vacio");
        } else if (campoNombre.value.length < 5){
            errores.push("El campo de nombre debe tener al menos 5 caracteres");
        }

        // Campo Imagen

        const archivosValidos = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

        if (!campoImg || campoImg.files.length === 0) {
            errores.push("Debes subir imagen principal");
        } else {
            let file = campoImg.files[0];

            // Verificar si 'file' está definido antes de acceder a 'type'
            if (file && !archivosValidos.includes(file.type)) {
                errores.push("Formato de imagen principal no válido. Se permiten solo JPEG, JPG, PNG, y GIF");
            }
        }

        if (!campoImg2|| campoImg2.files.length === 0) {
            errores.push("Debes subir almenos una imagen de detalle");
        } else {
            let file = campoImg2.files[0];

            // Verificar si 'file' está definido antes de acceder a 'type'
            if (file && !archivosValidos.includes(file.type)) {
                errores.push("Formato de imagen de detalle no válido. Se permiten solo JPEG, JPG, PNG, y GIF");
            }
        }

        // Campo Precio
        if(campoPrecio.value == ""){
            errores.push("El campo de precio esta vacío");
        }
        
        // Campo Descripcion
        if(campoDescripcion.value == ""){
            errores.push("La descripcion esta vacía");
        } else if (campoDescripcion.value.length < 20){
            errores.push("La descripcion debe tener al menos 20 caracteres");
        }


        // Campo Cuidados 
        if(campoCuidados.value == ""){
            errores.push("El campo de cuidados esta vacío");
        } else if (campoCuidados.value.length < 20){
            errores.push("El campo de cuidados debe tener al menos 20 caracteres");
        }

        // Errores
        if (errores.length > 0){
            e.preventDefault();

            for (let i = 0; i < errores.length; i++){

                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
            }

        }

    })
})