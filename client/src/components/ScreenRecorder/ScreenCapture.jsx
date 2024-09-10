// ScreenCapture.js
import  { useState } from 'react';

function ScreenCapture() {
    const [image, setImage] = useState(null);

    const captureScreen = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            const track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);
            const bitmap = await imageCapture.grabFrame();
            
            const canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const context = canvas.getContext('2d');
            context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

            setImage(canvas.toDataURL('image/png'));

            track.stop(); // Stop capturing the screen
        } catch (error) {
            console.error('Error capturing screen:', error);
        }
    };

    return (
        <div>
            <button onClick={captureScreen}>Capture Screen</button>
            {image && <img src={image} alt="Screen Capture" />}
        </div>
    );
}

export default ScreenCapture;