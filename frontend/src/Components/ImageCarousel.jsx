import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 32;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function FolderImages({
    items,
    baseWidth = 500,
    autoplay = true,
    autoplayDelay = 2000,
    pauseOnHover = true,
    loop = true,
    round = false,
}) {
    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const itemHeight = itemWidth - 20;
    const trackItemOffset = itemWidth + GAP;

    const carouselItems = loop ? [...items, items[0]] : items;
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const containerRef = useRef(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (autoplay && (!pauseOnHover || !isHovered)) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => {
                    if (prev === items.length - 1 && loop) {
                        return prev + 1;
                    }
                    if (prev === carouselItems.length - 1) {
                        return loop ? 0 : prev;
                    }
                    return prev + 1;
                });
            }, autoplayDelay);
            return () => clearInterval(timer);
        }
    }, [
        autoplay,
        autoplayDelay,
        isHovered,
        loop,
        items.length,
        carouselItems.length,
        pauseOnHover,
    ]);

    const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationComplete = () => {
        if (loop && currentIndex === carouselItems.length - 1) {
            setIsResetting(true);
            x.set(0);
            setCurrentIndex(0);
            setTimeout(() => setIsResetting(false), 50);
        }
    };

    const handleDragEnd = (_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
            if (loop && currentIndex === items.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setCurrentIndex((prev) =>
                    Math.min(prev + 1, carouselItems.length - 1)
                );
            }
        } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            if (loop && currentIndex === 0) {
                setCurrentIndex(items.length - 1);
            } else {
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }
        }
    };

    const dragProps = loop
        ? {}
        : {
              dragConstraints: {
                  left: -trackItemOffset * (carouselItems.length - 1),
                  right: 0,
              },
          };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden p-4 rounded-[12px]  bg-transparent `}
            style={{
                width: `${baseWidth}px`,
                height: `${baseWidth}px`,
                minWidth: "100px",
                minHeight: "100px",
            }}
        >
            <motion.div
                className="flex"
                drag="x"
                {...dragProps}
                style={{
                    width: itemWidth,
                    gap: `${GAP}px`,
                    perspective: 1000,
                    perspectiveOrigin: `${
                        currentIndex * trackItemOffset + itemWidth / 2
                    }px 50%`,
                    x,
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(currentIndex * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationComplete={handleAnimationComplete}
            >
                {carouselItems.map((item, index) => {
                    const range = [
                        -(index + 1) * trackItemOffset,
                        -index * trackItemOffset,
                        -(index - 1) * trackItemOffset,
                    ];
                    const outputRange = [20, 0, -20];
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const rotateY = useTransform(x, range, outputRange, {
                        clamp: false,
                    });
                    return (
                        <motion.div
                            key={index}
                            className={`relative shrink-0 flex  justify-center rounded-[12px]
                             overflow-hidden cursor-grab active:cursor-grabbing bg-transparent`}
                            style={{
                                width: itemWidth,
                                height: itemHeight,
                                rotateY: rotateY,
                            }}
                            transition={effectiveTransition}
                        >
                            <div className={`flex justify-center`}>
                                <img
                                    src={item}
                                    draggable={false}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
            <div className={`flex w-full justify-center `}>
                <div className="mt-4 flex w-[150px] justify-between px-1 mx-4 ">
                    {items.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`h-3 w-3 rounded-full cursor-pointer transition-colors duration-150 ${
                                currentIndex % items.length === index
                                    ? round
                                        ? "bg-white"
                                        : "bg-[#333333]"
                                    : round
                                    ? "bg-[#555]"
                                    : "bg-[rgba(51,51,51,0.4)]"
                            }`}
                            animate={{
                                scale:
                                    currentIndex % items.length === index
                                        ? 1.2
                                        : 1,
                            }}
                            onClick={() => setCurrentIndex(index)}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
