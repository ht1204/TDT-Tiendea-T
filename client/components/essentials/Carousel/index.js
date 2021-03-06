import React, { useState } from 'react'
import { SliderData } from './SliderData'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'


function Carousel({ slides }){
    const [current, setCurrent] = useState(0);
    const length = slides.length

    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
      return null;
    }

    return (
      <main style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
      }}>
          <FaArrowAltCircleLeft onClick={prevSlide} />
          <section>
              {SliderData.map((slide, index) => {
                  return (
                  <div key={index}>
                      {index === current && (
                        <img src={slide.image} />
                      )}
                  </div>
                  )
              })}
          </section>
          <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      </main>
    )

}

export default Carousel