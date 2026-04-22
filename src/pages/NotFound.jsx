import { Link } from "react-router";

function NotFound(){
    return(
        <div>
            <h2>404-Pagina nu exista</h2>
            <Link to = "/">Home</Link>
        </div>
    );
}

export default NotFound;