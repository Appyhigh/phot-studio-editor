import React from 'react'
import classes from './style.module.css'
import Icons from '~/components/Icons'

const CreateBtn = ({ Width, Height, IconColor, IconSize, HandleOnClick }: any) => {
    return (
        <button className={classes.brandCreateBtn}
            style={{ width: Width ? Width : '', height: Height ? Height : '', }}
            onClick={() => HandleOnClick()}
        >
            <Icons.CreateBrandPlus color={IconColor ? IconColor : ''} size={IconSize ? IconSize : ''} />
        </button>
    )
}

export default CreateBtn

