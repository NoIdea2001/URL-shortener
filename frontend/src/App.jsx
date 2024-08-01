function urlPostReq(link) {
  fetch("http://localhost:8001/url/", {
    method: "POST",
    body: JSON.stringify(link),
  }).then((res) => res.json())
  .then(data=
    
  )
}

function formAction(e) {
  e.preventDefault();
  urlPostReq(e[0].target.value);
}

function App() {
  return (
    <>
      <div>
        <form action={formAction}>
          <input
            type="text"
            placeholder="Paste here"
            className="input input-bordered w-full max-w-xs"
          />
          <button>Shorten URL</button>
        </form>
        <div></div>
      </div>
    </>
  );
}

export default App;
