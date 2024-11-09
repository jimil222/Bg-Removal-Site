import { createContext, useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [credit, setCredit] = useState(false);
    const [image,setImage] = useState(false);
    const [resultImage, setresultImage] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()
    const { getToken } = useAuth();
    const {isSignedIn} = useUser();
    const {openSignIn} = useClerk();

    const loadCreditsData = async () => {
        try {
            const token = await getToken();
            // console.log("Token:", token); // Log token
            const {data} = await axios.get('http://localhost:4000/api/user/credits', {headers:{token}});
            console.log("Response data:", data); // Log full response
            console.log("Credits:", data.credits); // Log credits if successful
    
            if (data.success) {
                setCredit(data.credits);
            } else {
                console.log("Failed to load credits:", data.message);
            }
        } catch (error) {
            console.error("Error fetching credits:", error); // More detailed error logging
            toast.error(error.message); 
        }
    };

    const removeBg = async (image) =>{

        try {

            if(!isSignedIn){
                return openSignIn()
            }

            setImage(image)
            setresultImage(false)
            navigate('/result')

            const token = await getToken()

            const formData = new FormData()
            image && formData.append('image',image)

            const {data} = await axios.post(backendUrl+'/api/image/remove-bg',formData,{headers:{token}})

            if(data.success){
                setresultImage(data.resultImage)
                data.creditBalance && setCredit(data.creditBalance)
            }
            else{
                toast.error(data.message)
                data.creditBalance && setCredit(data.creditBalance)
                if (data.creditBalance===0) {

                    navigate('/buy')
                    
                }
            }



            
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }

    }

    const value = {
        credit,
        setCredit,
        loadCreditsData,
        backendUrl,
        image,setImage,
        removeBg,
        resultImage,setresultImage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
