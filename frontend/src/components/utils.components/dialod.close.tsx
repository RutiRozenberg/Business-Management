import { Button, DialogActions } from "@mui/material"
import React from "react";

interface DialogCloseProps {
    handleCloseDialog: () => void;
}

const DialogClose: React.FC<DialogCloseProps>  = ({ handleCloseDialog }) => {
    return (
        <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
                Close
            </Button>
        </DialogActions>
    )
}

export default DialogClose;