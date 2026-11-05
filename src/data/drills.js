export const KEY_SET = ["a", "s", "d", "f", "j", "k", "l", ";"];

export const DRILLS = [
  {
    id: "home",
    name: "Home Row",
    icon: "home",
    description: "Practice all eight home-row keys",
    pattern: "asdfjkl;",
  },
  {
    id: "left",
    name: "Left Hand",
    icon: "hand",
    description: "Build confidence with your left hand",
    pattern: "asdf",
  },
  {
    id: "right",
    name: "Right Hand",
    icon: "target",
    description: "Build confidence with your right hand",
    pattern: "jkl;",
  },
  {
    id: "alternating",
    name: "Alternating",
    icon: "repeat",
    description: "Switch between both hands",
    pattern: "ajskdlf;",
  },
  {
    id: "patterns",
    name: "Key Patterns",
    icon: "grid",
    description: "Improve rhythm with repeated patterns",
    pattern: "asdfjkl;asdfjkl;",
  },
];

export function makePrompt(drillId = "home", length = 5000) {
  const drill = DRILLS.find((item) => item.id === drillId) || DRILLS[0];

  let result = "";

  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * drill.pattern.length);
    result += drill.pattern[randomIndex];
  }

  return result;
}