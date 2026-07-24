import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { blogCTAItems, redirectPaths } from "@/shared/utils/constants";

const BlogCTA = () => {

    const navigate = useNavigate();

    return (
        <section id="cta" className="px-6 pb-24">
            <div className="mx-auto max-w-7xl relative overflow-hidden rounded-[40px] border bg-gradient-to-br from-primary/10 via-background to-primary/5">
                <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="relative grid gap-16 px-10 py-16 lg:grid-cols-2 lg:px-16">
                    <div>
                        <Badge className="mb-6">
                            Built for Appointment-Based Businesses
                        </Badge>
                        <h2 className="text-5xl font-black leading-tight">
                            Ready to simplify your booking experience?
                        </h2>
                        <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
                            SlotFlow helps service businesses automate scheduling,
                            reduce no-shows, manage staff calendars,
                            and deliver a better customer experience.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Button size="lg" onClick={() => navigate(redirectPaths.REGISTER)}>
                                Start for Free
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        {blogCTAItems.map((item) => (
                            <Card
                                key={item.title}
                                className="rounded-3xl p-8 text-center transition hover:shadow-lg"
                            >
                                <h2 className="text-4xl font-black">
                                    {item.title}
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    {item.subTitle}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogCTA;