import clickSound from "../assets/sounds/click.mp3";

export const useSound = () => {
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.play().catch((e) => {
      console.warn("Sound play blocked or failed", e);
    });
  };

  return { playSound };
};
