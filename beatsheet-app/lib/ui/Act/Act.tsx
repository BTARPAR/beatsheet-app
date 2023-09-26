'use client'
import styles from './act.module.css'
import Pill from "@beatsheet-app/lib/ui/Pill";
import Image from "next/image";
import {useState} from "react";

const Act = ({children, title, actId, hasBeats, onDelete}) => {
    const [deleting, setDeleting] = useState(false)
    return (
        <div className={styles.act}>
            <h2 className={styles.title}>
                <span className={styles.titleSpan}>{title}</span>
                {hasBeats && <Pill text={'Show Beats'} actId={actId}/>}
                {!deleting ? <Image
                    className={styles.trash}
                    src="/trash.svg"
                    alt="Trash Icon"
                    width={25}
                    height={20}
                    priority
                    onClick={() => {
                        onDelete(actId)
                        setDeleting(true)
                    }}
                /> : <span className={styles.flash}>Act is getting deleted</span>
                }
            </h2>
            <div className={styles.underline}></div>
            {children}
        </div>
    );
};

export default Act;