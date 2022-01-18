let windowMatchMedia = window.matchMedia;
window.matchMedia = (mediaQueryString) => {
    let wmm = windowMatchMedia(mediaQueryString);
    if (!wmm.addEventListener) {
        wmm.addEventListener = <K extends 'change'>(
            type: K,
            listener: (this: any, ev: MediaQueryListEventMap[K]) => any
        ) => {
            wmm.addListener(listener);
        };
        wmm.removeEventListener = <K extends 'change'>(
            type: K,
            listener: (this: any, ev: MediaQueryListEventMap[K]) => any
        ) => {
            wmm.removeListener(listener);
        };
    }
    return wmm;
};
