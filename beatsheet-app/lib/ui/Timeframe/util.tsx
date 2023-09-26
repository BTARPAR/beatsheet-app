export const convertToTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.round(seconds % 60);
    if (remainingSeconds === 60) {
        minutes++
        remainingSeconds = 0
    }
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}