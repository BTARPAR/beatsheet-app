'use client'
import {useState} from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Timeframe from "@beatsheet-app/lib/ui/Timeframe";
import BeatsTracker from "@beatsheet-app/lib/ui/BeatsTracker";
import AddBeatForm from "@beatsheet-app/lib/Beats/components/AddBeatForm";
import {convertTimeToSeconds} from "@beatsheet-app/lib/Beats/utils";
import {Beat} from "@beatsheet-app/lib/Beats/data-provider/types";
import {MODAL_BOX_STYLE} from "@beatsheet-app/lib/Beats/components/constant";
import {useCreateBeat, useDeleteBeat, useUpdateBeat} from "@beatsheet-app/lib/Beats/data-provider/query";
import styles from "../beats.module.css"
import Link from "next/link";

const Beats = ({data, totalTime, actId}) => {
    // const [beats, setBeats] = useState(data)
    const [showBeat, setShowBeat] = useState(null)
    const {mutate: createMutate} = useCreateBeat()
    const {mutate: deleteMutate} = useDeleteBeat()
    const {mutate: updateMutate} = useUpdateBeat()
    const [open, setOpen] = useState(false)
    const [selectedRange, setSelectedRange] = useState('')
    const [selectedForm, setSelectedForm] = useState(null)

    const getStartTimeInSeconds = !!data.length ? convertTimeToSeconds(data[0].time) : 0

    const modalHandler = (info) => {
        setOpen(true)
        setSelectedRange(info)
    }

    const closeModal = () => {
        setOpen(false)
        setSelectedRange('')
        setSelectedForm(null)
    }

    const handleSubmit = (beat: Beat) => {
        createMutate({actId, beat})
        setOpen(false)
    }

    const handelDelete = (beatId) => {
        deleteMutate({actId, beatId})
    }

    const updateHandler = (beat) => {
        updateMutate(beat)
        setOpen(false)
        setSelectedForm(null)
    }

    const enableUpdate = (beat) => {
        setSelectedForm(beat)
        setOpen(true)
    }

    return (
        <div className={styles.beatsLayout}>
            <div className={styles.home}>
                <Link href={'/'}>Home</Link>
            </div>
            <div className={styles.heading}> Time Range Selector to create new BEAT</div>
            <Timeframe onFrameSelect={modalHandler} totalTime={totalTime} startTime={getStartTimeInSeconds}
                       showBeat={data[showBeat]}/>
            <BeatsTracker beats={data} totalTime={totalTime} startTime={getStartTimeInSeconds} onDelete={handelDelete}
                          onUpdate={enableUpdate} showBeat={setShowBeat}/>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={MODAL_BOX_STYLE}>
                    <AddBeatForm onCancel={closeModal} selectedRange={selectedRange} onSubmit={handleSubmit}
                                 updateBeat={selectedForm} onUpdate={updateHandler}/>
                </Box>
            </Modal>
        </div>
    )
}

export default Beats