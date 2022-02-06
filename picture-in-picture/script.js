const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//prompt to select media stream, pass to video element, then play

async function selectMediaStream() {
    try{
        /*
        https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
        The MediaDevices interface's getDisplayMedia() method prompts the user to select and
        grant permission to capture the contents of a display or portion thereof (such as a window)
        as a MediaStream. 
        */
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject  = mediaStream;
        //The onloadedmetadata event occurs when meta data for the specified audio/video has been loaded.
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }

    } catch(error){
        console.log("The erro is",error);
    }
}
button.addEventListener('click', async () => {
    //Disable button
    button.disabled = true;
    /*
    start picture in picture
    The HTMLVideoElement method requestPictureInPicture() issues an asynchronous request to 
    display the video in picture-in-picture mode. 
    */
    await videoElement.requestPictureInPicture();
    button.disabled = false;
});

selectMediaStream();