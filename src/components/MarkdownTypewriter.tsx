import { motion, Variants } from "motion/react";
import { useMemo } from "react";
import Markdown from "react-markdown";
import { MarkdownTypewriterProps } from "../interfaces";

export default function MarkdownTypewriter(
    props: MarkdownTypewriterProps
) {
    const {
        delay = 0,
        scrollRef,
        children: text,
        motionProps = {},
        letterVariants: letterVariantsProp = {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
        },
        ...rest
    } = props;
    const sentenceVariants = useMemo<Variants>(
        () => ({
            hidden: {},
            visible: { opacity: 1, transition: { staggerChildren: delay / 1000 } },
        }),
        [delay]
    );
    const letterVariants = useMemo<Variants>(() => letterVariantsProp, [delay]);
    const components = useMemo(
        () =>
            MarkdownTypewriterComponents({
                letterVariants,
                scrollRef,
            }),
        [letterVariants, scrollRef]
    );

    return (
        <motion.span
            key={`typewriter-internal-${text}`}
            variants={sentenceVariants}
            initial='hidden'
            animate={"visible"}
            {...motionProps}
        >
            <Markdown {...rest} components={components}>
                {text}
            </Markdown>
        </motion.span>
    );
}
