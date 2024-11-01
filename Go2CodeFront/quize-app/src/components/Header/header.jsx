import './header.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserAvatar from '../../Utility/Avator/AvatorFile';
import { useDispatch } from 'react-redux';
import Home from '@mui/icons-material/Home'
import Login from '@mui/icons-material/Person'
import Folder from '@mui/icons-material/Folder'
import Lightbulb from '@mui/icons-material/Lightbulb'
function header() {
    const url ='/home/tew/CodeZone/Go2CodeFullStack/Go2CodeFront/quize-app/src/assets/image.png'

    return(
        <div className="headerContainer">
            <div className="logoContainer">
                <UserAvatar url={url}>
                </UserAvatar>
            </div>
            <div className="messagePart">
                <ul>
                <Link to='/dashboard'><Home/>Home</Link>
                <Link to='/showQuestions' ><Login/>Login</Link>
                <Link to='/showQuestions'><Folder/>Questions</Link>
                
                       </ul>
            </div>
            <div className="auth">
                <div className="light">
                    <Lightbulb />
                </div>
                <Link to='/signup'><input type="button" value="signup" /></Link>
            </div>
        </div>
    )
}
export default header;