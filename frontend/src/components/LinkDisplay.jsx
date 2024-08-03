function LinkDisplay({ id }) {
  return (<a
    href={`http://localhost:8001/url/${id}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    `http://localhost:8001/url/{id}`
  </a>);
}

export default LinkDisplay;
