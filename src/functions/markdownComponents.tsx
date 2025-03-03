import htmlTags from "html-tags";
import { ForwardRefComponent, HTMLMotionProps, motion, Variants } from "motion/react";
import { ClassAttributes, ElementType, HTMLAttributes, RefObject } from "react";
import { Components, ExtraProps } from "react-markdown";
import TypewriterItem from "../components/TypewriterItem";

export default function markdownComponents({
    letterVariants,
    scrollRef,
}: {
    letterVariants: Variants;
    scrollRef?: RefObject<HTMLDivElement | null>;
}): Components {
    const scroll = (offsetTop: number) => {
        if (scrollRef && scrollRef.current) {
            let scrollTop = offsetTop - scrollRef.current.clientHeight / 2;
            scrollRef.current.scrollTo({
                top: scrollTop,
                behavior: "auto",
            });
        }
    };
    let res: Components = {};
    htmlTags.forEach((tag) => {
        try {
            let MotionComponent: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<any>> = (motion as any)[tag];
            if (MotionComponent) {
                let fn: ElementType<
                    ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps
                > = (props) => {
                    const { children, id, className } = props;
                    if (tag == "p") {
                        return (
                            <TypewriterItem
                                key={id}
                                children={children}
                                letterVariants={letterVariants}
                                scrollOnLastItem={scroll}
                                dadElement={(children) => {
                                    if (Array.isArray(children)) {
                                        children.push(<motion.span key={`span-${id}`} />);
                                        return children;
                                    }
                                    return children;
                                }}
                            />
                        );
                    }
                    return (
                        <TypewriterItem
                            key={id}
                            children={children}
                            letterVariants={letterVariants}
                            scrollOnLastItem={scroll}
                            dadElement={(children, isString) => {
                                return (
                                    <MotionComponent
                                        {...props}
                                        key={`${tag}-${id}`}
                                        variants={
                                            isString || className
                                                ? undefined
                                                : letterVariants && {
                                                      hidden: letterVariants.hidden,
                                                      visible: {
                                                          ...letterVariants,
                                                          opacity: 1,
                                                          transition: { staggerChildren: 20 / 1000 },
                                                      },
                                                  }
                                        }
                                    >
                                        {children}
                                    </MotionComponent>
                                );
                            }}
                        />
                    );
                };
                (res as any)[tag] = fn;
            }
        } catch (_) {}
    });
    return res;
}
