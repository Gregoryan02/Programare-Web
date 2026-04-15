import {useState} from 'react';
import { useEffect } from 'react';

function Clock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return <div>
        <p>{time.toLocaleTimeString()}</p>
        </div>;
}
export default Clock;