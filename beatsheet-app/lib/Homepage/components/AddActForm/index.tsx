'use client'
import {useRef, useState} from "react";
import styles from './addActForm.module.css'

const AddActForm = ({onCancel, onSubmit}) => {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({name: ''});

    const handleCreate = (e) => {
        e.preventDefault()
        onSubmit && onSubmit(formData);
    };

    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <form onSubmit={handleCreate} className={styles.formContainer} ref={formRef}>
            <h2>
                <span>Create a Act</span>
            </h2>
            <label>
                Name:
                <input className={styles.formInput} type="text" name="name" value={formData.name}
                       onChange={handleInput}/>
            </label>

            <div className={styles.buttonContainer}>
                <button className={styles.secondaryBtn} type="reset" onClick={onCancel}>
                    Cancel
                </button>
                <button className={styles.resetBtn} type="reset"
                        onClick={() => setFormData((prevData) => ({
                                ...prevData, name: '',
                            }
                        ))}>
                    Reset Form
                </button>
                <button className={styles.primaryBtn} type="submit">
                    Add Act
                </button>
            </div>
        </form>
    )
}


export default AddActForm