import { PulseLoader } from 'react-spinners';

function BtnLoader({ content, isLoading, type }) {
    return (
        <button type={type} className="btn-loader">
            {isLoading ? <PulseLoader size="0.5rem" color="#fff" /> : content}
        </button>
    );
}

export default BtnLoader;
