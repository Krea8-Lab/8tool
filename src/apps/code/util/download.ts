const download = (dataURL: string, filename: string) => {
  let url = dataURL;
  let isBlobUrl = false;

  if (dataURL.startsWith("data:")) {
    try {
      const parts = dataURL.split(",");
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : "image/png";
      const b64Data = parts[1];
      if (b64Data) {
        const byteCharacters = atob(b64Data);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: mime });
        url = URL.createObjectURL(blob);
        isBlobUrl = true;
      }
    } catch (e) {
      console.warn("Failed to convert dataURL to blob, falling back to direct href:", e);
      url = dataURL;
    }
  }

  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (isBlobUrl) {
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
};

export default download;
