import React from "react"
import classes from "./style.module.css"
import { Block } from "baseui/block"
import { POSTER_IMAGES } from "~/components/HomePage/dummy"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/themes/splide-default.min.css"
const HomeSlider = () => {
    return (
        <section className={classes.posterCon}>
            <Splide
                className="w-100 h-100"
                options={{
                    rewind: true,
                    autoplay: true,
                    arrows: false,
                    interval: 5000,
                    pauseOnHover: false,
                    pagination: false,
                }}
            >
                {Array.from({ length: 4 }, (_, index) => (
                    <SplideSlide className="w-100 h-100">
                        <img src={POSTER_IMAGES[0].src} alt="poster" style={{ height: "100%", width: "100%" }} />
                        <Block className={classes.PosterContent}>
                            <Block className={classes.PosterContentCon}>
                                <span className={classes.trendingBtn}>Trending</span>
                                <div className={classes.PosterContentConDis}>
                                    <h3 className={classes.PosterContentHed}>Turn imagination into art</h3>
                                    <p className={classes.PosterContentDis}>
                                        Our AI image generator brings imagination to life, producing stunning art, illustrations, and images
                                        in seconds.
                                    </p>
                                </div>
                            </Block>
                            <button className={classes.posterTryBtn}>Try Now</button>
                        </Block>
                    </SplideSlide>
                ))}
            </Splide>
        </section>
    )
}

export default HomeSlider
