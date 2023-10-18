import React, { useEffect, useState } from 'react'
import classes from './style.module.css'
import { Block } from 'baseui/block'
import PosterImage from './dummyAssets/PosterImage.png'
import CreateBtn from './CreateBrandBtn/CreateBtn'
import ColorCardBtn from './ColorCardBtn/ColorCardBtn'
import GradiantBtn from './GradientBtn/GradientBtn'
import Icons from '../Icons'
import Uploads from '~/views/DesignEditor/components/Panels/panelItems/UploadDropzone/Uploads'
import { Modal, SIZE } from 'baseui/modal'
import BrandLogo from './BrandLogo/BrandLogo'
import BrandColorPicker from './ColorPicker/BrandColorPicker'

const BrandSection = () => {
    const [isUploadLogo, setIsUploadLogo] = useState(false)
    const SolidColors = ['#F259E8', '#6729F3', '#ffffff', '#000000']
    const BgSolidColors = ['#ffffff', '#000000']
    const GradientColors = ['linear-gradient(to right, rgba(242, 89, 232, 1), rgba(103, 41, 243, 1))', '#linear-gradient(to right, rgba(89, 187, 242, 1), rgba(178, 41, 243, 1))']
    const [createSolidPopup, setCreateSolidPopup] = useState(false)
    // const [createGradientPopup, setCreateGradientPopup] = useState(false)
    // const [createBgPopup, setCreateBgPopup] = useState(false)
    const HandleUplaodModalClose = () => {
        setIsUploadLogo(false)
    }
    const HandleUplaodModalOpen = () => {
        setIsUploadLogo(true)
    }

    const HandleSolidColorCreateClick = () => {
        setCreateSolidPopup(!createSolidPopup)
    }
    useEffect(() => {
        if (createSolidPopup !== null) {
            const popupElement = document.getElementById(`popup-${createSolidPopup}`);
            if (popupElement) {
                popupElement.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [createSolidPopup]);
    return (
        <Block className={classes.brandMainContainer}>
            <Block className={classes.posterCon}>
                <img src={PosterImage} alt='posterImage' />
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
                    <BrandLogo />
                </Block>
            </Block>

            <Block className={classes.brandSectionCon}>
                <Block className={classes.brandLogoTop}>
                    <h3 className={classes.sectionHeading}>Solid Colors</h3>
                </Block>
                <Block className={classes.brandLogoBottom}>
                    <CreateBtn Width='120px' Height='120px' HandleOnClick={HandleSolidColorCreateClick} />
                    {createSolidPopup && <div id={`popup-${createSolidPopup}`} style={{ position: 'absolute', top: '14px', left: '136px', zIndex: '1' }} ><BrandColorPicker /></div>}

                    {
                        SolidColors.map((colors, ind) => {
                            return <ColorCardBtn ColorCode={colors} />
                        })
                    }
                </Block>
            </Block>

            <Block className={classes.brandSectionCon}>
                <Block className={classes.brandLogoTop}>
                    <h3 className={classes.sectionHeading}>Background Colors</h3>
                </Block>
                <Block className={classes.brandLogoBottom}>
                    <CreateBtn Width='120px' Height='120px' HandleOnClick={HandleSolidColorCreateClick} />
                    {
                        BgSolidColors.map((colors, ind) => {
                            return <ColorCardBtn ColorCode={colors} />
                        })
                    }
                </Block>
            </Block>

            <Block className={classes.brandSectionCon}>
                <Block className={classes.brandLogoTop}>
                    <h3 className={classes.sectionHeading}>Gradient Colors</h3>
                </Block>
                <Block className={classes.brandLogoBottom}>
                    <CreateBtn Width='120px' Height='120px' HandleOnClick={HandleSolidColorCreateClick} />

                    {
                        GradientColors.map((colors, ind) => {
                            return <GradiantBtn ColorCode={colors} />
                        })
                    }
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
                        borderRadius: '24px',
                        padding: '40px 32px',
                        margin: '0px'
                    }),
                },
            }}
        >
            <Block className={classes.addFolderCon}>
                <Block className={classes.addFolderTop}>
                    Add Logo
                    <span style={{ cursor: 'pointer' }} onClick={() => HandleCloseAddModal()}>
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
