

function LinkDisplay({ id }) {
  const copyToClipboard = async () => {
    const url =  `${import.meta.env.VITE_BACKEND_LINK}url/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const url = `${import.meta.env.VITE_BACKEND_LINK}url/${id}`;

  return (
    <div
      className="flex items-center justify-between p-4 mt-12 rounded-lg shadow-md  "
      style={{ backgroundColor: "#1d232a" }}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
        style={{ color: "#9ca3af" }}
      >
        {url}
      </a>
      <button
        onClick={copyToClipboard}
        className="ml-4 px-3 py-2 text-sm text-white bg-blue-800 rounded hover:bg-blue-600 focus:outline-none focus:ring"
      >
        Copy to Clipboard
      </button>
    </div>
  );
}

export default LinkDisplay;
