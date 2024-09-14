import { useNavigate } from "react-router-dom";


function LoginButton(){
    const Navigate = useNavigate()
    const handleClick = ()=>{
        Navigate('/login')
    }
    
    return(
        <button className="fixed top-0 right-20 m-4 mr-10 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-green-300" onClick={handleClick}>Login</button>
    )
}

export default LoginButton;