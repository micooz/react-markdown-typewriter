import { motion, Variants } from "motion/react";
import { useMemo } from "react";
import Markdown from "react-markdown";
import markdownComponents from "../functions/markdownComponents";
import { MarkdownTypewriterProps } from "../interfaces";

const text = `# Markdown Test

Hello, this is a test of the markdown parser. Pixi'VN does not manage markdown, but you can implement a markdown parser to display text with markdown syntax.

For example in React, you can use the library [react-markdown](https://www.npmjs.com/package/react-markdown).

## Colored Text

<span style="color:blue">some *blue* text</span>.

<span style="color:red">some *red* text</span>.

<span style="color:green">some *green* text</span>.

## Bold Text

**This is bold text.**

## Italic Text

*This is italic text.*

## Delete Text

~~This is deleted text.~~

## Link Test

[Link to Google](https://www.google.com)

## H2 Test

### H3 Test

#### H4 Test

## Code Test

\`Hello World\`

\`\`\`js
console.log("Hello World")
\`\`\`

## List Test

- Item 1

- Item 2

- [x] Item 3

## Table Test

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

## Image Test

![Image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkw_mXXQ9FJ9HgmW_B9QMv-gvOmndUaEI9SA&s)

`;

export default function MarkdownTypewriter(props: MarkdownTypewriterProps) {
    const { delay = 10, children: text, motionProps = {}, components: externalComponents, ...rest } = props;
    const {
        characterVariants: letterVariantsProp = {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
        },
        onCharacterAnimationComplete,
        ...restMotionProps
    } = motionProps;
    const sentenceVariants = useMemo<Variants>(
        () => ({
            hidden: {},
            visible: { opacity: 1, transition: { staggerChildren: delay / 1000 } },
        }),
        [delay]
    );
    const characterVariants = useMemo<Variants>(() => letterVariantsProp, [delay]);
    const components = useMemo(
        () =>
            markdownComponents({
                characterVariants,
                onCharacterAnimationComplete,
                delay,
            }),
        [delay, characterVariants, onCharacterAnimationComplete]
    );

    return (
        <motion.span
            key={`typewriter-internal-${text}`}
            variants={sentenceVariants}
            initial='hidden'
            animate={"visible"}
            {...restMotionProps}
        >
            <Markdown
                {...rest}
                components={{
                    ...components,
                    ...externalComponents,
                }}
            >
                {text}
            </Markdown>
        </motion.span>
    );
}
