import { useState } from "react"
import classes from "./style.module.css"
import { Block } from "baseui/block"
import PosterImage from "./dummyAssets/PosterImage.png"
import CreateBtn from "./CreateBrandBtn/CreateBtn"
import ColorCardBtn from "./ColorCardBtn/ColorCardBtn"
import GradiantBtn from "./GradientBtn/GradientBtn"
import Icons from "../Icons"
import Uploads from "~/views/DesignEditor/components/Panels/panelItems/UploadDropzone/Uploads"
import { Modal, SIZE } from "baseui/modal"
import BrandLogo from "./BrandLogo/BrandLogo"
import BrandColorPicker from "./ColorPicker/BrandColorPicker"

const BrandSection = () => {
    const [isUploadLogo, setIsUploadLogo] = useState(false)
    const [SolidColors, setSolidColors] = useState(["#F259E8", "#6729F3", "#ffffff", "#000000"])
    const [BgSolidColors, setBgSolidColors] = useState(["#ffffff", "#000000"])
    const GradientColors = [
        "linear-gradient(to right, rgba(242, 89, 232, 1), rgba(103, 41, 243, 1))",
        "#linear-gradient(to right, rgba(89, 187, 242, 1), rgba(178, 41, 243, 1))",
    ]
    const [createSolidPopup, setCreateSolidPopup] = useState(false)
    const [addColorType, setAddColorType] = useState('SolidColor')
    const handleDeleteSolidColor = (index: number) => {
        const updatedColors = [...SolidColors]
        updatedColors.splice(index, 1)
        setSolidColors(updatedColors)
    }

    const handleDeleteBgSolidColor = (index: number) => {
        const updatedColors = [...BgSolidColors]
        updatedColors.splice(index, 1)
        setBgSolidColors(updatedColors)
    }

    const handleAddSolidColor = (index: any, color: any, type: string) => {
        if (type === 'SolidColor') {
            setSolidColors([...SolidColors, color])
        } else if (type === 'SolidBgColor') {
            setBgSolidColors([...BgSolidColors, color])
        }

    }
    const handleEdit = (index: any, color: any, type: any) => {
        if (type === 'SolidColor') {
            const updatedColors = [...SolidColors];
            updatedColors[index] = color;
            setSolidColors(updatedColors);
        } else if (type === 'SolidBgColor') {
            const updatedColors = [...BgSolidColors];
            updatedColors[index] = color;
            setBgSolidColors(updatedColors);
        }
    };

    const HandleUplaodModalClose = () => {
        setIsUploadLogo(false)
    }
    const HandleUplaodModalOpen = () => {
        setIsUploadLogo(true)
    }

    const HandleSolidColorCreateClick = (type: any) => {
        setCreateSolidPopup(!createSolidPopup)
        setAddColorType(type)
    }
    const handleOpenAddColorPopup = () => {
        setCreateSolidPopup(false)
    }
    return (
        <Block className={classes.brandMainContainer}>
            <Block className={classes.posterCon}>
                <img src={PosterImage} alt="posterImage" />
            </Block>

            <Block className={classes.brandSectionCon}>
                <Block className={classes.brandLogoTop}>
                    <h3 className={classes.sectionHeading}>Brand Logo</h3>
                    <p className={classes.sectionDiscription}>Create a brand logo library with multiple variations</p>
                </Block>
                <Block className={classes.brandLogoBottom}>
                    <CreateBtn HandleOnClick={HandleUplaodModalOpen} />
                    <BrandLogo />
                    <BrandLogo />
                    <BrandLogo endImgLogo={true} />
                </Block>
            </Block>

            <Block className={classes.brandSectionCon}>
                <Block className={classes.brandLogoTop}>
                    <h3 className={classes.sectionHeading}>Solid Colors</h3>
                </Block>
                <Block className={classes.brandLogoBottom}>
                    <CreateBtn Width="120px" Height="120px" HandleOnClick={() => HandleSolidColorCreateClick('SolidColor')} />
                    {createSolidPopup && (
                        <div
                            id={`popup-${createSolidPopup}`}
                            onMouseLeave={() => setCreateSolidPopup(false)}
                            style={{ position: "absolute", top: "14px", left: "136px", zIndex: "1" }}
                        >
                            <BrandColorPicker type={addColorType} handleAddColor={handleAddSolidColor} close={handleOpenAddColorPopup} />
                        </div>
                    )}

                    {SolidColors.map((colors, ind) => {
                        return <ColorCardBtn ColorCode={colors} index={ind} handleDelete={handleDeleteSolidColor} handleEdit={handleEdit} key={ind} />
                    })}
                </Block>
            </Block>

            <Block className={classes.brandSectionCon}>
                <Block className={classes.brandLogoTop}>
                    <h3 className={classes.sectionHeading}>Background Colors</h3>
                </Block>
                <Block className={classes.brandLogoBottom}>
                    <CreateBtn Width="120px" Height="120px" HandleOnClick={() => HandleSolidColorCreateClick('SolidBgColor')} />
                    {BgSolidColors.map((colors, ind) => {
                        return <ColorCardBtn ColorCode={colors} index={ind} handleDelete={handleDeleteBgSolidColor} key={ind} />
                    })}
                </Block>
            </Block>

            <Block className={classes.brandSectionCon}>
                <Block className={classes.brandLogoTop}>
                    <h3 className={classes.sectionHeading}>Gradient Colors</h3>
                </Block>
                <Block className={classes.brandLogoBottom}>
                    <CreateBtn Width="120px" Height="120px" HandleOnClick={HandleSolidColorCreateClick} />

                    {GradientColors.map((colors, ind) => {
                        return <GradiantBtn ColorCode={colors} />
                    })}
                </Block>
            </Block>
            <UplaodModal isAddFolderOpen={isUploadLogo} HandleCloseAddModal={HandleUplaodModalClose} />
        </Block>
    )
}

const UplaodModal = ({ isAddFolderOpen, HandleCloseAddModal }: any) => {
    return (
        <Modal
            animate
            autoFocus
            size={SIZE.auto}
            onClose={HandleCloseAddModal}
            isOpen={isAddFolderOpen}
            overrides={{
                Root: {
                    style: ({ $theme }) => ({
                        zIndex: 500,
                        margin: "",
                        outline: `transparent`,
                    }),
                },
                Close: {
                    style: ({ $theme }) => ({
                        outline: `transparent`,
                        display: "none",
                    }),
                },
                Dialog: {
                    style: ({ $theme }) => ({
                        backgroundColor: "white",
                        width: "636px",
                        height: "auto",
                        borderRadius: "24px",
                        padding: "40px 32px",
                        margin: "0px",
                    }),
                },
            }}
        >
            <Block className={classes.addFolderCon}>
                <Block className={classes.addFolderTop}>
                    Add Logo
                    <span style={{ cursor: "pointer" }} onClick={() => HandleCloseAddModal()}>
                        <Icons.ClosedFilled />
                    </span>
                </Block>
                <Block className={classes.addFolderBottom}>
                    <Uploads />
                </Block>
            </Block>
        </Modal>
    )
}

export default BrandSection
