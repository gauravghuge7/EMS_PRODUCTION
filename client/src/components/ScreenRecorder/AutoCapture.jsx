
import  { useEffect, useState } from 'react';
import PhotoCapture from './PhotoCapture';

function AutoCapture() {
    const [capture, setCapture] = useState(false);

    useEffect(() => {
        const captureInterval = setInterval(() => {
            setCapture(true);
            setTimeout(() => setCapture(false), 3000); 
        }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds

        return () => clearInterval(captureInterval);
    }, []);

    return (
        <div>
            <PhotoCapture capture={capture} />
        </div>
    );
}

export default AutoCapture;
