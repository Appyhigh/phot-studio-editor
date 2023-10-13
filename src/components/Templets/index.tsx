import { Block } from "baseui/block"
import classes from "./style.module.css"
import TempletCard from "./TempletCard"
import { TEMPLETS_DATA } from "./dummy"
import { useState } from "react"
import Icons from "../Icons"
import TempleteModal from "./TempletCard/TempleteModal"

const TempletSection = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({})
    const HandleClose = () => {
        setModalOpen(false)
    }
    return (
        <Block className={classes.templetsContainer}>
            {Array.from({ length: 3 }, (_, index) => (
                <section className={classes.sectionToolsCon}>
                    <h3 className={classes.sectionToolHead}>Recently used</h3>
                    <Block className={classes.sectionCardWrap}>
                        {TEMPLETS_DATA.map((data, index) => {
                            return <div onClick={() => {
                                setModalOpen(true)
                                setModalData(data)
                            }} key={index} >

                                <TempletCard data={data} isModalOpen={isModalOpen} HandleClose={HandleClose} />
                            </div>
                        })}
                    </Block>
                </section>
            ))}
            {isModalOpen && <TempleteModal isModalOpen={isModalOpen} HandleClose={HandleClose} data={modalData} />}
            {isModalOpen && <div style={{ position: 'absolute', cursor: 'pointer', zIndex: '20000', top: '21px', right: '31px' }} onClick={HandleClose}> <Icons.PopupClose /></div>}
        </Block>
    )
}
export default TempletSection
