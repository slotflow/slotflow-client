import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { Card, CardContent } from "../ui/card";

const BlogNewsletter = () => {

    const [email, setEmail] = useState<string>("");
    const handleBlogSubscribe = async () => {
        try {
            if (!email) {
                toast.error("Please enter your email");
                return;
            }
            toast.success("Subscribed");
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <section id="news-letter" className="py-32">
            <Card className="max-w-7xl mx-auto overflow-hidden rounded-[40px] border bg-gradient-to-br from-primary/10 via-background to-primary/5">
                <CardContent className="px-10 py-20 text-center">
                    <h2 className="mx-auto mt-6 max-w-3xl text-5xl font-bold leading-tight">
                        Stay Updated with Booking Insights
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                        Join thousands of business owners receiving practical guides,
                        product updates, AI scheduling insights, and growth strategies.
                    </p>
                    <div className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">
                        <Input
                            placeholder="Enter your email"
                            className="h-12"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button className="h-12 px-8" onClick={handleBlogSubscribe}>
                            Subscribe
                        </Button>
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground">
                        No spam. Unsubscribe anytime.
                    </p>
                </CardContent>
            </Card>
        </section>
    )
}

export default BlogNewsletter;