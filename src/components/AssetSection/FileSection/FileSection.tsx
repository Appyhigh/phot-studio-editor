import { Block } from 'baseui/block'
import classes from './style.module.css'
import Icons from '../../Icons'
import { ASSETS_DATA } from '../../Templets/dummy'
import TempletCard from '../../Templets/TempletCard'
import { Modal, SIZE } from 'baseui/modal'
import Uploads from '~/views/DesignEditor/components/Panels/panelItems/UploadDropzone/Uploads'
import { useState } from 'react'
import { PanelSection } from '~/constants/app-options'

const Section = ({ name, HandleBackBtn, type }: any) => {
    const [isAddFolderOpen, setIsAddFolderOpen] = useState(false)
    const HandleCloseAddModal = () => {
        setIsAddFolderOpen(false)
    }
    return (
        <Block className={classes.allFilesContainer}>
            <section className={classes.sectionToolsCon}>
                <Block className={classes.sectionTopCon}>
                    <span className='d-flex align-items-center' style={{ gap: '12px', cursor: 'pointer' }} onClick={() => HandleBackBtn()}>
                        {name !== 'All files' && type !== PanelSection.YourDesigns && < Icons.ArrowLeft color='black' />}
                        <h3 className={classes.sectionToolHead}>{name}</h3>
                    </span>

                    <Block className={classes.sectionTopBtns}>
                        {type !== PanelSection.YourDesigns && <Block className="p-relative addPopupBtn">
                            <button className={classes.sectionBtns}>
                                <span className="d-flex align-items-center" onClick={() => { setIsAddFolderOpen(true) }}>
                                    New File
                                    <span className="pl-1">
                                        <Icons.Plus size={14} color={"#44444F"} />
                                    </span>
                                </span>
                            </button>
                            {/* popup */}
                        </Block>}

                        <Block className="p-relative addPopupBtn">
                            <button className={classes.sectionBtns}>
                                <span className="d-flex align-items-center">
                                    Sort by: Date
                                    <span className="pl-1">
                                        <Icons.DownArrowFilled size={14} />
                                    </span>
                                </span>
                            </button>
                            {/* popup */}
                        </Block>
                    </Block>
                </Block>

                <Block className={classes.sectionCardWrap}>
                    {ASSETS_DATA.map((data, index) => {
                        return (
                            <div
                                key={index}
                            >
                                <TempletCard data={data} />
                            </div>
                        )
                    })}
                </Block>
            </section>
            <UplaodModal isAddFolderOpen={isAddFolderOpen} HandleCloseAddModal={HandleCloseAddModal} />
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
                    Add file
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

export default Section
