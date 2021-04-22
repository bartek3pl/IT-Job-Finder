const timestampToDateTime = (timestamp: Date) => {
  const formattedDateTime = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;
  return formattedDateTime;
};

export default timestampToDateTime;
