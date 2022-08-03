import React, { useState, useEffect } from 'react';

const AppContext = React.createContext({
    slideIndex: 0,
    onGoToSlide: (index: number) => {},
    onPrevSlide: () => {},
    onNextSlide: () => {},
});

export const AppContextProvider = (props: any) => {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    
    useEffect(() => {
        const storedSlideIndexStr = localStorage.getItem('slideIndex');
        if (storedSlideIndexStr) {
            const storedSlideIndex = parseInt(storedSlideIndexStr);
            if (storedSlideIndex >= 0) setSlideIndex(storedSlideIndex);
        }
    }, []);

    const prevSlideHandler = () => {
        let index = slideIndex - 1; 
        goToSlideHandler(index);
    }

    const nextSlideHandler = () => {
        let index = slideIndex + 1; 
        goToSlideHandler(index);
    }

    const goToSlideHandler = (index: number) => {
        setSlideIndex(index);
        localStorage.setItem('slideIndex', index.toString());
    }

    return <AppContext.Provider value={{
        slideIndex: slideIndex,
        onGoToSlide: goToSlideHandler,
        onPrevSlide: prevSlideHandler,
        onNextSlide: nextSlideHandler,
    }}>{props.children}</AppContext.Provider>  
};

export default AppContext;