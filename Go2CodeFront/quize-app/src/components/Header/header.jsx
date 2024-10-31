import './header.css'
import { Link } from 'react-router-dom';

function header(name, value) {
    return(
        <div className="headerContainer">
            <div className="logoContainer">
                <img src="#" alt="logo" />
            </div>
            <div className="messagePart">
                <ul>
                    <li>one</li>
                    <li>two</li>
                    <li>three</li>
                </ul>
            </div>
            <div className="auth">
                <img src="#" alt="light" />
                <Link to='/signup'><input type="button" value="signup" /></Link>
            </div>
        </div>
    )
}
export default header;