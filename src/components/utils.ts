/**
 * Method for determining font contrast
 * - using for project cards for showing description
 * - brightness cutoff currently set to 215 in this method (rather than a lower threshold)
 *   because project card text is given a small darker background for more consistent contrast
 *   appearance
 */
export const getContrastText = ({ imageId }: { imageId: string }) => {
  const img = <HTMLCanvasElement>document.getElementById(imageId);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!img || !ctx) {
    return "#000";
  }

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let brightness = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    // Calculate perceived brightness (weighted average of RGB)
    brightness += 0.299 * r + 0.587 * g + 0.114 * b;
  }

  // Calculate average brightness
  brightness /= imageData.length / 4;

  // Determine text color based on brightness
  return brightness > 215 ? "#000" : "#FFF";
};
