import service from '@/assets/svgs/service.svg';
import booking from '@/assets/svgs/booking.svg';
import SideBox from "@/components/navs/SideBox";

const RoleSelectPage = () => {

    const handleRoleSelect = () => {

    }

    return (
        <div className="md:h-screen md:flex justify-center w-full bg-[var(--background)]">
            <SideBox pageNumber={0} />
            <div className="w-full md:w-8/12 md:px-10 overflow-y-scroll no-scrollbar flex justify-center items-center">
                <div onClick={(e) => e.stopPropagation()} className="bg-[var(--background)] p-6 rounded-2xl w-[90%] max-w-3xl text-center" >
                <h4 className="xs:text-md md:text-xl lg:text-2xl font-semibold text-start py-6">How you want to get started on Slotflow ? </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleRoleSelect();
                                }
                            }}
                            role="button"
                            onClick={handleRoleSelect}
                            className="cursor-pointer flex flex-col items-center justify-center rounded-2xl border p-6 h-64 hover:border-[var(--mainColor)] hover:shadow-xl transition-all duration-300"
                        >
                            <img
                                src={booking}
                                alt="Book Appointment"
                                className="h-24 w-24 mb-4 transition-transform group-hover:scale-110"
                            />
                            <h3 className="text-lg font-semibold">
                                Book an Appointment
                            </h3>
                            <p className="text-sm mt-2">
                                Schedule a service or consultation.
                            </p>
                        </div>

                        <div
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleRoleSelect();
                                }
                            }}
                            role="button"
                            onClick={handleRoleSelect}
                            className="cursor-pointer flex flex-col items-center justify-center rounded-2xl border p-6 h-64 hover:border-[var(--mainColor)] hover:shadow-xl transition-all duration-300"
                        >
                            <img
                                src={service}
                                alt="Provide Service"
                                className="h-24 w-24 mb-4 transition-transform group-hover:scale-110"
                            />
                            <h3 className="text-lg font-semibold">
                                Provide Service
                            </h3>
                            <p className="text-sm mt-2">
                                List your services and manage bookings.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectPage;