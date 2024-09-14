import { useRef } from 'react';  

function Form({ formAction }) {  
  const inputRef = useRef(null);  

  const handlePasteClick = async () => {  
    try {   
      const text = await navigator.clipboard.readText();  
      inputRef.current.value = text;  
    } catch (err) {  
      console.error('Failed to read clipboard contents: ', err);  
    }  
  };  

  return (  
    <form onSubmit={formAction} className="flex flex-col space-y-4 justify-center items-center">  
      <div className="flex items-center">  
        <input  
          type="text"  
          placeholder="Paste here"  
          className="w-full max-w-lg p-4 text-gray-300 bg-gray-800 border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          style={{height: '4rem'}} 
          ref={inputRef}
          required  
        />  
        <button  
          type="button"  
          onClick={handlePasteClick}  
          className="px-6 py-5 ml-4 text-white bg-green-700  rounded-lg shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"  
          title="Paste"  
        >  
          <span role="img" aria-label="paste">📋</span>  
        </button>  
      </div>  
      <button type="submit" className="ml-4 px-6 py-3 text-white bg-green-700 rounded-lg shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">Shorten URL</button>  
    </form>  
  );  
}  

export default Form;