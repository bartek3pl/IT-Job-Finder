const timestampToDateTime = (timestamp: Date) => {
  if (isNaN(timestamp.getTime())) {
    throw new TypeError('Invalid date');
  }

  const formattedDateTime = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;
  return formattedDateTime;
};

export { timestampToDateTime };
