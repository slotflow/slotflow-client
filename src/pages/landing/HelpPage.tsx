import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import TOC from "@/components/scroll/TOC";
import ReactMarkdown from "react-markdown";
import markdown from "@/md/contact/help.md?raw";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { extractHeadings } from '@/shared/helper/extractTocHeadings';

const HelpPage = () => {

    const headings = extractHeadings(markdown);

    return (
        <main className="w-full py-20">
            <section className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-[minmax(0,1fr)_260px]">
                <article
                    className="
                                prose
                                prose-neutral
                                dark:prose-invert
                                max-w-none"
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[
                            rehypeSlug,
                            [
                                rehypeAutolinkHeadings,
                                {
                                    behavior: "append",
                                },
                            ],
                        ]}
                    >
                        {markdown}
                    </ReactMarkdown>
                </article>
                <TOC headings={headings} />
            </section>
        </main>
    )
}

export default HelpPage;