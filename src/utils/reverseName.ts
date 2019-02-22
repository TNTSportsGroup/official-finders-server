export const reverseName = (name: string) => {
  name = name
    .split(",")
    .reverse()
    .join(", ");

  return name;
};
