import './footer.css'

function footer(name, value) {
    return(
        <div className="footerContainer">
            <div className="mediaContainer">
                <img src="#" alt="git" />
                <img src="#" alt="facebook" />
            </div>
            <div className="messagePart">
                <ul>
                    <li>quize</li>
                    <li>learn</li>
                    <li>just visit</li>
                </ul>
            </div>
            <div className="contactus">
                <img src="#" alt="light" />
                {/* <textarea  >comment</textarea> */}
            </div>
        </div>
    )
}
export default footer;