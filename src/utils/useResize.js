import { useState, useEffect } from 'react';
import {
    SCREEN_SIZE_MIDLE, SCREEN_SIZE_SMALL, SCREEN_SIZE_EXTRA_SMAL
} from './breakpoints';

export const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        width
    };
};