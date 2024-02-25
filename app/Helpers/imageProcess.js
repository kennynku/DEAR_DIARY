export const imageProcesser = (imgBinary, contentType) => {
    const base64Image = Buffer.from(imgBinary).toString('base64');
    const dataUrl = `data:${contentType};base64,${base64Image}`;
    return dataUrl;
}
