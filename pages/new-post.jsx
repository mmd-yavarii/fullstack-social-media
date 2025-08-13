import NewPostPage from '@/components/templates/NewPostPage';
import useRedirectInvalidUser from '@/utils/auth';

function NewPost() {
    // redirect invalid users
    const isUserLoggedIn = useRedirectInvalidUser();

    // add new post handler
    async function addPostHandler(form) {
        console.log(form);
    }

    if (!isUserLoggedIn) return <p className="loaderText">Loading...</p>;

    return <NewPostPage user={isUserLoggedIn} handler={addPostHandler} />;
}

export default NewPost;
