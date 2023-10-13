import { Block } from 'baseui/block';
import { Modal, SIZE } from 'baseui/modal'
import classes from './style.module.css'

const TempleteModal = ({ isModalOpen, HandleClose, data }: any) => {
    return (
        <Modal
            animate
            autoFocus
            size={SIZE.auto}
            onClose={HandleClose}
            isOpen={isModalOpen}
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
        </Modal>
    )
}

export default TempleteModal

