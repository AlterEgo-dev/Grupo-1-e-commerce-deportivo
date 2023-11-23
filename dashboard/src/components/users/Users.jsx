import { LastUser } from "../usersComponents/LastUser";
import { TotalUsers } from "../usersComponents/TotalUsers";

export function Users(){
    return (
        <div className="user">
            <LastUser/>
            <TotalUsers/>
        </div>
    )
}