import { useNavigate } from "react-router-dom";


function SignupButton(){
    const Navigate = useNavigate()
    const handleClick = ()=>{
        Navigate('/signup')
    }
    
    return(
        <button className="fixed top-0 right-0 m-4 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-green-300" onClick={handleClick}>Signup</button>
    )
}

export default SignupButton;