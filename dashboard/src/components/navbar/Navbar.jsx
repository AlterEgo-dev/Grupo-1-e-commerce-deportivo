import React from "react";
import { Link } from "react-router-dom";

export function Navbar(){
    return(
        <div className="navbar">
            <div className="imgNav">
                <a href="/" >
                    <img src="/img/logo_footer.png" alt="" />
                </a>
            </div>
            <div className="link">
                <Link to="/productos" className="categ">
                    <p >Productos</p>
                </Link>
                <Link to="/users" className="categ">
                    <p >Usuarios</p>
                </Link>
                <Link to="http://localhost:8000/" className="categ">
                    <p >Sportify</p>
                </Link>
            </div>
        </div>
    )
}
