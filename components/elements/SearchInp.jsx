import { FiSearch } from 'react-icons/fi';

import UserCard from '../modules/UserCard';
import styles from './SearchInp.module.css';
import { useEffect, useRef, useState } from 'react';
import { PulseLoader } from 'react-spinners';

function SearchInp() {
    const container = useRef();

    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    // fetch search data
    useEffect(() => {
        setIsLoading(true);
        async function handler() {
            const response = await fetch('/api/Search', {
                method: 'POST',
                body: JSON.stringify({ searchValue: search }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (response.ok) setUsers(result.data);
            setIsLoading(false);
        }
        handler();
    }, [search]);

    // close search poup
    useEffect(() => {
        function eventHandler(event) {
            if (!container.current?.contains(event.target)) {
                setSearch('');
            }
        }
        window.addEventListener('click', eventHandler);
        return () => window.removeEventListener('click', eventHandler);
    }, []);

    return (
        <div className={styles.container} ref={container}>
            <div className={styles.input}>
                <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <FiSearch size="1.5rem" opacity="0.4" />
            </div>

            {!!search.length && (
                <div className={`${styles.searchResult} blur`}>
                    {isLoading ? (
                        <div className={styles.loader}>
                            <PulseLoader color="#fff" size="0.7rem" />
                        </div>
                    ) : users.length ? (
                        users.map((i) => <UserCard {...i} />)
                    ) : (
                        <p style={{ textAlign: 'center', opacity: '0.5' }}>چیزی یافت نشد</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchInp;
