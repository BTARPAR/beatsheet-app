

/* const timeRange = "0:30-1:00";
* const totalSeconds = getTotalSeconds(timeRange);
* console.log(totalSeconds);
* Output: 30
* */
export const getTotalSeconds = (timeRange) => {
  const times = timeRange.split('-');
  const startTime = times[0].split(':');
  const endTime = times[1].split(':');

  const startMinutes = parseInt(startTime[0], 10);
  const startSeconds = parseInt(startTime[1], 10);

  const endMinutes = parseInt(endTime[0], 10);
  const endSeconds = parseInt(endTime[1], 10);

  return (endMinutes * 60 + endSeconds) - (startMinutes * 60 + startSeconds);
}

/*
* const timeRange = "1:30-2:30";
* const { start, end } = getStartAndEndSeconds(timeRange);
* console.log(`Starting Second: ${start}, Ending Second: ${end}`);
* */
export const getStartAndEndSeconds = (timeRange) => {
  const times = timeRange.split('-');
  const startTime = times[0].split(':');
  const endTime = times[1].split(':');

  const startMinutes = parseInt(startTime[0], 10);
  const startSeconds = parseInt(startTime[1], 10);

  const endMinutes = parseInt(endTime[0], 10);
  const endSeconds = parseInt(endTime[1], 10);

  const startTotalSeconds = (startMinutes * 60) + startSeconds;
  const endTotalSeconds = (endMinutes * 60) + endSeconds;

  return { startInSeconds: startTotalSeconds, endInSeconds: endTotalSeconds };
}