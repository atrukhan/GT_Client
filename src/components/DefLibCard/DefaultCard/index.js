import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { AiOutlineSound } from "react-icons/ai";
import { useSpeechSynthesis } from "react-speech-kit";

const DefaultCard = ({ value, translation, example }) => {

    const [exampleVisability, setExampleVisability] = useState(false);
    const { speak, voices } = useSpeechSynthesis()
        // const enVoices = voices.filter(el => el.voiceURI == 'Microsoft Maisie Online (Natural) - English (United Kingdom)')
        // const enVoices = voices.filter(el => el.voiceURI == 'Microsoft Ryan Online (Natural) - English (United Kingdom)')
        // const enVoices = voices.filter(el => el.voiceURI == 'Microsoft Sonia Online (Natural) - English (United Kingdom)')

    const handleTurn = () => {
        setExampleVisability(!exampleVisability)
    }

    const handleSpeak = (event) => {
        event.stopPropagation()

        speak({ text: value, voice: voices.find(voice => voice.lang.includes('en-GB')) })
    }

    return (

        < div >

            {
                exampleVisability ? (
                    <div className={styles.status} onClick={() => { handleTurn() }}>
                        <div className={styles.info}>
                            <h3>{example}</h3>
                        </div>
                    </div >
                ) : (
                    <div className={styles.status} onClick={() => { handleTurn() }}>
                        <div className={styles.info}>
                            <h1>{value}</h1>
                            <h2>{translation}</h2>
                        </div>
                        <div className={styles.settings_training}>
                            <a onClick={(event) => { handleSpeak(event) }}><span><AiOutlineSound /></span></a>
                        </div>
                    </div >

                )}
        </div>



    )
}

export default DefaultCard