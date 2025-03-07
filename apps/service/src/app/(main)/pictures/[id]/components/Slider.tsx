"use client";

import { useSliderStore } from "@/src/store/ImageSlider";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import React from "react";


interface settings {
    speed : number;
    infinite : boolean;
  }
  
  interface SliderProps extends settings{
    children? : React.ReactNode;
    className? : string;
  }
  export const Slider = ({className,children,speed,infinite} : SliderProps)=>{
  
    const {currentIndex,setCurrentIndex}=useSliderStore();
    const count = React.Children.count(children);
    const totalSlides = count;
  
  
    const moveToSlide = (index: number) => {
      if(infinite){
  
        if (index < 0) {
          setCurrentIndex(totalSlides - 1);
        } 
        else if (index >= totalSlides) {
          setCurrentIndex(0);
        }
        else {
          setCurrentIndex(index);
        } 
      }
      else {
        if (index < 0) {
          return;
        } 
        else if (index >= totalSlides) {
          return;
        }
        else {
          setCurrentIndex(index);
        } 
      }
    };

  
    return(
      <div className={`relative w-full h-full mx-auto overflow-hidden ${className}`}>
        <div className="flex  h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)`,
          transitionDuration: `${speed}ms`, // 동적으로 전환 속도 설정
          transitionProperty: 'transform', // 전환할 속성 명시
          transitionTimingFunction: 'ease-in-out', // 전환 타이밍 함수 설정
        }}>
  
  
  
        {children}
        </div>
  
        <div className='absolute top-2 right-2 bg-text02 rounded-md p-1 flex items-center'>
          <Download size={24} className='cursor-pointer text-background01'/>
        </div>
  
        {/* 왼쪽 화살표 */}
        {
          currentIndex !== 0 && (
            <ChevronLeft
              size={40}
              onClick={() => moveToSlide(currentIndex - 1)}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2 focus:outline-none cursor-pointer"
              aria-label="Previous Slide"
            />
          )}
     
  
        {/* 오른쪽 화살표 */}
        {
          currentIndex !== totalSlides-1 && (
              <ChevronRight
                        size={40}
                        onClick={() => moveToSlide(currentIndex + 1)}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2 focus:outline-none cursor-pointer"
                        aria-label="Next Slide"
                      />
                  )
        }
        
  
        {/* 도트 네비게이션 */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[...Array(count)].map( (_, index) => (
            <button
              key={index}
              onClick={() => moveToSlide(index)}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index
                  ? 'bg-background01'
                  : 'bg-text02 hover:bg-text02'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    )
  }