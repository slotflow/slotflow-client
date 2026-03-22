export const getUserMediaStream = async (): Promise<MediaStream> => {
    return await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });
};