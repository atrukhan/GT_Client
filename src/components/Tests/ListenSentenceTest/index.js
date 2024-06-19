import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import axios from "../../../api/axios";
import ResultForm from '../ResultForm';
import { AiOutlineSound } from "react-icons/ai";
import { useSpeechSynthesis } from "react-speech-kit";
import { useTranslation } from "react-i18next";

const ListenSentenceTest = () => {

    const [isWin, setWin] = useState(false)
    const [isLose, setLose] = useState(false)
    const [results, setResults] = useState([])
    const [mistakes, setMistakes] = useState(0)
    const [testSize, setTestSize] = useState(5)
    const [index, setIndex] = useState(-1)
    const [resultFormVisability, setResultFormVisability] = useState(false)
    const [sentence, setSentence] = useState(null)
    const [answer, setAnswer] = useState([])

    const { speak, voices } = useSpeechSynthesis();
    const { t, i18n } = useTranslation()

    let testSentences = [
        {
            ru: 'Сколько времени тебе требуется, чтобы добраться до работы',
            en: 'how long does it take you to get to work',
            value: 'how long does it take you to get to work'
        },
        {
            ru: 'Почему это видео такое интересное',
            en: 'why is this video so interesting',
            value: 'why is this video so interesting'
        },
        {
            ru: 'В чем заключается твоя работа',
            en: 'what is your job',
            value: 'what is your job'
        },

        {
            ru: 'Почему твой босс критикует это',
            en: 'why does your boss criticize it',
            value: 'why does your boss criticize it'
        },
        {
            ru: 'Как твоя сестра себя чувствует',
            en: 'how does your sister feel',
            value: 'how does your sister feel'
        },
    ]

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
        setAnswer([])
        setSentence(testSentences[0].en.split(' ').sort(() => Math.random() - 0.5))

    }, []);

    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    const checkAnswer = () => {
        if (arraysEqual(answer, testSentences[index].en.split(' '))) {
            setResults([...results, { 'answer': answer.join(' '), 'value': true }])
            setWin(true)
        } else {
            setMistakes(mistakes + 1)
            setResults([...results, { 'answer': answer.join(' '), 'value': false }])
            setLose(true)
        }
    }


    const continueTest = () => {
        setWin(false)
        setLose(false)
        if (index + 1 < testSentences.length) {
            setIndex(index + 1)
            setSentence(testSentences[index + 1].en.split(' ').sort(() => Math.random() - 0.5))
            setAnswer([])
        } else {
            saveTestResult(mistakes, index + 1)
            setResultFormVisability(true)
        }

    }

    const handleSpeak = (event) => {
        event.stopPropagation()
        console.log(voices.find(voice => voice.lang.includes('ru-RU')))
        speak({ text: testSentences[index].ru, voice: voices.find(voice => voice.lang.includes('ru-RU') && voice.voiceURI === 'Microsoft Dmitry Online (Natural) - Russian (Russia)') })
    }

    const loadResultFormComponent = () => {
        if (resultFormVisability) {
            return (
                <ResultForm visability={resultFormVisability} setVisability={setResultFormVisability} cards={testSentences} results={results} />
            )
        }
    }

    const addToAnswer = (val) => {
        sentence.splice(sentence.findIndex(a => a === val), 1)
        setSentence(sentence)
        setAnswer([...answer, val])
    }
    const removeFromAnswer = (val) => {
        answer.splice(answer.findIndex(a => a === val), 1)
        setAnswer(answer)
        setSentence([...sentence, val])
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
                <h1 className={styles.board_header}>{t('tests.listen_sentence_test')}</h1>

                <div class={styles.target_lang_container}>
                    <img class={styles.avatar_img} src="woman.svg" alt="" />
                    <div class={styles.speech_bubble}>
                        <div class={styles.sent_container}>
                            <div className={styles.settings_training}>
                                <a onClick={(event) => { handleSpeak(event) }}><span><AiOutlineSound /></span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class={styles.answer_field}>
                    {answer?.map(el => {
                        return (
                            <button className={styles.added} style={{ height: '57px' }} onClick={e => removeFromAnswer(el)}>{el}</button>
                            // <div className={styles.placeholder} style={{height: '57px'}} onClick={e => removeFromAnswer(el)}><button className={styles.word}>{el}</button></div>
                        )
                    })}
                </div>
                <div class={styles.random_words_field}>
                    {sentence?.map(el => {
                        return (
                            <div className={styles.placeholder} style={{ height: '57px' }} onClick={e => addToAnswer(el)}><button className={styles.word}>{el}</button></div>
                        )
                    })}
                </div>
            </div>
            {(!isWin && !isLose) &&
                <div className={styles.footer}>
                    <div className={styles.footer_items_container}>
                        <div className={`${styles.item} ${styles.left}`}>
                            <button>{t('tests.skip')}</button>
                        </div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={`${styles.item} ${styles.right}`}>
                            <button className="check-button" onClick={() => checkAnswer()}>{t('tests.check')}</button>
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
                                <span className={styles.motivational_word}>{t('tests.true')}</span>
                            </div>
                        </div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={`${styles.item} ${styles.right}`}>
                            <button className={styles.continue_button} onClick={() => continueTest()}>{t('tests.continue')}</button>
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
                                <span className={styles.motivational_word}>{t('tests.false')}</span>
                            </div>
                        </div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={`${styles.item} ${styles.right}`}>
                            <button className={styles.continue_button_fail} onClick={() => continueTest()}>{t('tests.continue')}</button>
                        </div>
                    </div>
                </div>
            }
            {loadResultFormComponent()}
        </div>
    )
}

export default ListenSentenceTest