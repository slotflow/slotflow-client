import React from "react"

const ServiceSelectShimmer: React.FC = () => {

    return (
        <>
            {Array.from({ length: 26 }).map((_, index) => (
                <div
                    key={index}
                    className="h-12 rounded-md shimmer"
                >
                </div>
            ))}
        </>
    )
}

export default ServiceSelectShimmer