import { PulseLoader } from 'react-spinners';
import UserCard from '../modules/UserCard';
import styles from './SearchInp.module.css';

import { useEffect, useState } from 'react';

function SearchInp({ onclickCardsHandler = undefined }) {
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const [searched, setSearched] = useState([]);

    // search users
    useEffect(() => {
        const delay = setTimeout(() => {
            async function getUsersSearched() {
                if (!searchValue) return setSearched([]);
                setIsLoading(true);
                const response = await fetch('/api/explore/find-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: searchValue }),
                });
                const result = await response.json();
                if (response.ok) setSearched(result.data);
                setIsLoading(false);
            }
            getUsersSearched();
        }, 300);

        return () => clearTimeout(delay);
    }, [searchValue]);

    return (
        <div className={styles.container}>
            <input type="text" placeholder="Enter uername" id="tag" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

            {searchValue && (
                <div className={`blur ${styles.searchResult}`}>
                    {isLoading ? (
                        <div className={styles.loader}>
                            <PulseLoader size="0.5rem" />
                        </div>
                    ) : (
                        searched.map((i) =>
                            !onclickCardsHandler ? (
                                <div key={i._id}>
                                    <UserCard {...i} disabledLink={false} />
                                </div>
                            ) : (
                                <div
                                    key={i._id}
                                    onClick={() => {
                                        onclickCardsHandler(i);
                                        setSearchValue('');
                                    }}
                                >
                                    <UserCard {...i} disabledLink={true} />
                                </div>
                            )
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchInp;
