import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import './Avator.css'

function UserAvatar({ url }) {
    return (
        <Avatar alt="User Avatar" src={url} className="avatarContainer">
            {!url && <PersonIcon />}
        </Avatar>
    );
}

export default UserAvatar;
