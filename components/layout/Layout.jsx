import React, { useEffect, useState } from 'react';

function Layout({ children }) {
    const [isLogedin, setIsLogedin] = useState(false);

    useEffect(() => {
        fetch('/api/auth')
            .then((res) => res.json())
            .then((res) => setIsLogedin(res.data));
    }, []);

    return (
        <div>
            {children}

            <footer>
                <p>footer</p>
            </footer>
        </div>
    );
}

export default Layout;
