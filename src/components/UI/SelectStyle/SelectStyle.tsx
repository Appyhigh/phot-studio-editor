import Icons from "~/components/Icons"
import classes from "./style.module.css"
import clsx from "clsx"
import { useState } from "react"
import Scrollbars from "@layerhub-io/react-custom-scrollbar"
import { Block } from "baseui/block"
import SearchIcon from "~/components/Icons/SearchIcon"

const SelectStyle = (props: any) => {
  const [selectedImg, setSelectedImg] = useState(-1)
  const [res, setRes] = useState([
    {
      name: "Ink",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Ink.webp",
      is_premium: false,
      placeholder_text: "Ink art",
    },
    {
      name: "Tempera",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Tempera.webp",
      is_premium: false,
      placeholder_text: "Tempera art",
    },
    {
      name: "Encaustic",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Encaustic.webp",
      is_premium: false,
      placeholder_text: "Encaustic art",
    },
    {
      name: "Glass Art",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Glass Art.webp",
      is_premium: true,
      placeholder_text: "Glass art",
    },
    {
      name: "Acrylic Paint",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Acrylic Paint.webp",
      is_premium: false,
      placeholder_text: "Acrylic Paint",
    },
    {
      name: "Charcoal",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Charcoal.webp",
      is_premium: false,
      placeholder_text: "Charcoal art",
    },
    {
      name: "Digital",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Digital.webp",
      is_premium: false,
      placeholder_text: "Digital art",
    },
    {
      name: "Watercolor",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Watercolor.webp",
      is_premium: true,
      placeholder_text: "Watercolor art",
    },
    {
      name: "Oil Painting",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Oil Painting.webp",
      is_premium: false,
      placeholder_text: "Oil Painting",
    },
    {
      name: "Clay Modelling",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Clay Modelling.webp",
      is_premium: false,
      placeholder_text: "Clay Modelling",
    },
    {
      name: "Silverpoint",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Silverpoint.webp",
      is_premium: false,
      placeholder_text: "Silverpoint art",
    },
    {
      name: "Color Pencils",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Color Pencils.webp",
      is_premium: false,
      placeholder_text: "Color Pencils art",
    },
    {
      name: "Bronze Art",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Bronze Art.webp",
      is_premium: false,
      placeholder_text: "Bronze art",
    },
    {
      name: "Graphite",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Graphite.webp",
      is_premium: false,
      placeholder_text: "Graphite art",
    },
    {
      name: "Chalk",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Chalk.webp",
      is_premium: true,
      placeholder_text: "Chalk art",
    },
    {
      name: "Wood Art",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Wood Art.webp",
      is_premium: false,
      placeholder_text: "Wood art",
    },
    {
      name: "Collage Art",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Collage Art.webp",
      is_premium: false,
      placeholder_text: "Collage art",
    },
    {
      name: "Ink And Pen",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Ink And Pen.webp",
      is_premium: false,
      placeholder_text: "Ink And Pen art",
    },
    {
      name: "Pastels",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Pastels.webp",
      is_premium: false,
      placeholder_text: "Pastels art",
    },
    {
      name: "Gouache Paint",
      image_link: "https://stable-diffusion-app.apyhi.com/studio_assets/Art Mediums/Gouache Paint.webp",
      is_premium: false,
      placeholder_text: "Gouache Paint",
    },
  ])
  return (
    <div className={classes.selectStyleContainer}>
      <Block className={classes.selectStyleHeading}>Style</Block>
      <div className={classes.selectStyleSearch}>
        <div className={classes.searchIcon}>
          <SearchIcon color={"#92929D"} />
        </div>
        <input className={classes.textInput} placeholder="Search" />
      </div>
      <Block className={classes.selectStyleImages}>
        <Scrollbars style={{ height: props?.height ? props.height : "30rem" }}>
          <div className={classes.sampleImgSection}>
            {res.map((image: any, index: any) => {
              return (
                <ImageItem
                  key={index}
                  idx={image.name}
                  selectedImage={selectedImg}
                  onClick={() => {}}
                  preview={image.image_link}
                  name={image.name}
                />
              )
            })}
          </div>
        </Scrollbars>
      </Block>
    </div>
  )
}

const ImageItem = ({
  idx,
  preview,
  onClick,
  selectedImage,
  name,
}: {
  idx: number
  preview: any
  onClick?: (option: any) => void
  selectedImage: number
  name: string
}) => {
  return (
    <div>
      <div onClick={onClick} className={clsx("pointer p-relative", classes.imageItemSection, "flex-center")}>
        <div className={clsx("p-absolute", classes.imageItem)} />
        <img src={preview} className={classes.imagePreview} />
        {selectedImage === idx && (
          <div className={classes.selectedIcon}>
            <Icons.Selection size={"24"} />
          </div>
        )}
      </div>
      <div className={classes.imageItemName}>{name}</div>
    </div>
  )
}

export default SelectStyle
