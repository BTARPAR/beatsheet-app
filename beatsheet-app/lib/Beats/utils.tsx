export const sortAndCalculateTotalTime = (timeRanges) => {
    const convertToSeconds = (time) => {
        const [minutes, seconds] = time.split(':').map(Number);
        return minutes * 60 + seconds;
    };

    timeRanges.sort((a, b) => {
        const startTimeA = convertToSeconds(a.time.split('-')[0]);
        const startTimeB = convertToSeconds(b.time.split('-')[0]);
        return startTimeA - startTimeB;
    });

    const start = timeRanges[0].time.split('-')[0]
    const end =  timeRanges[timeRanges.length - 1].time.split('-')[1]
    const startSeconds = convertToSeconds(start);
    const endSeconds = convertToSeconds(end);
    const totalSeconds = endSeconds - startSeconds;

    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return {
        sortedTimeRanges: timeRanges,
        totalTime: `${totalMinutes}:${remainingSeconds}`
    };
}

export const convertTimeToSeconds = (time) => {
    const startTime = time.split('-')[0] || '00:00'
    const [minutes, seconds] = startTime.split(':').map(Number);
    return minutes * 60 + seconds;
}