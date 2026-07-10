import {
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { footerLinks } from "@/shared/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/common/SectionHeading";

const LegalHomePage = () => {
    return (
        <section className="container max-w-7xl mx-auto py-20">
            <SectionHeading
                heading="Legal Center"
                headingDescription="Everything you need to know about using SlotFlow. Browse our
                    policies, terms, and legal documents."
            />

            <div className="mt-14 grid gap-6 md:grid-cols-2">
                {footerLinks.legal.map((page) => {
                    const Icon = page.icon;
                    return (
                        <Card
                            key={page.name}
                            className="group transition-all hover:shadow-md hover:border-primary/40"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="rounded-lg border p-3">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </div>
                                <h2 className="mt-6 text-xl font-semibold">
                                    {page.name}
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    {page.description}
                                </p>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="mt-6 px-0"
                                >
                                    <Link to={page.href}>
                                        Read document
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}

export default LegalHomePage;