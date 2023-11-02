window.addEventListener('DOMContentLoaded', function(){
    const inputEmail = document.querySelector('#userEmail');
    const inputPassword = document.querySelector('#userPassword');
    const submitSession = document.querySelector('#submitSession');
    const errorInputMessage = document.querySelector('#errorInput');
    const errorDatosMessage = document.querySelector('#errorDatos');

    function emptyInput() {
        if (inputEmail.value === '') {
            inputEmail.classList.add('emptyInput');
            errorInputMessage.style.display = 'block';
        } else {
            inputEmail.classList.remove('emptyInput');
            errorInputMessage.style.display = 'none';
        }

        if (inputPassword.value === '') {
            inputPassword.classList.add('emptyInput');
            errorInputMessage.style.display = 'block';
        } else {
            inputPassword.classList.remove('emptyInput');
            errorInputMessage.style.display = 'none'; 
        }
    }

    function validateEmail(email) {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailPattern.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6; 
    }

    inputEmail.addEventListener('input', function() {
        emptyInput();
        if (!validateEmail(inputEmail.value)) {
            inputEmail.classList.add('emptyInput');
            errorDatosMessage.textContent = 'Correo electrónico invalido';
            errorDatosMessage.style.display = 'block';
        } else {
            inputEmail.classList.remove('emptyInput');
            errorDatosMessage.style.display = 'none';
        }
    });

    inputPassword.addEventListener('input', function() {
        emptyInput();
        if (!validatePassword(inputPassword.value)) {
            inputPassword.classList.add('emptyInput');
            errorDatosMessage.textContent = 'Faltan caracteres en la contraseña';
            errorDatosMessage.style.display = 'block';
        } else {
            inputPassword.classList.remove('emptyInput');
            errorDatosMessage.style.display = 'none';
        }
    });

    submitSession.addEventListener('click', function(e) {
        if (inputEmail.value === '') {
            e.preventDefault();
            inputEmail.classList.add('emptyInput');
            errorInputMessage.style.display = 'block'; 
        }

        if (inputPassword.value === '') {
            e.preventDefault();
            inputPassword.classList.add('emptyInput');
            errorInputMessage.style.display = 'block'; 
        }

        if (!validatePassword(inputPassword.value)){
            e.preventDefault();
            inputPassword.classList.add('emptyInput');
            errorDatosMessage.textContent = 'Faltan caracteres en la contraseña';
        }
    });
});
