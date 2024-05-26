import React from 'react'
import styles from './styles.module.scss'

const ChatRoom = ({ status }) => {


    const loadImageComponent = () => {
        if (status == 'active')
            return (
                <div className={`${styles.msg_profile} ${styles.group}`}>
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5" />
                        <path d="M22 8.5l-10 7-10-7" />
                        <path d="M2 15.5l10-7 10 7M12 2v6.5" /></svg>
                </div>
            )
        else
            return (
                <img className={styles.msg_profile} src="../avatar.jpg" alt="" />
            )
    }

    return (
        <div className={`${styles.msg} ${status == 'active' ? styles.active : status == 'online' ? styles.online : ''}`}>

            {loadImageComponent()}

            <div className={styles.msg_detail}>
                <div className={styles.msg_username}>Madison Jones</div>
                <div className={styles.msg_content}>
                    <span className={styles.msg_message}>Последний раз был онлайн</span>
                    <span className={styles.msg_date}>20m</span>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom