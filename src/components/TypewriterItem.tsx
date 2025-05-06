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
// TODO: check if exists a library for this
function isEmoji(str: string) {
    const emojiRegex = /([\u203C-\u3299]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2600-\u26FF]|[\u2700-\u27BF])/g;
    return emojiRegex.test(str);
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
        // check if is emoji
        if (isEmoji(children)) {
            const ref = useRef<HTMLSpanElement>(null);
            const onAnimationComplete = onCharacterAnimationComplete
                ? throttle(() => onCharacterAnimationComplete(ref), 10)
                : undefined;
            const component = (
                <motion.span
                    ref={ref}
                    className={className}
                    key={`span-${key}-${children}`}
                    variants={characterVariants}
                    onAnimationComplete={onAnimationComplete}
                >
                    {children}
                </motion.span>
            );
            return dadElement(component, true);
        }
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
