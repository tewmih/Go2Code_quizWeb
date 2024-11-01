import './footer.css'
import Facebook from '@mui/icons-material/Facebook'
import GIthub from '@mui/icons-material/GitHub';
import Twitter from '@mui/icons-material/Twitter';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Comment from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
function footer(name, value) {
    return(
        <div className="footerContainer">
            <div className="mediaContainer">
                <GIthub/>
                <Facebook/>
                <Twitter/>
                <LinkedIn/>
                
            </div>
            <div className="messagePart">
                <ul>
                    <Link to='/showQuestions'><li>quize</li></Link>
                   <Link to='/dashboard'><li>learn</li></Link>
                    <li>just visit</li>
                </ul>
            </div>
            <div className="contactus">
                <Comment/>
                {/* <textarea  >comment</textarea> */}
            </div>
        </div>
    )
}
export default footer;