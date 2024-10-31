import React from "react";

import { Dialog } from "@mui/material";
import {DialogTitle} from "@mui/material";
import {DialogContent} from "@mui/material";
import {DialogActions} from "@mui/material";
import {Button} from "@mui/material";

import './DialogBox.css'

function CustomDialog({open,message,onClose}){
    return(
        <Dialog open={open} onClose={onClose} className="dialogContainer" >
            <DialogTitle>Message</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>

        </Dialog>
    )
}

export default CustomDialog;