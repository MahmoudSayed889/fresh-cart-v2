import React from 'react'
import Slider from 'react-slick';

export default function SlickCarousel({ slides = [], cusSettings = {}, thumbnails = [] }) {

    const defaultSettings = {
        dots: false,
        infinite: false,
        autoplay: true,
        pauseOnHover: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const thumbnailSettings = thumbnails.length ? {
        customPaging: (i) => (
            <img
                className='w-100'
                src={thumbnails[i]}
                alt={`Thumbnail ${i + 1}`}
            />
        )
    } : {};

    const settings = {
        ...defaultSettings,
        ...thumbnailSettings,
        ...cusSettings,
    };

    return (
        <Slider {...settings}>
            {slides.map((s, index) => {
                return <div key={index}>
                    <img className='w-100 h-100' src={s} alt="index" />
                </div>
            })}
        </Slider>
    );
}