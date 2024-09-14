import { useEffect, useState } from "react";

const NameDisplay = ({userName}) => {
    const [displayName,setDisplayName] = useState('')
    return (
        <>
        <h1 className="fixed top-0 right-0 m-4 text-white font-bold text-2xl px-5 py-2.5">{userName.length>5?userName.slice(0,5)+'...':userName}</h1>
        </>
    )
}

export default NameDisplay