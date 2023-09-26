'use client'
import {useEffect, useRef, useState} from 'react';
import {MouseActions, PositionState} from "./types";
import {getStartAndEndSeconds, getTotalSeconds} from "@beatsheet-app/lib/ui/BeatsTracker/util";
import {convertToTime} from "@beatsheet-app/lib/ui/Timeframe/util";
import styles from './timeframe.module.css'

const HorizontalTimeline = ({onFrameSelect, totalTime, startTime, showBeat}) => {
    const totalDurationInSeconds = getTotalSeconds(`0:00-${totalTime}`);

    const timeframeRef = useRef(null)
    const [lineX, setLineX] = useState<PositionState>(null);
    const [totalWidth, setTotalWidth] = useState(null);
    const [isSelecting, setIsSelecting] = useState<boolean>(false);

    const {startInSeconds = null, endInSeconds = null} = !!showBeat && getStartAndEndSeconds(showBeat?.time)
    const startPixel = ((startInSeconds - startTime) / totalDurationInSeconds) * totalWidth;
    const endPixel = ((endInSeconds - startTime) / totalDurationInSeconds) * totalWidth;

    const [start, setStart] = useState<PositionState>(0);
    const [end, setEnd] = useState<PositionState>(endPixel);

    const handleMouseActions = (e, type?) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;

        if (type === MouseActions.DOWN) {
            setStart(x);
            setIsSelecting(true);
        }

        if (type === MouseActions.UP) {
            setEnd(x);
            setIsSelecting(false);
            const startInSeconds = (start / totalWidth) * totalDurationInSeconds;
            const endInSeconds = (end / totalWidth) * totalDurationInSeconds;
            onFrameSelect(`${convertToTime(startInSeconds + startTime)}-${convertToTime(endInSeconds + startTime)}`)
        }

        if ((x < e.target.offsetWidth) && (x > 0)) {
            setLineX(x);
        } else {
            setLineX(null);
        }

        if (isSelecting) {
            setEnd(x);
        }

    };

    const handleClickOutside = (event) => {
        if (timeframeRef.current && !timeframeRef.current.contains(event.target)) {
            setStart(null)
            setEnd(null)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        if (timeframeRef.current) {
            setTotalWidth(timeframeRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        setStart(() => {
            if (!startPixel) return 0.0001
            return startPixel
        })
        setEnd(endPixel)
    }, [startPixel, endPixel])


    // DEVELOPMENT CALCULATION
    /*
        const totalSelectionInPixels = end - start; // Assuming 'end' and 'start' are in pixels

    const selectedDurationInSeconds = (totalSelectionInPixels / totalWidth) * totalDurationInSeconds;
    const startInSeconds = (start / totalWidth) * totalDurationInSeconds;
    const endInSeconds = (end / totalWidth) * totalDurationInSeconds;
    */
    const LineXInSeconds = (lineX / totalWidth) * totalDurationInSeconds;

    const handleMouseLeave = () => {
        setLineX(null);
    };

    return (
        <>
            {/*    Total Width: {totalWidth} pixels
            Total Selection: {totalSelectionInPixels} pixels
            Total Duration: {totalDurationInSeconds} seconds
            Total Duration Formatted: {convertToTime(selectedDurationInSeconds)}
            <br/>
            Start Time in Seconds: {convertToTime(startInSeconds)} seconds
            End Time in Seconds: {convertToTime(endInSeconds)} seconds*/}
            <div
                className={styles.timeframePanel}
                onMouseDown={(e) => handleMouseActions(e, MouseActions.DOWN)}
                onMouseUp={(e) => handleMouseActions(e, MouseActions.UP)}
                onMouseMove={handleMouseActions}
                onMouseLeave={handleMouseLeave}
                ref={timeframeRef}
            >
                {!!start && (
                    <div
                        className={styles.selection}
                        style={{
                            left: start,
                            width: !!end ? end - start : 0,
                        }}
                    />
                )}

                {lineX !== null && (
                    <>
                        <div
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: `${lineX}px`,
                                height: '100%',
                                borderLeft: '2px solid red',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: `${lineX}px`,
                                transform: 'translateX(-50%)',
                            }}
                        >
                            {convertToTime(LineXInSeconds + startTime)} {/*// add th starting second*/}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default HorizontalTimeline;
