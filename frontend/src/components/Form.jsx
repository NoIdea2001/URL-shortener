function Form({ formAction }) {
  return (<form onSubmit={formAction}>
    <input
      type="text"
      placeholder="Paste here"
      className="input input-bordered w-full max-w-xs"
    />
    <button>Shorten URL</button>
  </form>);
}

export default Form;
