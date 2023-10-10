import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";


type SliderOptionProps = {
  isActive: boolean;
  month: string;
  index: number;
}
export function SliderOption({ isActive, month, index }: SliderOptionProps) {
  const swiper = useSwiper()
  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        "w-full rounded-full h-12",
        isActive && 'bg-white'
      )}
    >
      {month}
    </button>
  )
}
