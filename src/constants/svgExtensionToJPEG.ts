
export const svgExtensionToJPEG = (svgFileName: string) => {
    if (svgFileName.endsWith('.svg')) {
        const position = svgFileName.lastIndexOf('.svg');
        const result = svgFileName.substring(0, position) + '.jpeg';
        return result;
    } else {
        return svgFileName;
    }
};
