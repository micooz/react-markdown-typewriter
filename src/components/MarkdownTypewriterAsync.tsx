import { motion } from "motion/react";
import { MarkdownAsync } from "react-markdown";
import typewriterHook from "../functions/typewriterHook";
import { MarkdownTypewriterProps } from "../interfaces";

export default function MarkdownTypewriterAsync(props: MarkdownTypewriterProps) {
    const { delay = 10, children: text, motionProps = {}, components: externalComponents, ...rest } = props;
    const { characterVariants, onCharacterAnimationComplete, ...restMotionProps } = motionProps;
    const { sentenceVariants, components } = typewriterHook({
        delay,
        characterVariants,
        onCharacterAnimationComplete,
    });

    return (
        <motion.span
            key={`typewriter-internal-${text}`}
            variants={sentenceVariants}
            initial='hidden'
            animate={"visible"}
            {...restMotionProps}
        >
            <MarkdownAsync
                {...rest}
                components={{
                    ...components,
                    ...externalComponents,
                }}
            >
                {text}
            </MarkdownAsync>
        </motion.span>
    );
}
