import '../Footer/Footer.css';
import {Link} from 'react-router-dom'

export function Footer(){
        return (
            <div className="Footer">    
                 <div className="container-fluid">
                    <span>Developer By  
                        <Link className="Footer__Link" to="/"> Generic Task</Link>
                    </span> 
                </div>
            </div>
        )
        }