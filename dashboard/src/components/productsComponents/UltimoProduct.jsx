import React, { useEffect, useState } from "react";

export function UltimoProduct(){
    const [Product, setProduct] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8000/api/products/last", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((data) => {
        setProduct(data.data[0]);//posicion 0 porque no hay otra posicion
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, []);

  return(
  <div className="lastP">
    <h1>Ultimo Producto</h1>
    <div className="lastProduct">
      <div >
        <img src={`http://localhost:8000/${Product.Image1}`} alt={Product.Name} height="350px" width="350px"/>
      </div>
      <div className="infoProducts">
          <ul>
            <li><p>Nombre</p>{Product.Name}</li>
            <li><p>Cuidados</p>{Product.Care}</li>
            <li><p>Genero</p>{Product.Gender}</li>
            <li><p>Precio</p> ${Product.Price}</li>
            <li><p>Talles</p>{Product.Size} </li>
            {/* <li>Descripcion: {Product.Description} </li> */}
          </ul>
      </div>
    </div>
    <div className="descrip">
        <p className="title-desc">Descripcion</p>
        <p>{Product.Description}</p>
    </div>
  </div>
    )
}