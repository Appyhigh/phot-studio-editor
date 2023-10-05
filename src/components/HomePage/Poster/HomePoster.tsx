import React from 'react'
import classes from "./style.module.css"
import { Block } from 'baseui/block'
import { POSTER_IMAGES } from '~/components/HomePage/dummy'
const HomePoster = () => {
    return (
        <section className={classes.posterCon}>
            <img src={POSTER_IMAGES[0].src} alt='poster' />
            <Block className={classes.PosterContent}>
                <Block className={classes.PosterContentCon}>
                    <span className={classes.trendingBtn}>Trending</span>
                    <div className={classes.PosterContentConDis}>
                        <h3 className={classes.PosterContentHed}>Turn imagination into art</h3>
                        <p className={classes.PosterContentDis}>Our AI image generator brings imagination to life, producing stunning art, illustrations, and images in seconds.</p>
                    </div>
                </Block>
                <button className={classes.posterTryBtn}>Try Now</button>
            </Block>

        </section>
    )
}

export default HomePoster
