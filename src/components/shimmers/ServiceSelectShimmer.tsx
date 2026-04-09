
const ServiceSelectShimmer = () => {

    return (
        <React.Fragment>
            {Array.from({ length: 26 }).map((_, index) => (
                <div
                    key={index}
                    className="h-12 rounded-md shimmer"
                >
                </div>
            ))}
        </React.Fragment>
    )
}

export default ServiceSelectShimmer