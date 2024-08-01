import { useState } from "react";



function App() {
  const [id,setId] = useState("")

  
  function urlPostReq(link) {
    console.log(link)
    fetch("http://localhost:8001/url/", {
      method: "POST",
      headers: {  
        "Content-Type": "application/json", // specify the content type   
      }, 
      body: JSON.stringify({ url: link }),
    }).then((res) => res.json())
    .then(data=>
      setId(data.id)
    )
  }
  
  async function formAction(e) {
    e.preventDefault();
    console.log(e.target[0].value);
    await urlPostReq(e.target[0].value);
  }


  return (
    <>
      <div>
        <form onSubmit={formAction}>
          <input
            type="text"
            placeholder="Paste here"
            className="input input-bordered w-full max-w-xs"
          />
          <button>Shorten URL</button>
        </form>
        <div>{id==""?"":<a href={`http://localhost:8001/url/${id}`}>`http://localhost:8001/url/{id}`</a>}</div>
      </div>
    </>
  );
}

export default App;
