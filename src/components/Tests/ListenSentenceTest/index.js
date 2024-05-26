import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import axios from "../../../api/axios";
import ResultForm from '../ResultForm';
import { AiOutlineSound } from "react-icons/ai";
import { useSpeechSynthesis } from "react-speech-kit";

const ListenSentenceTest = () => {

    const [isWin, setWin] = useState(false)
    const [isLose, setLose] = useState(false)
    const [results, setResults] = useState([])
    const [mistakes, setMistakes] = useState(0)
    const [testSize, setTestSize] = useState(10)
    const [index, setIndex] = useState(-1)
    const [resultFormVisability, setResultFormVisability] = useState(false)

    const { speak, voices } = useSpeechSynthesis();

    const saveTestResult = async (mistakesCount, cardsCount) => {
        try {
            const response = await axios.post('/api/user/save_test', { 'ids': null, 'mistakesCount': mistakesCount, 'cardsCount': cardsCount })
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }


    useEffect(() => {


        setIndex(0)
        setResults([])


    }, []);

    const checkAnswer = () => {
        // if(answer === cards[index].value){
        //     setResults([...results, {'answer': '-', 'value': true}])
        //     setWin(true)
        // }else{
        //     setMistakes(mistakes+1)
        //     setResults([...results, {'answer': '-', 'value': false}])
        //     setLose(true)
        // }
    }


    const continueTest = () => {
        // setWin(false)
        // setLose(false)
        // if (index+1 < cards.length){
        //     setIndex(index+1)
        // }else{
        //     saveTestResult(mistakes, index+1)
        //     setResultFormVisability(true)
        // }

    }

    const handleSpeak = (event) => {
        event.stopPropagation()
        // speak({ text: cards[index].value, voice: voices[114] })
    }

    const loadResultFormComponent = () => {
        if (resultFormVisability) {
            // return (
            //     <ResultForm visability={resultFormVisability} setVisability={setResultFormVisability} cards={cards} results={results}/>
            // )
        }
    }

    return (
        <div className={styles.container_form}>
            <div className={styles.header_form}>
                <div className={styles.progress_bar_container}>
                    <div className={styles.close_button}>
                        <img src="./close.svg" />
                    </div>
                    <div className={styles.progress_bar}>
                        <div className={styles.progress} style={{ width: `${index / testSize * 100}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={styles.board}>
                <h1 className={styles.board_header}>Write this in English</h1>

                <div class={styles.target_lang_container}>
                    <img class={styles.avatar_img} src="woman.svg" alt="" />
                    <div class={styles.speech_bubble}>
                        <div class={styles.sent_container}>
                            <div className={styles.settings_training}>
                                <a onClick={(event) => { handleSpeak(event) }}><span><AiOutlineSound /></span></a>
                            </div>
                            {/* <img id="speaker" src="/assets/speaker.svg" />
                            <span>Parles</span>
                            <span>-</span>
                            <span>tu</span>
                            <span class="space"></span>
                            <span>francais</span>
                            <span>?</span> */}
                        </div>
                    </div>
                </div>
                <div class={styles.answer_field}></div>
                <div class={styles.random_words_field}></div>
            </div>
            {(!isWin && !isLose) &&
                <div className={styles.footer}>
                    <div className={styles.footer_items_container}>
                        <div className={`${styles.item} ${styles.left}`}>
                            <button>Пропустить</button>
                        </div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={`${styles.item} ${styles.right}`}>
                            <button className="check-button" onClick={() => checkAnswer()}>Проверить</button>
                        </div>
                    </div>
                </div>
            }
            {isWin &&
                <div className={styles.win_footer}>
                    <div className={styles.footer_items_container}>
                        <div className={`${styles.item} ${styles.left}`}>
                            <div className={styles.sign_container}>
                                <img src="https://res.cloudinary.com/nzmai/image/upload/v1605791181/icons/check.png" />
                            </div>
                            <div className={styles.desc_container}>
                                <span className={styles.motivational_word}>Верно</span>
                            </div>
                        </div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={`${styles.item} ${styles.right}`}>
                            <button className={styles.continue_button} onClick={() => continueTest()}>Продолжить</button>
                        </div>
                    </div>
                </div>
            }
            {isLose &&
                <div className={styles.lose_footer}>
                    <div className={styles.footer_items_container}>
                        <div className={`${styles.item} ${styles.left}`}>
                            <div className={styles.sign_container}>
                                <img src="https://res.cloudinary.com/nzmai/image/upload/v1605791181/icons/wrong.png" />
                            </div>
                            <div className={styles.desc_container}>
                                <span className={styles.motivational_word}>Неверно</span>
                            </div>
                        </div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={`${styles.item} ${styles.right}`}>
                            <button className={styles.continue_button_fail} onClick={() => continueTest()}>Продолжить</button>
                        </div>
                    </div>
                </div>
            }
            {loadResultFormComponent()}
        </div>
    )
}

export default ListenSentenceTest