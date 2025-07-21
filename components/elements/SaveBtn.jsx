import styles from './Btn.module.css';

import { TbBookmark, TbBookmarkFilled } from 'react-icons/tb';

function SaveBtn({ _id }) {
    return <button className={styles.btn}>{false ? <TbBookmarkFilled size="1.5rem" /> : <TbBookmark size="1.5rem" />}</button>;
}

export default SaveBtn;
