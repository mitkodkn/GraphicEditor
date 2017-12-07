export const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {
    console.log(srcWidth)
    console.log(srcHeight)
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {width: srcWidth * ratio, height: srcHeight * ratio};
};
