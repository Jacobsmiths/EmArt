import React, { useEffect, useState, useRef } from "react";

function useInView(options, callback) {
    const [inView, setInView] = useState(false);
    const viewRef = useRef(null);

    useEffect(() => {
        if (!viewRef?.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            setInView(entry.isIntersecting);
            callback(entry);
        }, options || { root: null, threshold: 0.45 });

        observer.observe(viewRef.current);

        return () => observer.disconnect();
    }, [viewRef]);

    return [viewRef, inView];
}

export default useInView;
