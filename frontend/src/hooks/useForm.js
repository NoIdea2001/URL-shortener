export const useForm = (urlPost) => {

    const formAction = async (e) => {
        e.preventDefault();
        const linkValue = e.target[0].value;
        if (linkValue) {
            await urlPost(e.target[0].value);
            e.target.reset();
        }
    }

    return {formAction}

}