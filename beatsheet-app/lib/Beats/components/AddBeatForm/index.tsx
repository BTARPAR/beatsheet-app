'use client'
import {MouseEvent, useRef, useState} from "react";
import {Beat} from "@beatsheet-app/lib/Beats/components/AddBeatForm/types";
import styles from './addBeatForm.module.css'

const AddBeatForm = ({selectedRange, onCancel, onSubmit, updateBeat, onUpdate}) => {
    const isUpdateModalEnable = !updateBeat
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        time: selectedRange,
        content: '',
        cameraAngle: '',
        notes: '',
        ...updateBeat
    });

    const handleCreateAndUpdate = (e) => {
        e.preventDefault()
        if (isUpdateModalEnable) {
            onSubmit && onSubmit(formData as Beat);
        } else {
            onUpdate && onUpdate(formData as Beat);
        }

    };

    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <form onSubmit={handleCreateAndUpdate} className={styles.formContainer} ref={formRef}>
            <h2>
                <span>Create a beat from</span>
                <br/>
                <span>{selectedRange}</span>
            </h2>
            <label>
                Name:
                <input className={styles.formInput} type="text" name="name" value={formData.name}
                       onChange={handleInput}/>
            </label>
            <label>
                Camera Angle:
                <input className={styles.formInput} type="text" name="cameraAngle" value={formData.cameraAngle}
                       onChange={handleInput}/>
            </label>
            <label>
                Content:
                <input className={styles.formInput} type="text" name="content" value={formData.content}
                       onChange={handleInput}/>
            </label>
            <label>
                Notes:
                <input className={styles.formInput} type="text" name="notes" value={formData.notes}
                       onChange={handleInput}/>
            </label>
            <div className={styles.buttonContainer}>
                <button className={styles.secondaryBtn} type="reset" onClick={onCancel}>
                    Cancel
                </button>
                <button className={styles.resetBtn} type="reset" onClick={() => setFormData((prevData) => ({
                    ...prevData,
                    name: '',
                    time: selectedRange,
                    content: '',
                    cameraAngle: '',
                    notes: '',
                }))}>
                    Reset Form
                </button>
                <button className={styles.primaryBtn} type="submit">
                    {isUpdateModalEnable ? 'Create' : 'Update'}
                </button>
            </div>
        </form>
    )
}


export default AddBeatForm