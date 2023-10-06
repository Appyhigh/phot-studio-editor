import { Modal, SIZE } from 'baseui/modal'

const index = () => {
    return (
        <Modal
            animate
            autoFocus
            size={SIZE.auto}
            overrides={{
                Root: {
                    style: ({ $theme }) => ({
                        zIndex: 500,
                        // margin: "4.3rem 0rem 0rem 22.5rem",
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
                        width: "100%",
                        height: "85vh",
                        margin: "1rem 2rem",
                    }),
                },
            }}
            // onClose={handleClose}
            isOpen={true}
        >


        </Modal>
    )
}

export default index
