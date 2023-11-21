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
        console.log(data);
        setProduct(data.data[0]);//posicion 0 porque no hay otra posicion
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, []);

    return(
        <div>
            <p>{Product.Name}</p>
            <p>{Product.Care}</p>
            <p>{Product.Gender}</p>
            <p>{Product.Price}</p>
            <p>{Product.Size}</p>
            <p>{Product.Description}</p>
        </div>
    )
}