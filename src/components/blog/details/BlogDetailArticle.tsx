import React from "react";
import TOC from "@/components/scroll/TOC";
import { BlogArticle } from "@/shared/interface/commonInterface";

interface BlogDetailArticleProps {
    article: BlogArticle;
}

const BlogDetailArticle: React.FC<BlogDetailArticleProps> = ({
    article
}) => {

    return (
        <section className="container mx-auto px-6 py-20">
            <div className="grid gap-20 lg:grid-cols-[minmax(0,1fr)_220px]">
                <article className="mx-auto max-w-4xl">
                    <section id="article-title">

                        <p className="text-2xl leading-10 text-foreground font-medium">
                            {article.articleTitle}
                        </p>
                        <div className="my-14">
                            <img
                                src={article.articleImage}
                                className="w-full rounded-3xl object-cover shadow-xl"
                            />
                            <p className="mt-4 text-center text-sm text-muted-foreground">
                                {article.articleImageDescription}
                            </p>
                        </div>
                    </section>
                    <section id="article-introduction" className="scroll-mt-28">
                        <h2 className="text-4xl font-bold tracking-tight">
                            Introduction
                        </h2>
                        <div className="mt-6 space-y-6 text-lg leading-9 text-muted-foreground">
                            <p>
                                {article.introduction}
                            </p>
                        </div>
                    </section>
                    <div id="article-protip" className="my-16 rounded-3xl border border-primary/20 bg-primary/5 p-8">
                        <div className="flex gap-5">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Pro Tip
                                </h3>
                                <p className="mt-3 leading-8 text-muted-foreground">
                                    {article.protip}
                                </p>
                            </div>
                        </div>
                    </div>
                    <section
                        id="article-para-1"
                        className="scroll-mt-28 mt-20"
                    >
                        <h2 className="text-4xl font-bold tracking-tight">
                            {article.paraOneTitle}
                        </h2>
                        <div className="mt-6 space-y-6 text-lg leading-9 text-muted-foreground">
                            <p>
                                {article.paraOneContent}
                            </p>
                        </div>
                    </section>
                    <section
                        id="article-para-2"
                        className="scroll-mt-28 mt-20"
                    >
                        <h2 className="text-4xl font-bold tracking-tight">
                            {article.paraTwoTitle}
                        </h2>
                        <div className="mt-6 space-y-6 text-lg leading-9 text-muted-foreground">
                            <p>
                                {article.paraTwoContent}
                            </p>
                        </div>
                    </section>
                    <section
                        id="article-list"
                        className="mt-20 scroll-mt-28"
                    >
                        <h2 className="text-4xl font-bold tracking-tight">
                            {article.listTitle}
                        </h2>
                        <ul className="mt-10 grid gap-1 grid-cols-1">
                            {article?.listContent.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-3xl transition-all hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <h3 className="mt-6 text-xl font-semibold">
                                        {item}
                                    </h3>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <div id="article-quote" className="my-20 rounded-3xl bg-muted/40 p-10">
                        <blockquote className="text-3xl font-semibold leading-relaxed">
                            "{article.quote}"
                        </blockquote>
                        <p className="mt-6 text-muted-foreground">
                            — {article.author?.author ?? "Slotflow Team"}
                        </p>
                    </div>
                    <section
                        id="article-conclusion"
                        className="scroll-mt-28"
                    >
                        <h2 className="text-4xl font-bold tracking-tight">
                            Conclusion
                        </h2>
                        <div className="mt-6 space-y-6 text-lg leading-9 text-muted-foreground">
                            <p>
                                {article.conclusion}
                            </p>
                        </div>
                    </section>
                </article>
                <TOC
                    headings={[
                        {
                            id: "article-title",
                            title: "Title"
                        },
                        {
                            id: "article-introduction",
                            title: "Introduction",
                        },
                        {
                            id: "article-protip",
                            title: "Pro Tip",
                        },
                        {
                            id: "article-para-1",
                            title: article.paraOneTitle,
                        },
                        {
                            id: "article-para-2",
                            title: article.paraTwoTitle,
                        },
                        {
                            id: "article-list",
                            title: article.listTitle
                        },
                        {
                            id: "article-quote",
                            title: "quote"
                        },
                        {
                            id: "article-conclusion",
                            title: "Conclusion",
                        },
                    ]}
                />
            </div>
        </section>
    )
}

export default BlogDetailArticle;