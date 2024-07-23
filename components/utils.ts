export const getAnimalImage = (animal: string) => {
  const animalName = animal.toLowerCase();

  return `/animals/${animalName}.png`;
};

export const getAnimalColorMap = (animal: string) => {
  const animalName = animal.toLowerCase();

  switch (animalName) {
    case "tiger":
      return {
        primary: "#FF4500",
        secondary: "#8B0000",
      };
    case "elephant":
      return {
        primary: "#708090",
        secondary: "#778899",
      };
    case "bear":
      return {
        primary: "#8B4513",
        secondary: "#A0522D",
      };
    case "deer":
      return {
        primary: "#556B2F",
        secondary: "#6B8E23",
      };
    case "rabbit":
      return {
        primary: "#FFB6C1",
        secondary: "#FFA07A",
      };
    case "horse":
      return {
        primary: "#8B4513",
        secondary: "#D2691E",
      };
    case "eagle":
      return {
        primary: "#BDB76B",
        secondary: "#8B0000",
      };
    case "wolf":
      return {
        primary: "#696969",
        secondary: "#A9A9A9",
      };
    case "panda":
      return {
        primary: "#000000",
        secondary: "#212121",
      };
    case "sheep":
      return {
        primary: "#F5F5DC",
        secondary: "#8B4513",
      };
    case "owl":
      return {
        primary: "#4B0082",
        secondary: "#8A2BE2",
      };
    case "dolphin":
      return {
        primary: "#00CED1",
        secondary: "#20B2AA",
      };
  }
};
