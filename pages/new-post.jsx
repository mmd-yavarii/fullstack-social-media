import NewPostPage from '@/components/templates/NewPostPage';
import useRedirectInvalidUser from '@/utils/auth';
import { useState } from 'react';

function NewPost() {
    // redirect invalid users
    const isUserLoggedIn = useRedirectInvalidUser();
    const [isLoading, setIsLoading] = useState(false);

    // add new post handler
    async function addPostHandler(form, setForm) {
        console.log(form);
        if (!form.content) return;

        setIsLoading(true);
        const response = await fetch('/api/add-new-post', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            setForm({ author: form._id, authorUsername: form.username, authorImg: form.image, content: '', taggedUsers: [] });
        }
        setIsLoading(false);
    }

    if (!isUserLoggedIn) return <p className="loaderText">Loading...</p>;

    return <NewPostPage isLoading={isLoading} user={isUserLoggedIn} handler={addPostHandler} />;
}

export default NewPost;
