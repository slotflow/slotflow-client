import { useState } from "react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import TOC from "@/components/scroll/TOC";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import userMarkdown from "@/md/legal/terms-of-service/user.md?raw";
import { extractHeadings } from "@/shared/helper/extractTocHeadings";
import commonMarkdown from "@/md/legal/terms-of-service/common.md?raw";
import providerMarkdown from "@/md/legal/terms-of-service/provider.md?raw";

const TermsOfServicePage = () => {

    const [role, setRole] = useState<"user" | "provider">("provider");

    const markdown = role === "provider" ? `${providerMarkdown}\n\n${commonMarkdown}` : `${userMarkdown}\n\n${commonMarkdown}`;

    const headings = extractHeadings(markdown);

    return (
        <section className="w-full py-20">
            <div className="max-w-7xl mx-auto mb-4">
                <Tabs
                    value={role}
                    onValueChange={(value) =>
                        setRole(value as "user" | "provider")
                    }
                >
                    <TabsList>
                        <TabsTrigger value="user" className="cursor-pointer">
                            Users
                        </TabsTrigger>

                        <TabsTrigger value="provider" className="cursor-pointer">
                            Service Providers
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-[minmax(0,1fr)_260px]">
                <article
                    className="
                        prose
                        prose-neutral
                        dark:prose-invert
                        max-w-none
                    "
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
};

export default TermsOfServicePage;