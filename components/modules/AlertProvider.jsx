import { RxCross1 } from 'react-icons/rx';

import styles from './Alert.module.css';

import { createContext, useContext, useEffect, useState } from 'react';

const AlertContext = createContext();

export default function AlertProvider({ children }) {
    const [type, setType] = useState(null);
    const [message, setMessage] = useState(null);
    const [isVisable, setIsVisable] = useState(false);

    // close alert after 2s
    useEffect(() => {
        if (!isVisable) return;
        const timeout = setTimeout(() => {
            setIsVisable(false);
        }, 1500);
        return () => clearTimeout(timeout);
    }, [isVisable]);

    return (
        <AlertContext.Provider value={{ setType, setMessage, setIsVisable }}>
            <div className={`${styles[type]} ${isVisable ? styles.visable : styles.unvisable}`}>
                <p>{message}</p>
            </div>

            {children}
        </AlertContext.Provider>
    );
}

// custom hook for useing alert
export function useAlert() {
    const { setType, setMessage, setIsVisable } = useContext(AlertContext);

    return (type, message) => {
        setMessage(message);
        setType(type);
        setIsVisable(true);
    };
}
