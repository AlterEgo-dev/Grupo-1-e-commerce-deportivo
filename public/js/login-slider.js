/* FUNCION SLIDER DEL LOGIN, NO TOCAR!! */

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const registerBtn = document.getElementById("register-btn");
    const loginBtn = document.getElementById("login-btn");

        function showLoginForm() {
                loginForm.style.display = "block";
                registerForm.style.display = "none";
              }
        
                 function showRegisterForm() {
                  loginForm.style.display = "none";
                  registerForm.style.display = "block";
                }
                 showLoginForm();
        
        registerBtn.addEventListener("click", showRegisterForm);
        loginBtn.addEventListener("click", showLoginForm);
    });

    /* BOTONES */

    document.addEventListener("DOMContentLoaded", function () {
        const loginBtn = document.getElementById("login-btn");
  
        function setFocusOnLoginBtn() {
          loginBtn.focus();
        }

        setFocusOnLoginBtn();
  
        const loginForm = document.getElementById("login-form");
        const registerForm = document.getElementById("register-form");

        /* CAMBIO DE VISTA 1 */
  
        function showLoginForm() {
          loginBtn.classList.add("active-btn"); 
          loginForm.style.display = "block";
          registerForm.style.display = "none";
        }

        /* CAMBIO DE VISTA 2 */

        function showRegisterForm() {
          loginBtn.classList.remove("active-btn"); 
          registerBtn.classList.add("active-btn");
          loginForm.style.display = "none";
          registerForm.style.display = "block";
        }
  
        loginBtn.addEventListener("click", showLoginForm);
        document.getElementById("register-btn").addEventListener("click", showRegisterForm);
      });

/* ----------------------------------------------- */
