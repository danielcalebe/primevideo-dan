
import { useNavigate } from "react-router-dom"
import {  assets } from "../assets/assets";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import OriginalsItem from "../components/OriginalsItem";
import CarrousselItem from "../components/CarrousselItem";


export const useUtils = () => {
    
    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    };
    
return {
    navigate,
    assets,
    Swiper, SwiperSlide, Navigation, Pagination , Autoplay,
    CarrousselItem, OriginalsItem,
    refreshPage,



};


};

