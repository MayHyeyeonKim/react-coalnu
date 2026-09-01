export const movieCarouselResponsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 6,
    slidesToSlide: 3,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1,
    partialVisibilityGutter: 24,
  },
  largeMobile: {
    breakpoint: { max: 768, min: 480 },
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: 28,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 56,
  },
};
