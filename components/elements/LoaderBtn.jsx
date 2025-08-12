import { PulseLoader } from 'react-spinners';

export default function LoaderBtn({ isLoading, content, onclickHandler }) {
    return (
        <button className="LoaderBtn" onClick={onclickHandler}>
            {isLoading ? <PulseLoader size="0.6rem" color="#fff" /> : content}
        </button>
    );
}
