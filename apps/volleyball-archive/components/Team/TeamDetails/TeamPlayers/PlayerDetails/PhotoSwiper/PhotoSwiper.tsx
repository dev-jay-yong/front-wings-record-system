import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import { PhotoGalleryType } from '../PlayerDetails';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

const Container = styled.div`
  width: 100%;
  height: 365px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  margin-top: 15px;
`;
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ImageBlock = styled.img`
  height: 365px;

  @media (max-width: 768px) {
    height: 265px;
  }
`;
interface PhotoProps {
  images: PhotoGalleryType[] | undefined;
}

SwiperCore.use([Navigation, Pagination, Autoplay]);

export const PhotoSwiper = ({ images }: PhotoProps) => {
  return (
    <Container>
      <Swiper
        navigation
        style={{ width: '100%', height: '100%' }}
        spaceBetween={50}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {images &&
          images.map((item) => {
            return (
              <SwiperSlide
                key={item.id}
                style={{ width: '100%', height: '100%' }}
              >
                <ImageBox>
                  <ImageBlock src={item.image_url} alt={`${item.id}`} />
                </ImageBox>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Container>
  );
};
