document.addEventListener("DOMContentLoaded", function() {
    const selectCantidad = document.getElementById("cantidad"); // traemos el select/option
    const subtotal = document.getElementById("subtotal");
    const resultPrice = parseFloat(document.querySelector("#subtotal").textContent); // parseamos como numero al subtotal
  
    selectCantidad.addEventListener("change", function() { // que escuche un cambio
      const cantidad = parseInt(selectCantidad.value, 10); // parseamos
      subtotal.textContent = resultPrice * cantidad;
    });
  });
  