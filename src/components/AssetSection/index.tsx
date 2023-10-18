import { Block } from "baseui/block"
import classes from "./FileSection/style.module.css"
import { useState } from "react"
import Icons from "../Icons"
import { Modal, SIZE } from "baseui/modal"
import BaseButton from "../UI/Button/BaseButton"
import Section from "./FileSection/FileSection"
import { PanelSection } from "~/constants/app-options"

const AssetSection = () => {
    const [isKebabMenu, setIsKebabMenu] = useState(null)
    const [isClickKebabMenu, setIsClickKebabMenu] = useState(false)
    const [isAddFolderOpen, setIsAddFolderOpen] = useState(false)
    const [sectionDataName, setSectionDataName] = useState('All files')
    const HandleCloseAddModal = () => {
        setIsAddFolderOpen(false)
    }
    const HandleBackBtn = () => {
        setSectionDataName('All files')
    }
    const Folders = ["Appyhigh", "AH Prime", "Phot.AI"]
    return (
        <Block className={classes.assetsContainer}>
            {sectionDataName === 'All files' && <Block className={classes.allFilesContainer}>
                <section className={classes.sectionToolsCon}>
                    <Block className={classes.sectionTopCon}>
                        <h3 className={classes.sectionToolFolderHead}>Folders</h3>
                        <Block className={classes.sectionTopBtns}>
                            <Block className="p-relative addPopupBtn">
                                <button className={classes.sectionBtns} onClick={() => setIsAddFolderOpen(true)}>
                                    <span className="d-flex align-items-center">
                                        New Folder
                                        <span className="pl-1">
                                            <Icons.Plus size={14} color={"#44444F"} />
                                        </span>
                                    </span>
                                </button>
                                {/* popup */}
                            </Block>
                        </Block>
                    </Block>
                    <Block className={classes.folderContainer}>
                        {Folders.map((name, ind) => (
                            <Block
                                className="p-relative addPopupBtn"
                                key={ind}
                                onMouseEnter={() => setIsKebabMenu(ind)}
                                onMouseLeave={() => {
                                    setIsKebabMenu(null)
                                    setIsClickKebabMenu(false)
                                }}
                            >
                                <button className={classes.sectionfileBtn} >
                                    <span className={classes.fileBtnContent} onClick={() => setSectionDataName(name)}>
                                        <Icons.FileIcon />
                                        {name}
                                    </span>

                                    {isKebabMenu === ind && (
                                        <span style={{ paddingTop: '5px' }} onClick={() => setIsClickKebabMenu(!isClickKebabMenu)}>
                                            <Icons.KebabMenu />
                                        </span>)}

                                </button>

                                {isKebabMenu === ind && isClickKebabMenu && (
                                    <div className={classes.folderMenuPopup}>
                                        <span className={classes.menuOption}>
                                            <Icons.RenamePencil />
                                            Rename
                                        </span>
                                        <span className={classes.menuOption}>
                                            <Icons.DownloadSimple />
                                            Download
                                        </span>
                                        <span className={classes.menuOption}>
                                            <Icons.TrashSimple />
                                            Delete
                                        </span>
                                    </div>
                                )}
                            </Block>
                        ))}
                    </Block>
                </section>
            </Block>}

            <Section name={sectionDataName} HandleBackBtn={HandleBackBtn} type={PanelSection.Assets} />
            <AddFolderModal isAddFolderOpen={isAddFolderOpen} HandleCloseAddModal={HandleCloseAddModal} />
        </Block>
    )
}

const AddFolderModal = ({ isAddFolderOpen, HandleCloseAddModal }: any) => {
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
                        height: "245px",
                        borderRadius: '24px',
                        padding: '40px 32px',
                        margin: '0px'
                    }),
                },
            }}
        >
            <Block className={classes.addFolderCon}>
                <Block className={classes.addFolderTop}>
                    Add new folder
                    <span style={{ cursor: 'pointer' }} onClick={() => HandleCloseAddModal()}>
                        <Icons.ClosedFilled />
                    </span>

                </Block>
                <Block className={classes.addFolderBottom}>
                    <input placeholder="Folder name" className={classes.addFolderInput}></input>
                    <BaseButton height="48px" title="Add" />
                </Block>

            </Block>
        </Modal>
    )
}

export default AssetSection
