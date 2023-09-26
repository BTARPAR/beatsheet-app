'use client'
import {useState} from "react";
import {Box, Modal} from "@mui/material";
import AddActForm from "@beatsheet-app/lib/Homepage/components/AddActForm";
import {useAddAct} from "@beatsheet-app/lib/Homepage/data-provider/query";
import styles from "./header.module.css";
import {MODAL_BOX_STYLE} from "@beatsheet-app/lib/Beats/components/constant";

const Header = () => {
    const {mutate} = useAddAct()

    const [open, setOpen] = useState(false)

    const modalHandler = () => {
        setOpen((prevState) => !prevState)
    }

    const handleSubmit = (data) => {
        mutate(data)
        modalHandler()
    }

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>Welcome to Spotter Beat Studio</h1>
                <button className={styles.createButton} onClick={modalHandler}>Create New Act</button>
            </div>
            <Modal
                open={open}
                onClose={modalHandler}
            >
                <Box sx={MODAL_BOX_STYLE}>
                    <AddActForm onCancel={modalHandler} onSubmit={handleSubmit}/>
                </Box>
            </Modal>
        </>
    )
}

export default Header