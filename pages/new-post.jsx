import BtnLoader from '@/components/elements/BtnLoader';
import { useAlert } from '@/components/modules/AlertProvider';
import { verifyToken } from '@/utils/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { IoMdArrowRoundBack } from 'react-icons/io';

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    gap: '30px',
    margin: '10px auto',
    maxWidth: '400px',
    height: '80dvh',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const textareaStyle = { resize: 'none', width: '100%', height: '100%', padding: '10px', fontSize: '16px' };

export default function NewPost() {
    const showAlert = useAlert();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');

    // create post handler
    async function addPost(event) {
        event.preventDefault();

        if (!content.length) {
            showAlert('failed', 'محتوا ای وارد نشده است');
            return;
        }
        const confirmation = confirm('از افزودن پست اطمینان دارید ؟');
        if (!confirmation) return;

        setIsLoading(true);
        const response = await fetch('/api/account/add-post', {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        showAlert(result.status, result.message);

        if (response.ok) setContent('');
        setIsLoading(false);
    }

    return (
        <>
            <form style={formStyle} onSubmit={addPost}>
                <textarea
                    placeholder="محتوای پست را اینجا وارد کنید"
                    style={textareaStyle}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <BtnLoader type="submit" isLoading={isLoading} content="افزودن پست" />
            </form>
        </>
    );
}

// validate user and get it's info
export async function getServerSideProps(context) {
    const { token } = context.req.cookies;
    const verifyedToken = verifyToken(token);

    if (!verifyedToken) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
