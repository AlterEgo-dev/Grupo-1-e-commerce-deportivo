import React, { useEffect, useState } from "react";

export function ListProduct(){
    const [prods, setProds] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((data) => {
        setProds(data.productsArr);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, []);

    return(
      <div className="content-list">
            <h1>Lista de Productos</h1>
          <div className="listP">
            {prods.map((products)=> {
              return(
                <div className="listProduct">
                  <div>
                    <img src={`http://localhost:8000/${products.Image1}`} alt={products.name} height="350px"/>
                  </div>
                    <ul>
                      <li>{products.name}</li>
                    </ul>
                </div>
              )
              })}
          </div>
      </div>
    )
}