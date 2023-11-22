import '../NotFound/NotFound.css'
import {Link} from "react-router-dom"

import ImageNotFound from '../../assets/NotFound.jpg'

export function NotFound(){
        return(
            <div className="Container">
                <div className="row">
                    <div className="Container__Content  col-3">
                        <div className="Container__Content__Image col-md-1">
                            <img src={ImageNotFound}
                                alt="Imagen Logo"
                                className="Container__Content__Image"/>
                            <Link to="/">Go to home page</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
}