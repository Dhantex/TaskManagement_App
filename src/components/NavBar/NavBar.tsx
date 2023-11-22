import '../NavBar/NavBar.css'
import {Link} from 'react-router-dom'

export function NavBar(){
        return(
            <div className="NavBar">
                <div className="container-fluid">
                <Link className="Navbar__brand" to="/">
                    <span>Generic Task Satrack</span>
                </Link>
                </div>
            </div>
        )
}
