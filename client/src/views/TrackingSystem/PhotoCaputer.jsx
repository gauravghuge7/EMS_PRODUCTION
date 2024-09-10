import React, { useState } from 'react';
import html2canvas from 'html2canvas';

function ScreenshotApp() {
    const [screenshot, setScreenshot] = useState(null);

    const captureScreenshot = () => {
        html2canvas(document.body).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            setScreenshot(imgData);
        });
    };

    return (
        <div>
            <h1>Screenshot App</h1>
            <button onClick={captureScreenshot}>Take Screenshot</button>
            {screenshot && (
                <div>
                    <h2>Screenshot Preview:</h2>
                    <img src={screenshot} alt="Screenshot" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
}

export default ScreenshotApp;