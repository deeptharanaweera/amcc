import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import EventItem from "./EventItems";

export default function Home_UpcomingEvent() {
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: { items: 2 },
    720: { items: 2 },
    1024: { items: 3 },
  };

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);

  const syncActiveIndex = (e) => setActiveIndex(e.item);

  const events = [
    <EventItem src="/image/sportmeet.jpeg" alt="Item 1" title="Sport meet 2024" dataValue="1" />,
    <EventItem src="/image/maxresdefault.jpg" alt="Item 2" title="Dancing Competition " dataValue="2" />,
    <EventItem src="/image/text_exibition.jpg" alt="Item 3" title="Tech Exibition 2024" dataValue="3" />,
  ];

  return (
    <div className="flex flex-col justify-start items-start lg:w-2/3 w-screen h-auto lg:px-0 px-2">
      <div className="text-white flex items-center w-full justify-between">
        <div className="flex flex-col items-center">
        <h1 className="lg:text-4xl text-2xl font-bold">Upcoming Event</h1>
        <hr className="lg:w-52 w-32 h-1 bg-white border-0 rounded lg:mt-3 mt-1" />
        </div>
        <button className="flex justify-center text-sm lg:text-xl items-center gap-2 font-semibold border  rounded-md px-2 py-1">
          View all events <MdKeyboardDoubleArrowRight />
        </button>
      </div>
      <div className="lg:w-full w-full flex lg:py-10 py-5">
        <AliceCarousel
          autoPlay
          autoPlayStrategy="none"
          autoPlayInterval={1000}
          animationDuration={1000}
          animationType="fadeout"
          infinite
          touchTracking={false}
          disableDotsControls
          disableButtonsControls
          items={events}
          responsive={responsive}
          activeIndex={activeIndex}
          onSlideChange={syncActiveIndex}
        />
      </div>
    </div>
  );
}
