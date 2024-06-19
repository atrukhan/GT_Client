import React from 'react'
import styles from './styles.module.scss'
import { useTranslation } from "react-i18next";

const Message = ({ type, time, content }) => {

    const { t, i18n } = useTranslation()

    return (

        <div className={`${styles.chat_msg} ${type == 'owner' ? styles.owner : ''}`}>
            <div className={styles.chat_msg_profile}>
                <img className={styles.chat_msg_img} src="../avatar.jpg" alt="" />
                <div className={styles.chat_msg_date}>{t('messenger.sent')} {time.toString()}</div>
            </div>
            <div className={styles.chat_msg_content}>
                <div className={styles.chat_msg_text}>{content}</div>
            </div>
        </div>

    )
}

export default Message