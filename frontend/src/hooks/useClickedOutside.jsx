import React, { useEffect, useState } from "react";

function useClickedOutside(ref) {
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        const checkClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setFocused(false);
            }
        };
        document.addEventListener("mousedown", checkClick);
        return () => {
            document.removeEventListener("mousedown", checkClick);
        };
    }, [ref]);

    return { focused, setFocused };
}

export default useClickedOutside;
