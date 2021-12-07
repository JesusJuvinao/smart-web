import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import PropTypes from 'prop-types'
import { Arrow, Item, CurrentItem } from './styled'

export const CustomSlider = ({ children, arrow, dots, slide, breakPoint = [], center }) => {
  const NextArrow = ({ onClick }) => {
    return (
            <Arrow
                right
                onClick={onClick}
            ></Arrow>
    )
  }

  const PrevArrow = ({ onClick }) => {
    return (
            <Arrow
                left
                onClick={onClick}
            ></Arrow>
    )
  }
  const [currentSlide, setCurrentSlide] = useState(1)

  const settings = () => ({
    dots,
    centerMode: !!center,
    infinite: true,
    slidesToShow: slide,
    arrows: arrow,
    appendDots: dots => <div>{dots}</div>,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: current => setCurrentSlide(current),
    customPaging: i => <CurrentItem current={i === currentSlide}/>,
    responsive: [
      {
        breakpoint: breakPoint[0] ? breakPoint[0] : 1660,
        settings: {
          slidesToShow: 4,
          infinite: true,
          centerMode: !!center

        }
      },
      {
        breakpoint: breakPoint[1] ? breakPoint[1] : 1350,
        settings: {
          slidesToShow: 3,
          infinite: true,
          centerMode: !!center

        }
      },
      {
        breakpoint: breakPoint[2] ? breakPoint[2] : 1100,
        settings: {
          slidesToShow: 3,
          infinite: true,
          centerMode: !!center

        }
      },
      {
        breakpoint: breakPoint[3] ? breakPoint[3] : 690,
        settings: {
          slidesToShow: 3,
          initialSlide: 2,
          centerMode: !!center

        }
      },
      {
        breakpoint: breakPoint[4] ? breakPoint[4] : 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: !!center
        }
      },
      {
        breakpoint: breakPoint[5] ? breakPoint[5] : 340,
        settings: {
          slidesToShow: 1,
          // slidesToScroll: 1,
          centerMode: !!center

        }
      }
    ]
  })

  return (
        <Slider {...settings()}>
            {children?.map((x, i) => <Item key={i}>{x}</Item>)}
        </Slider>
  )
}

CustomSlider.propTypes = {
  children: PropTypes.array,
  arrow: PropTypes.bool,
  dots: PropTypes.bool,
  slide: PropTypes.number,
  breakPoint: PropTypes.array,
  center: PropTypes.bool,
  onClick: PropTypes.bool

}
