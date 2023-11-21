import React, { useEffect, useState } from "react";

export function TotalProducts(){
    const [prodCant, setProductCant] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((data) => {
        setProductCant(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, []);

    return (
        <div>
            <p>{prodCant.count}</p>
        </div>
    )
    
}