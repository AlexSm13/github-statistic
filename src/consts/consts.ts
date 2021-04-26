const backgroundColors = [
  "rgba(255, 0, 0, .5)",
  "rgba(0, 255, 0, .5)",
  "rgba(255,123,0,0.7)",
  "rgba(0,255,255,0.5)",
  "rgba(0,0,255,0.5)",
  "rgba(255,0,255,0.5)",
  "rgba(119,207,67,0.5)",
  "rgba(176,81,186,0.7)",
  "rgb(195,42,108, .6)",
];

export const getBGColors = (count: number) => {
  const colors = [...backgroundColors.sort(() => 0.5 - Math.random())];
  colors.length = count;
  return colors;
};

const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

export function formatSizeUnits(bytes: number): string {
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}
