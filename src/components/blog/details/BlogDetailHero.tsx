import { motion } from "framer-motion"
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { CalendarDays, Clock3 } from "lucide-react";
import { formateDate } from "@/shared/helper/formatter";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { BlogAuthorFields } from "@/shared/interface/commonInterface";

interface BlogDetailHeroProps {
    heroBackground: string;
    category: string | null;
    title: string;
    description: string;
    author: BlogAuthorFields | null;
    createdAt: string;
    readTime: string;
}

const BlogDetailHero: React.FC<BlogDetailHeroProps> = ({
    author,
    category,
    createdAt,
    description,
    heroBackground,
    readTime,
    title
}) => {
    return (
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
            <img
                src={heroBackground}
                alt="Hero background"
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className=" absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="container relative mx-auto flex h-full items-end px-6 pb-16 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .6 }}
                    className="max-w-4xl"
                >
                    <Badge className="rounded-full px-4 py-1">
                        {category}
                    </Badge>
                    <h1 title={title} className="line-clamp-2 mt-6 text-5xl font-black leading-tight lg:text-7xl">
                        {title}
                    </h1>
                    <p title={description} className="line-clamp-2 mt-8 max-w-3xl text-lg leading-8 dark:text-white/60 text-black/60">
                        {description}
                    </p>
                    <div className="mt-10 flex flex-wrap items-center gap-8">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={author?.profileImage} />
                                <AvatarFallback>
                                    {author?.author.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-semibold">
                                    {author?.author}
                                </h4>
                                <p className="text-sm dark:text-white/70 text-black/70">
                                    {author?.proffession}
                                </p>
                            </div>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="hidden h-10 bg-white/20 lg:block"
                        />
                        <div className="flex items-center gap-3 dark:text-white/80 text-black/80">
                            <CalendarDays className="h-5 w-5" />
                            <span>
                                {formateDate(new Date(createdAt))}
                            </span>
                        </div>
                        <Separator
                            orientation="vertical"
                            className="hidden h-10 bg-white/20 lg:block"
                        />
                        <div className="flex items-center gap-3 dark:text-white/80 text-black/80">
                            <Clock3 className="h-5 w-5" />
                            <span>
                                {readTime}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default BlogDetailHero;