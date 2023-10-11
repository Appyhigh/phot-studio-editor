import React, { useEffect, useState } from "react";
import { Block } from "baseui/block";
import classes from "./style.module.css";
import { Modal, SIZE } from "baseui/modal";
import Icons from "~/components/Icons";

const TempletCard = ({ data }: any) => {
    const [isModalOpen, setModalOpen] = useState(false);
    return (
        <Block className={classes.templeteCard} onClick={() => setModalOpen(true)}>
            <div className={classes.templeteCardImgCon}>
                <img src={data.src} alt={data.title} />
            </div>
            <div className={classes.descCon}>
                <h3 className={classes.templeteCardHeader}>{data.title}</h3>
                <p className={classes.templeteCardDesc}>{data.discription}</p>
            </div>

            {/* Modal */}
            <TempletsPopup isOpen={isModalOpen} onClose={() => setModalOpen(false)} data={data} setModalOpen={setModalOpen} />
        </Block>
    );
};

const TempletsPopup = ({ isOpen, onClose, data, setModalOpen }: any) => {

    return (
        <Modal
            animate
            autoFocus
            size={SIZE.auto}
            onClose={onClose}
            isOpen={isOpen}
            overrides={{
                Root: {
                    style: ({ $theme }) => ({
                        zIndex: 500,
                        margin: "",
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
                        width: "70%",
                        height: "50vh",
                        borderRadius: '24px',
                        padding: '40px',
                        margin: '0px'
                    }),
                },
            }}
        >
            <Block className={classes.popupContainer}>
                <Block className={classes.imageContainer}>
                    <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' alt="" />
                </Block>
                <Block className={classes.popupInfo}>
                    <Block className={classes.popupContent}>
                        <h2 className={classes.popupHeading}>{data.title}</h2>
                        <p className={classes.popupDiscription}>{data.discription}</p>
                    </Block>
                    <Block className={classes.popupBtnsCont}>
                        <button className={classes.useTempBtn}>Use this template</button>
                        <button className={classes.shareBtn}>Share</button>
                    </Block>
                </Block>
            </Block>
            <div style={{
                cursor: 'pointer', position: 'absolute',
                top: '-150px',
                right: '-105px'
            }}>
                <Icons.PopupClose />
            </div>
        </Modal>
    );
};

export default TempletCard;
