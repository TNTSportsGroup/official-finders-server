export const reverseName = name => {
  name = name
    .split(",")
    .reverse()
    .join(", ");

  return name;
};
