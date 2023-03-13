import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../app/hooks";

const Toast = () => {
    const tasksState = useAppSelector( state => state.tasks);

    const error = tasksState.error;

    //set a custom id to prevent duplicate toast
    const customId = "custom-id-error";
    if(error){
        toast.error('Sorry. There was a problem. Try again later',{
            toastId: customId,
        })
    }
    
    return(
        
        <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover        
        theme="light"/>
    )

}

export default Toast;