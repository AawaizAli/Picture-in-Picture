const video = document.getElementById("video");
const button = document.getElementById("button");

// Ask user to select media source and play in video element on page load
async function selectMediaSource() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    video.srcObject = stream;
    video.play();
  } catch (error) {
    console.error("Error accessing media source:", error);
  }
}

// Event listener for the button to toggle Picture-in-Picture mode
button.addEventListener("click", () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((error) => {
      console.error("Error exiting Picture-in-Picture:", error);
    });
  } else {
    if (video.readyState === 4) {
      // Check if the video is loaded and ready
      video.requestPictureInPicture().catch((error) => {
        console.error("Error entering Picture-in-Picture:", error);
      });
    }
  }
});

// Call the function to select media source on page load
window.addEventListener("load", () => {
  selectMediaSource();
});
