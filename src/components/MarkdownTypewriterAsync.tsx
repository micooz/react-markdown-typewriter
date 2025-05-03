import { motion } from "motion/react";
import { useMemo } from "react";
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

    const markdownPromise = useMemo(
        () =>
            MarkdownAsync({
                ...rest,
                components: {
                    ...components,
                    ...externalComponents,
                },
                children: text,
            }),
        [text, components, externalComponents]
    );
    const markdown = await markdownPromise;

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
