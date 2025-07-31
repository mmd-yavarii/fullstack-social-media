import SearchInp from '@/components/elements/SearchInp';
import UserCard from '@/components/modules/UserCard';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function Explore() {
    return (
        <>
            <div className="backBtn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p>Explore</p>
            </div>

            <SearchInp />
        </>
    );
}
