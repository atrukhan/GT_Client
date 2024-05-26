import React, { useState } from 'react'
import styles from './styles.module.scss'
import { MdSettings } from "react-icons/md";
import { AiOutlineSound } from "react-icons/ai";
import { useSpeechSynthesis } from "react-speech-kit";

const UserCard = ({id, value, translation, example, handleEdit }) => {

    const [exampleVisability, setExampleVisability] = useState(false);
    const { speak, voices } = useSpeechSynthesis();

    const handleTurn = () => {
        setExampleVisability(!exampleVisability)
    }

    const handleSpeak = (event) => {
        event.stopPropagation()
        speak({ text: value, voice: voices.find(voice => voice.lang.includes('en-GB')) })
    }

    const handleEditClick = (event) => {
        event.stopPropagation()
        handleEdit(id)
    }

    return (
        <div>
            {exampleVisability ? (
                <div className={styles.status} onClick={() => { handleTurn() }}>
                    <div className={styles.info}>
                        <h3>{example}</h3>
                    </div>
                </div>
            ) : (
                <div className={styles.status} onClick={() => { handleTurn() }}>
                    <div className={styles.info}>
                        <h1>{value}</h1>
                        <h2>{translation}</h2>
                    </div>
                    <div className={styles.settings_training}>
                        <a onClick={e => handleSpeak(e)}><span><AiOutlineSound /></span></a>
                        <a onClick={e => handleEditClick(e)}><span><MdSettings /></span></a>
                    </div>
                </div>
            )}
        </div >
    )
}

export default UserCard