import { useEffect, useRef, useState } from "react";

export default function LoadingPage({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [flipOut, setFlipOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnd = () => {
      setFlipOut(true); // Trigger the flip-down animation
      setTimeout(onLoadingComplete, 1000); // Transition to home page after animation
    };

    if (video) {
      video.play();
      video.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`h-screen w-full flex items-center justify-center transition-transform duration-1000 ${
        flipOut ? "flip-down" : ""
      }`}
    >
      <video ref={videoRef} className="w-screen h-auto" muted>
        <source src="/video/welcome.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
