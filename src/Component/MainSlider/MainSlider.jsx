import React from 'react'
import slide1 from '../../Assets/images/41nN4nvKaAL._AC_SY200_.jpg'
import slide2 from '../../Assets/images/61cSNgtEISL._AC_SY200_.jpg'
import slide3 from '../../Assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import blog1 from '../../Assets/images/blog1.jpg'
import blog2 from '../../Assets/images/blog2.jpg'
import Slider from "react-slick";


export default function MainSlider() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return <>
        <div className="row gx-0 m-auto d-flex justify-content-center text-center">
            <div className="col-md-3">
                <Slider {...settings}>
                    <img src={slide1} className='w-100' alt="slide1" />
                    <img src={slide2} alt="slide2" className='w-100' />
                    <img src={slide3} alt="slide3" className='w-100' />
                </Slider></div>
            <div className="col-md-3">
                <img src={blog1} height={200} className='w-100' alt="BLOG1" />
                <img src={blog2} alt="BLOG2" height={200} className='w-100' />
            </div>
        </div>
    </>

}

