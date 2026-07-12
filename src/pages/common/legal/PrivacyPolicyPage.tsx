import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import TOC from "@/components/scroll/TOC";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import markdown from "@/md/legal/privacy-policy/common.md?raw";
import { extractHeadings } from '@/shared/helper/extractTocHeadings';

const PrivacyPolicyPage = () => {

    const headings = extractHeadings(markdown);

    return (
       <section className="w-full py-20">
            <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-[minmax(0,1fr)_260px]">
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
            </div>
        </section>
    );
}

export default PrivacyPolicyPage;
