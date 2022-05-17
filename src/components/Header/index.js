import {Link} from 'react-router-dom';
import './header.css';
import logo from '../../assets/logo.png';

export default function Header(){
    return(
        <header>
            <div className="logo">
                <Link to="/"><img src={logo}/></Link>
            </div>


            <div className="discografia">
                <h1>Discografia</h1>
            </div>
        </header>
       
    )
}