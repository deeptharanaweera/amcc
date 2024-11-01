import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useInView } from "react-intersection-observer";

const data = [
    {
        title1: "Acadamics",
        paragraph1: "Designed for those in financial officer leadership positions and CEOs, CAOs, and COOs at ATS schools, this webinar will share findings from the ATS Leadership Study on Financial Leaders in Theological Education.",
        image1: "/image/acadamics.jpg",

        title2: "Sport",
        paragraph2: "Designed for those in financial officer leadership positions and CEOs, CAOs, and COOs at ATS schools, this webinar will share findings from the ATS Leadership Study on Financial Leaders in Theological Education.",
        image2: "/image/sport.jpeg",
    },
    {
        title1: "Clubs & Societies",
        paragraph1: "Designed for those in financial officer leadership positions and CEOs, CAOs, and COOs at ATS schools, this webinar will share findings from the ATS Leadership Study on Financial Leaders in Theological Education.",
        image1: "/image/text_exibition.jpg",

        title2: "Cadet",
        paragraph2: "Designed for those in financial officer leadership positions and CEOs, CAOs, and COOs at ATS schools, this webinar will share findings from the ATS Leadership Study on Financial Leaders in Theological Education.",
        image2: "/image/5-1.jpg",
    },
];

export default function Section() {
    // Separate refs for each section
    const { ref: section1Ref, inView: section1InView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const { ref: section2Ref, inView: section2InView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const { ref: section3Ref, inView: section3InView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const { ref: section4Ref, inView: section4InView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    return (
        <>
            {/* First Section */}
            <div ref={section1Ref}
                className={`flex flex-col items-center justify-center lg:py-10 p-5 lg:gap-20 gap-10 w-screen  ${
                    section1InView
                        ? "animate-fade animate-once animate-duration-[1000ms] animate-ease-linear animate-normal"
                        : ""
                }`}
            >
                <div className="flex justify-between items-center lg:w-2/3 w-screen lg:h-[60vh] h-72 px-3">
                    <div className="flex flex-col justify-center items-center w-1/2 h-full">
                        <div className="flex flex-col justify-center items-start lg:w-2/3 h-full lg:gap-10 gap-5">
                            <div className="flex flex-col items-center">
                                <h1 className="lg:text-5xl text-xl font-bold">{data[0].title1}</h1>
                                <hr className="lg:w-20 w-10 h-1 bg-black border-0 rounded lg:mt-3 mt-1" />
                            </div>
                            <p className="lg:text-2xl text-sm">{data[0].paragraph1}</p>
                            <button className="flex justify-center text-sm lg:text-xl items-center gap-2 font-semibold border border-black rounded-md px-2 py-1">
                                see more <MdKeyboardDoubleArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2 h-full overflow-hidden object-contain flex items-end lg:justify-center justify-end">
                        <img
                            src={data[0].image1}
                            alt=""
                            className="h-full lg:w-2/3 shadow-md w-40 lg:rounded-tl-[110px] object-cover lg:rounded-bl-[10px] lg:rounded-tr-[10px] lg:rounded-br-[110px] rounded-tl-[50px] rounded-bl-[5px] rounded-tr-[5px] rounded-br-[50px]"
                        />
                    </div>
                </div>
            </div>

            {/* Second Section */}
            <div ref={section2Ref}
                className={`flex flex-col items-center justify-center lg:py-10 p-5 lg:gap-20 gap-10 w-screen  ${
                    section2InView
                        ? "animate-fade animate-once animate-duration-[1000ms] animate-ease-linear animate-normal"
                        : "translate-y-[50px] opacity-0"
                }`}
            >
                <div className="flex justify-between items-center lg:w-2/3 w-screen lg:h-[60vh] h-72 px-3">
                    <div className="w-1/2 h-full flex overflow-hidden object-contain lg:justify-center justify-start">
                        <img
                            src={data[0].image2}
                            alt=""
                            className="h-full lg:w-2/3 shadow-md w-40 object-cover lg:rounded-tl-[110px] lg:rounded-bl-[10px] lg:rounded-tr-[10px] lg:rounded-br-[110px] rounded-tl-[50px] rounded-bl-[5px] rounded-tr-[5px] rounded-br-[50px]"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/2 h-full">
                        <div className="flex flex-col justify-center items-start lg:w-2/3 h-full lg:gap-10 gap-5">
                            <div className="flex flex-col items-center">
                                <h1 className="lg:text-5xl text-xl font-bold">{data[0].title2}</h1>
                                <hr className="lg:w-20 w-10 h-1 bg-black border-0 rounded lg:mt-3 mt-1" />
                            </div>
                            <p className="lg:text-2xl text-sm">{data[0].paragraph2}</p>
                            <button className="flex justify-center text-sm lg:text-xl items-center gap-2 font-semibold border border-black rounded-md px-2 py-1">
                                see more <MdKeyboardDoubleArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Section */}
            <div ref={section3Ref}
                className={`flex flex-col items-center justify-center lg:py-10 p-5 lg:gap-20 gap-10 w-screen  ${
                    section3InView
                        ? "animate-fade animate-once animate-duration-[1000ms] animate-ease-linear animate-normal"
                        : "translate-y-[50px] opacity-0"
                }`}
            >
                <div className="flex justify-between items-center lg:w-2/3 w-screen lg:h-[60vh] h-72 px-3">
                    <div className="flex flex-col justify-center items-center w-1/2 h-full">
                        <div className="flex flex-col justify-center items-start lg:w-2/3 h-full lg:gap-10 gap-5">
                            <div className="flex flex-col items-center">
                                <h1 className="lg:text-5xl text-xl font-bold">{data[1].title1}</h1>
                                <hr className="lg:w-20 w-10 h-1 bg-black border-0 rounded lg:mt-3 mt-1" />
                            </div>
                            <p className="lg:text-2xl text-sm">{data[1].paragraph1}</p>
                            <button className="flex justify-center text-sm lg:text-xl items-center gap-2 font-semibold border border-black rounded-md px-2 py-1">
                                see more <MdKeyboardDoubleArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2 h-full overflow-hidden object-contain flex items-end lg:justify-center justify-end">
                        <img
                            src={data[1].image1}
                            alt=""
                            className="h-full lg:w-2/3 w-40 shadow-md lg:rounded-tl-[110px] object-cover lg:rounded-bl-[10px] lg:rounded-tr-[10px] lg:rounded-br-[110px] rounded-tl-[50px] rounded-bl-[5px] rounded-tr-[5px] rounded-br-[50px]"
                        />
                    </div>
                </div>
            </div>

            {/* Fourth Section */}
            <div ref={section4Ref}
                className={`flex flex-col items-center justify-center lg:py-10 p-5 lg:gap-20 gap-10 w-screen  ${
                    section4InView
                        ? "animate-fade animate-once animate-duration-[1000ms] animate-ease-linear animate-normal"
                        : "translate-y-[50px] opacity-0"
                }`}
            >
                <div className="flex justify-between items-center lg:w-2/3 w-screen lg:h-[60vh] h-72 px-3">
                    <div className="w-1/2 h-full flex overflow-hidden object-contain lg:justify-center justify-start">
                        <img
                            src={data[1].image2}
                            alt=""
                            className="h-full lg:w-2/3 w-40 shadow-md object-cover lg:rounded-tl-[110px] lg:rounded-bl-[10px] lg:rounded-tr-[10px] lg:rounded-br-[110px] rounded-tl-[50px] rounded-bl-[5px] rounded-tr-[5px] rounded-br-[50px]"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/2 h-full">
                        <div className="flex flex-col justify-center items-start lg:w-2/3 h-full lg:gap-10 gap-5">
                            <div className="flex flex-col items-center">
                                <h1 className="lg:text-5xl text-xl font-bold">{data[1].title2}</h1>
                                <hr className="lg:w-20 w-10 h-1 bg-black border-0 rounded lg:mt-3 mt-1" />
                            </div>
                            <p className="lg:text-2xl text-sm">{data[1].paragraph2}</p>
                            <button className="flex justify-center text-sm lg:text-xl items-center gap-2 font-semibold border border-black rounded-md px-2 py-1">
                                see more <MdKeyboardDoubleArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
