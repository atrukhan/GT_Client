import React, { useEffect, useContext, useState } from 'react'
import styles from './styles.module.scss'
import { MdClose } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Context } from '../../../index';
import { useTranslation } from "react-i18next";

const ResultForm = ({ visability, setVisability, cards, results }) => {

    const store = useContext(Context)
    const { t, i18n } = useTranslation()

    const handleClose = () => {
        setVisability(false)
        store.setMainComponent(store.mainComponents.myLibraries)
    }

    return (
        <div>
            <div className={`${styles.modal_window} ${visability ? styles.show : ''}`}>
                <div className={styles.form_add}>
                    <div className={styles.add_block}>
                        <div className={styles.close}>
                            <span><MdClose onClick={() => { handleClose() }} /></span>
                        </div>
                        <h1>{t('tests.result.title')}</h1>
                        <div className={styles.block_resultat}>
                            {
                                cards?.map((element, index) => {
                                    return (
                                        <label className={styles.mistake_list_item}>
                                            <p>{t('tests.result.question')}{element?.translation} {t('tests.result.answer')}{results[index].answer}  {t('tests.result.correct_answer')}{element?.value}</p>
                                            {results[index].value ?
                                                <span className={styles.correct}> <IoMdCheckmarkCircleOutline /></span>
                                                :
                                                <span className={styles.mistake}> <RiCloseCircleLine /></span>
                                            }


                                        </label>
                                    )
                                })
                            }


                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.modal_window__backdrop} ${visability ? '' : styles.hidden}`} onClick={() => { handleClose() }}></div>
        </div>
    )
}

export default ResultForm