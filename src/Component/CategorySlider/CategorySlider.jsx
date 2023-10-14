import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";



export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        // slidesToScroll: 1
    };


    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    let { isLoading, isFetching, isError, data } = useQuery('categorySlider', getProducts)
    // console.log(data?.data.data);

    return <>
        <Slider {...settings}></Slider>

        {data?.data.data ? <Slider {...settings}>
            {data?.data.data.map((category) => <img key={category._id} className='w-100 my-5' height={200} src={category.image} />)}

        </Slider> : ""}
    </>

}