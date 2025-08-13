import React, { useEffect, useRef, useState } from "react";

const HANDLE_WIDTH = 6;

// media hook so we only apply fixed widths at md+; on small screens we stack
function useMedia(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export default function SplitPane({
  initialLeft = 520,
  leftMin = 320,
  rightMin = 320,
  className = "",
  left,
  right,
}) {
  const isMdUp = useMedia("(min-width: 768px)");
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(initialLeft);
  const dragRef = useRef({ startX: 0, startLeft: initialLeft });
  const [dragging, setDragging] = useState(false);

  const clampLeft = (w) => {
    const containerWidth =
      containerRef.current?.getBoundingClientRect().width ?? 0;
    const maxLeft = Math.max(leftMin, containerWidth - rightMin - HANDLE_WIDTH);
    return Math.max(leftMin, Math.min(w, maxLeft));
  };

  const onPointerDown = (e) => {
    dragRef.current = { startX: e.clientX, startLeft: leftWidth };
    setDragging(true);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e) => {
    const dx = e.clientX - dragRef.current.startX;
    setLeftWidth(clampLeft(dragRef.current.startLeft + dx));
  };

  const onPointerUp = () => {
    setDragging(false);
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  };

  // Re-clamp when the window resizes
  useEffect(() => {
    const onResize = () => setLeftWidth((w) => clampLeft(w));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={`h-full flex flex-col md:flex-row ${className}`}
    >
      {/* Left pane (checkout) */}
      <div
        className={`w-full md:shrink-0`}
        style={isMdUp ? { width: leftWidth } : undefined}
      >
        {left}
      </div>

      {/* Handle (only on md+) */}
      <div className="hidden md:block shrink-0" style={{ width: HANDLE_WIDTH }}>
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panels"
          className={`h-full w-full cursor-col-resize ${
            dragging ? "bg-blue-400" : "bg-gray-200 hover:bg-blue-400"
          }`}
          onPointerDown={onPointerDown}
        />
      </div>

      {/* Right pane (cart) */}
      <div className="flex-1">{right}</div>
    </div>
  );
}
