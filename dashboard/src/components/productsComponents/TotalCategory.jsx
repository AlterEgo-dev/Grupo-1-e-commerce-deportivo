import React, { useEffect, useState } from "react";

export function TotalCategory(){
    const [category, setCategory] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((data) => {
        setCategory(data.countByCategory);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, []);

    return (
        <div className="content-cards">
          <div className="notification">
            <div className="notiglow"></div>
            <div className="notiborderglow"></div>
            <div className="notititle">Cantidad de categorias:</div>
            <div className="notibody">2</div>
          </div>
          <div className="notification">
            <div className="notiglow"></div>
            <div className="notiborderglow"></div>
            <div className="notititle">Cantidad de Calzados:</div>
            <div className="notibody">{category.Calzado}</div>
          </div>
          <div className="notification">
            <div className="notiglow"></div>
            <div className="notiborderglow"></div>
            <div className="notititle">Cantidad de Indumentaria:</div>
            <div className="notibody">{category.Indumentaria}</div>
          </div>
        </div>
        
    )
}