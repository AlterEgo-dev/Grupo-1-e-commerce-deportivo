import { Navbar } from "../navbar/Navbar";
import { LastUser } from "../usersComponents/LastUser";
import { TotalUsers } from "../usersComponents/TotalUsers";
import { UsersAdmin } from "../usersComponents/UsersAdmin";

export function Users(){
    return (
        <div>
            <Navbar/>
            <div className="card-lastP flex-start">
                <LastUser/>
                <div className="content-cards">
                    <UsersAdmin/>
                    <TotalUsers/>
                </div>
            </div>
        </div>
    )
}