import html2canvas from "html2canvas";

export const captureDivAsImage = async (divId: string): Promise<Blob> => {
    const element = document.getElementById(divId);
    if (!element) {
        throw new Error("Element not found");
    }

    const canvas = await html2canvas(element);
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error("Failed to convert canvas to blob"));
            }
        });
    });
};
