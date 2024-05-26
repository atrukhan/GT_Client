import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import axios from "../../../api/axios";
import ResultForm from '../ResultForm';

const WritingTest = ({ ids }) => {

    const [isWin, setWin] = useState(false)
    const [isLose, setLose] = useState(false)
    const [cards, setCards] = useState(null)
    const [results, setResults] = useState([])
    const [index, setIndex] = useState(-1)
    const [answer, setAnswer] = useState("")
    const [mistakes, setMistakes] = useState(0)
    const [resultFormVisability, setResultFormVisability] = useState(false)


    const getTestCards = async (ids) => {
        try {
            const response = await axios.post('/api/user/test_cards', { 'ids': ids })
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const saveTestResult = async (ids, mistakesCount, cardsCount) => {
        try {
            const response = await axios.post('/api/user/save_test', { 'ids': ids, 'mistakesCount': mistakesCount, 'cardsCount': cardsCount })
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const shuffleCards = (array) => {
        setCards(array?.sort(() => Math.random() - 0.5))
    }

    useEffect(() => {

        getTestCards(ids).then(result => {
            setIndex(0)
            shuffleCards(result)
            setResults([])
        })

    }, []);

    const checkAnswer = () => {
        if(answer === cards[index].value){
            setResults([...results, {'answer': answer, 'value': true}])
            setWin(true)
        }else{
            setMistakes(mistakes+1)
            setResults([...results, {'answer': answer, 'value': false}])
            setLose(true)
        }
    }


    const continueTest = () => {
        setWin(false)
        setLose(false)
        setAnswer('')
        if (index+1 < cards.length){
            setIndex(index+1)
        }else{
            saveTestResult(ids, mistakes, index+1)
            setResultFormVisability(true)
        }
        
    }

    const loadResultFormComponent = () => {
        if(resultFormVisability){
            return (
                <ResultForm visability={resultFormVisability} setVisability={setResultFormVisability} cards={cards} results={results}/>
            )
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
                        <div className={styles.progress} style={{width: `${index / cards?.length * 100}%`}}></div>
                    </div>
                </div>
            </div>
            {cards != null &&
                <div className={styles.board}>
                    <h1 className={styles.board_header}>Введите перевод слова: {cards[index].translation}</h1>
                    <div className={styles.blocks_card}>
                        <h2 className="text">Ваш ответ:</h2>
                        <input type="text" className={styles.input_card} placeholder="" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                    </div>
                </div>
            }
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

export default WritingTest