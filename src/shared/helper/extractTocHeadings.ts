import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import { TOCHeadingProps } from "../interface/commonInterface";

const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

export function extractHeadings(markdown: string): TOCHeadingProps[] {
    const tree = unified()
        .use(remarkParse)
        .parse(markdown);

    const headings: TOCHeadingProps[] = [];
    const stack: TOCHeadingProps[] = [];

    visit(tree, "heading", (node: any) => {
        const text = node.children
            .filter((child: any) => child.type === "text")
            .map((child: any) => child.value)
            .join("");

        const heading: TOCHeadingProps = {
            depth: node.depth,
            title: text,
            id: slugify(text),
            children: [],
        };

        while (
            stack.length &&
            stack[stack.length - 1].depth >= heading.depth
        ) {
            stack.pop();
        }

        if (stack.length === 0) {
            headings.push(heading);
        } else {
            stack[stack.length - 1].children!.push(heading);
        }

        stack.push(heading);
    });

    return headings;
}