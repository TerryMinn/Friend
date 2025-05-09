import { useProgress } from "@react-three/drei";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Loader2Icon } from "lucide-react";

const LoaderFor3D = () => {
  const { total, loaded } = useProgress();

  useGSAP(() => {
    if (total == 20 && loaded == 20) {
      gsap.to(".loaderfor3D", {
        opacity: 0,
        duration: 1,
        delay: 0.2,
        onComplete: () => {
          gsap.to(".loaderfor3D", {
            display: "none",
          });
        },
      });
    }
  }, [total, loaded]);

  return (
    <>
      <div className="loaderfor3D fixed z-[1000] bg-white w-full h-full flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    </>
  );
};

export default LoaderFor3D;
