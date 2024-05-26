import React, { useState, useContext } from 'react'
import styles from './styles.module.scss'
import LibsForm from '../LibsForm'
import { Context } from '../../../index';

const TestsTab = () => {

    const [formVisability, setFormVisability] = useState(false)
    const [type, setType] = useState(-1)

    const store = useContext(Context)

    const startTest = (type, ids) => {
        store.setLibsId(ids)
        switch (type) {
            case 1:
                store.setMainComponent(store.mainComponents.writingTest)
                break
            case 2:
                store.setMainComponent(store.mainComponents.choiceTest)
                break
            case 3:
                store.setMainComponent(store.mainComponents.listenCardTest)
                break
            case 4:
                store.setMainComponent(store.mainComponents.listenSentenceTest)
                break
        }
    }

    const showLibs = (type) => {
        setType(type)
        setFormVisability(true)
    }



    const loadLibsFormComponent = () => {
        if (formVisability) {
            return (
                <LibsForm type={type} visability={formVisability} handleStart={startTest} setVisability={setFormVisability} />
            )
        }
    }

    return (
        <div className={styles.grid}>
            <div className={`${styles.grid_item} ${styles.tiny}`} onClick={() => showLibs(1)}>
                <div className={styles.tiny_flex}>
                    <h1 className={styles.title_themes}>Ввод ответа</h1>
                </div>
            </div>
            <div className={`${styles.grid_item} ${styles.tiny}`} onClick={() => showLibs(2)}>
                <div className={styles.tiny_flex}>
                    <h1 className={styles.title_themes}>Выбор ответа</h1>
                </div>
            </div>
            <div className={`${styles.grid_item} ${styles.tiny}`} onClick={() => showLibs(3)}>
                <div className={styles.tiny_flex}>
                    <h1 className={styles.title_words}>Ввод ответа</h1>
                    <p className={styles.number_words}>(Аудирование)</p>
                </div>
            </div>
            <div className={`${styles.grid_item} ${styles.regular}`}>
                <div className={styles.block_item}>
                    <h1 className={styles.title_words}></h1>
                    <p className={styles.number_words}></p>
                </div>
            </div>
            <div className={`${styles.grid_item} ${styles.regular}`}>
                <div className={styles.block_item}>
                    <h1 className={styles.title_result}></h1>
                    <p className={styles.number_result}></p>
                </div>
            </div>
            <div className={`${styles.grid_item} ${styles.long}`}  onClick={() => showLibs(4)}>
                <div className={styles.block_item}>
                    <h1 className={styles.title_activity}>Составление предложения</h1>
                    <p className={styles.number_words}>(Аудирование)</p>
                </div>
            </div>
            <div className={`${styles.grid_item} ${styles.regular}`}>
                <div className={styles.block_activity}>
                    <h1 className={styles.title_activity}></h1>
                </div>
            </div>
            <div className={`${styles.grid_item} ${styles.regular}`}>
                <div className={styles.block_item}>
                    <h1 className={styles.title_level}></h1>
                    <p className={styles.number_level}></p>
                </div>
            </div>
            {loadLibsFormComponent()}
        </div>
    )
}

export default TestsTab