import React, { useEffect, useState } from "react";

export function TotalUsers(){
    const [user, setUser] = useState();
    useEffect(() => {
      fetch("http://localhost:8000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json())
      .then((data) => {
        setUser(data.count);//posicion 0 porque no hay otra posicion
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
          <div className="notititle">Total de usuarios en la base</div>
          <div className="notibody">{user}</div>
        </div>
      </>
    )
}