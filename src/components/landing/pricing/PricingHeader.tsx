import { Badge } from "../../ui/badge"
import { IndianRupee } from "lucide-react"
import SplitTextReveal from "../../animation/SplitTextReveal"

const PricingHeader = () => {
    return (
        <div className="mx-auto max-w-4xl text-center">
            <Badge
                variant="secondary"
                className="rounded-full border px-4 py-1.5 text-sm font-medium hover:border-[#635bff]"
            >
                <IndianRupee className="mr-2 h-4 w-4 text-primary" />
                Pricing
            </Badge>
            <SplitTextReveal
                as="h2"
                split="lines"
                once={false}
                className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
            >
                Simple <span className="text-[#635bff]">pricing</span> that scales
                <br />
                with your <span className="text-[#635bff]">business.</span>
            </SplitTextReveal>
            <SplitTextReveal
                as="p"
                split="words"
                once={false}
                className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
                Whether you're just getting started or managing thousands of
                bookings every month, choose a plan that grows with you.
            </SplitTextReveal>
        </div>
    )
}

export default PricingHeader;