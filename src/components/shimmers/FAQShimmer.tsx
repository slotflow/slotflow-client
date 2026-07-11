interface FAQSectionProps {
    rows: number;
}

const FAQShimmer = ({
rows
}: FAQSectionProps) => {
    return (
        <div className="flex flex-col space-y-2 mt-10 max-w-5xl mx-auto">
            {Array.from({ length: rows }).map((_, index) => (
                    <div key={index} className="shimmer w-full h-12 rounded-md" />
                ))}
        </div>
    )
}

export default FAQShimmer;