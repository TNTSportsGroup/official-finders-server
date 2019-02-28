export const convertToSummableValue = string => {
  // If value is a string with a $ symbol in front.
  const num = string.replace("$", "");

  return parseFloat(num);
};
