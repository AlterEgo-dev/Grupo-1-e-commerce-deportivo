import React, { useEffect, useState } from "react";

export function LastUser(){
    const [user, setUser] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8000/api/user/last", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((data) => {
        setUser(data.data[0]);//posicion 0 porque no hay otra posicion
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, []);

    return(
    <div className="card">
        <h1>Ultimo Usuario</h1>
        <div className="card-content">
          <div >
            <img src={`http://localhost:8000/${user.Avatar}`} alt={user.UserName} height="350px" width="350px"/>
          </div>
          <div className="infoProducts">
              <ul>
                <li><p>Id</p>{user.id}</li>
                <li><p>Nombre</p>{user.UserName}</li>
                <li><p>Email</p>{user.Email}</li>
                <li><p>Rol</p>{user.Role}</li>
              </ul>
          </div>
        </div>
    </div>
    )
}