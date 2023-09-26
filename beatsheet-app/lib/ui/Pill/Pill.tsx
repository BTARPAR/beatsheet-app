import Link from "next/link";
import styles from './pill.module.css'

const Pill = ({ text, actId }) => {
    return (
        <div className={styles.pill}>
            <Link href={`/beats/${actId}`}>{text}</Link>
        </div>
    );
};

export default Pill;