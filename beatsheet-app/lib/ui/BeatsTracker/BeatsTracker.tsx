'use client'
import {useEffect, useRef, useState} from 'react';
import styles from './beatsTracker.module.css'
import {getStartAndEndSeconds, getTotalSeconds} from "@beatsheet-app/lib/ui/BeatsTracker/util";
import Image from "next/image";

const BeatsTracker = ({beats, totalTime = [], startTime, onDelete, onUpdate, showBeat}) => {
    const timeframeRef = useRef(null)
    const [totalWidth, setTotalWidth] = useState(null);

    useEffect(() => {
        if (timeframeRef.current) {
            setTotalWidth(timeframeRef.current.offsetWidth);
        }
    }, []);

    const totalDurationInSeconds = getTotalSeconds(`0:00-${totalTime}`);


    return (
        <div className={styles.tracker} ref={timeframeRef}>
            <div>
                {beats.map((task, index) => {
                    const {startInSeconds, endInSeconds} = getStartAndEndSeconds(task.time)
                    const startPixel = ((startInSeconds - startTime) / totalDurationInSeconds) * totalWidth;
                    const endPixel = ((endInSeconds - startTime) / totalDurationInSeconds) * totalWidth;
                    const totalSelectionInPixels = endPixel - startPixel;
                    return (
                        <div
                            key={index}
                            className={styles.task}
                            style={{
                                left: startPixel,
                                width: totalSelectionInPixels,
                            }}
                            onMouseEnter={()=> showBeat(index)}
                            onMouseLeave={()=> showBeat(null)}
                        >
                            <div className={styles.taskContainer}>
                                <div className={styles.taskName}>{task.name}</div>
                                <div className={styles.taskName}>{task.time}</div>
                                <div className={styles.taskContent}>{task.content}</div>
                                <div className={styles.taskCameraAngle}>{task.cameraAngle}</div>
                                <div className={styles.taskNotes}>{task.notes}</div>
                            </div>

                            <div className={styles.btnContainer}>
                                <Image
                                    src="/setting.svg"
                                    alt="Update Icon"
                                    width={25}
                                    height={20}
                                    priority
                                    onClick={() => onUpdate(task)}
                                />

                                <Image
                                    src="/close-icon.svg"
                                    alt="Close Icon"
                                    width={25}
                                    height={20}
                                    priority
                                    onClick={() => onDelete(task.id)}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default BeatsTracker;




