window.addEventListener('load', () => {
    let inputname = document.querySelector('#username');
    let inputPassword = document.querySelector('#userPassword');
    let inputEmail = document.querySelector('#userEmail');
    let errorInput = document.querySelector('#errorInput');
    let errorPassword = document.querySelector('#errorPassword');
    let buttonform = document.querySelector('.button-form');
    let regexp_password =   /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    
    inputname.addEventListener('input', () => {
        if (inputname.value === '') {
            inputname.classList.add('emptyInput');
        } else {
            inputname.classList.remove('emptyInput');
        }
    })

    buttonform.addEventListener('click', (e) => {
        if(inputname.value === '' || inputPassword.value === '' || inputEmail.value === ''){
            e.preventDefault();
            errorInput.style.display = 'block';
        } 
        if(!regexp_password.test(inputPassword.value)){
            e.preventDefault();
            errorPassword.textContent = 'La contraseña debe tener minimo 8 caracteres, al menos una letra mayúscula, una letra minúscula y un número.';
            errorPassword.style.display = 'block';
        }
    })
})