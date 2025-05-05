import { motion, Variants } from "motion/react";
import { Key, ReactElement, RefObject, useRef } from "react";

function throttle(func: (...args: any[]) => void, limit: number) {
    let lastCall = 0;
    return (...args: any[]) => {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            func(...args);
        }
    };
}

export default function TypewriterItem({
    children,
    className,
    characterVariants,
    dadElement,
    onCharacterAnimationComplete,
    key,
}: {
    children: any;
    className?: string;
    characterVariants: Variants;
    dadElement: (children: ReactElement | ReactElement[], isString?: boolean) => ReactElement | ReactElement[];
    onCharacterAnimationComplete?: (letterRef: RefObject<HTMLSpanElement | null>) => void;
    key?: Key | null | undefined;
}) {
    if (typeof children === "string") {
        const spanList = children.split("").map((char, i) => {
            const ref = useRef<HTMLSpanElement>(null);
            const onAnimationComplete = onCharacterAnimationComplete
                ? throttle(() => onCharacterAnimationComplete(ref), 10)
                : undefined;

            return (
                <motion.span
                    ref={ref}
                    className={className}
                    key={`span-${key}-${char}-${i}`}
                    variants={characterVariants}
                    onAnimationComplete={onAnimationComplete}
                >
                    {char}
                </motion.span>
            );
        });
        return dadElement(spanList, true);
    } else if (Array.isArray(children)) {
        const list = children.map((child) => {
            if (typeof child === "string") {
                let spanList = child.split("").map((char, i) => {
                    const ref = useRef<HTMLSpanElement>(null);
                    const onAnimationComplete = onCharacterAnimationComplete
                        ? throttle(() => onCharacterAnimationComplete(ref), 10)
                        : undefined;
                    return (
                        <motion.span
                            ref={ref}
                            className={className}
                            key={`span-${key}-${char}-${i}`}
                            variants={characterVariants}
                            onAnimationComplete={onAnimationComplete}
                        >
                            {char}
                        </motion.span>
                    );
                });
                return spanList;
            }
            return child;
        });
        return dadElement(list);
    }
    return dadElement(children, true);
}
