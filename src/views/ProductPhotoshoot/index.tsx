import { Modal, SIZE } from 'baseui/modal'
import ProductPhotoshootEditor from '~/components/ModalToolsEditor/ProductPhotoshootEditor/ProductPhotoshootEditor'
import { useNavigate } from 'react-router-dom'

const index = () => {
    const navigate = useNavigate()
    return (
        <Modal
            animate
            autoFocus
            size={SIZE.auto}
            overrides={{
                Root: {
                    style: ({ $theme }) => ({
                        zIndex: 500,
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
                        backgroundColor: "#F1F1F5",
                        width: "85%",
                        height: "85vh",
                        overflow: 'hidden'
                        // margin: "84px 100px 84px 100px",
                    }),
                },
            }}
            // onClose={handleClose}
            isOpen={true}
        >


            <ProductPhotoshootEditor handleClose={() => navigate('/')} />
        </Modal>
    )
}

export default index
