const timeFormat = (minutes) => {
  if (typeof minutes !== 'number' || isNaN(minutes) || minutes < 0) {
    return 'Unknown Duration';
  }

  const hours = Math.floor(minutes / 60);
  const minutesRemainder = minutes % 60;

  if (hours === 0) return `${minutesRemainder}m`;
  if (minutesRemainder === 0) return `${hours}h`;

  return `${hours}h ${minutesRemainder}m`;
};

export default timeFormat;
