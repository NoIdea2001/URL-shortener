import Heading from "../components/Heading";
import LinkDisplay from "../components/LinkDisplay";
import Form from "../components/Form";
import { useUrl } from "../hooks/useUrl";
import { useForm } from "../hooks/useForm";
import LoginButton from "../components/LoginButton.jsx";
import SignupButton from "../components/SignupButton.jsx";
import NameDisplay from "../components/NameDisplay.jsx";
import LogoutButton from "../components/LogoutButton.jsx";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";


function Home({authenticated,setAuthenticated,token,setToken}) {
  const { id, urlPostReq } = useUrl();
  const { formAction } = useForm(urlPostReq);
  const [userName,setUserName] = useState('')

  useEffect(()=>{
    setUserName(localStorage.getItem("loggedInUser"))
  },[token,authenticated])
  useEffect(()=>{
    setUserName(localStorage.getItem("loggedInUser"))
  },[id,authenticated])
  return (
    <>
      {authenticated==true ? (
        <>
          <LogoutButton setAuthenticated={setAuthenticated} setToken={setToken}/>
          <NameDisplay userName={userName} />
        </>
      ) : (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      <Heading />
      <Form formAction={formAction} />
      {id && <LinkDisplay id={id} />}
      <ToastContainer />
    </>
  );
}

export default Home;
