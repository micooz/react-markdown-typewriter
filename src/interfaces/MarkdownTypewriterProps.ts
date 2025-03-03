import { HTMLMotionProps, Variants } from "motion/react";
import { RefObject } from "react";
import { Options } from "react-markdown";

export default interface MarkdownTypewriterProps extends Omit<Options, "components"> {
    delay?: number;
    scrollRef?: RefObject<HTMLDivElement | null>;
    motionProps?: Omit<HTMLMotionProps<"span">, "variants"> & {
        letterVariants?: Variants;
    };
}
