import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

interface CustomAlertProps{
    message:string;
}

const  CustomErrorAlert:React.FC<CustomAlertProps> =({ message }) =>{
    const [open, setOpen] = useState(true);
    
    return (
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert
          onClose={()=> setOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {message}
          </Alert>
      </Snackbar>
    );
  }

export default CustomErrorAlert;