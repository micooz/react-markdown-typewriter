import { motion } from "motion/react";
import { MarkdownHooks } from "react-markdown";
import typewriterHook from "../functions/typewriterHook";
import { MarkdownTypewriterHooksProps } from "../interfaces/MarkdownTypewriterProps";

export default function MarkdownTypewriterHooks(props: MarkdownTypewriterHooksProps) {
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
            <MarkdownHooks
                {...rest}
                components={{
                    ...components,
                    ...externalComponents,
                }}
            >
                {text}
            </MarkdownHooks>
        </motion.span>
    );
}
