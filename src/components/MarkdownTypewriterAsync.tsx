import { motion } from "motion/react";
import { MarkdownAsync } from "react-markdown";
import typewriterHook from "../functions/typewriterHook";
import { MarkdownTypewriterProps } from "../interfaces";

export default async function MarkdownTypewriterAsync(props: MarkdownTypewriterProps) {
    const { delay = 10, children: text, motionProps = {}, components: externalComponents, ...rest } = props;
    const { characterVariants, onCharacterAnimationComplete, ...restMotionProps } = motionProps;
    const { sentenceVariants, components } = typewriterHook({
        delay,
        characterVariants,
        onCharacterAnimationComplete,
    });

    const markdown = MarkdownAsync({
        ...rest,
        components: {
            ...components,
            ...externalComponents,
        },
        children: text,
    });

    return (
        <motion.span
            key={`typewriter-internal-${text}`}
            variants={sentenceVariants}
            initial='hidden'
            animate={"visible"}
            {...restMotionProps}
        >
            {markdown}
        </motion.span>
    );
}
