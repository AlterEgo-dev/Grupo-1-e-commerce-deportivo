import React, { useEffect, useState } from "react";

export function UsersAdmin(){
    const [cantAdmin, setCantAdmin] = useState();
    useEffect(() => {
      fetch("http://localhost:8000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((data) => {
        setCantAdmin(data.cantAdmin);//posicion 0 porque no hay otra posicion
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, []);
    return(
      <>
        <div className="notification">
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>
          <div className="notititle">Total de admins en la base</div>
          <div className="notibody">{cantAdmin}</div>
        </div>
      </>
    )
}