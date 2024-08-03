import LinkDisplay from "./components/LinkDisplay";
import Form from "./components/Form";
import { useUrl } from "./hooks/useUrl";
import { useForm } from "./hooks/useForm";

function App() {
  const { id, urlPostReq } = useUrl();
  const { formAction } = useForm(urlPostReq);
  return (
    <>
      <Form formAction={formAction} />
      {id && <LinkDisplay id={id} />}
    </>
  );
}

export default App;
