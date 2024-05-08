import React from 'react'
import styles from './styles.module.scss'

const Message = ({ type }) => {
    return (

        <div className={`${styles.chat_msg} ${type == 'owner' ? styles.owner : ''}`}>
            <div className={styles.chat_msg_profile}>
                <img className={styles.chat_msg_img} src="../avatar.jpg" alt="" />
                <div className={styles.chat_msg_date}>Message seen 1.22pm</div>
            </div>
            <div className={styles.chat_msg_content}>
                <div className={styles.chat_msg_text}>Sit amet risus nullam eget felis eget. Dolor sed viverra ipsum😂😂😂</div>
                <div className={styles.chat_msg_text}>Cras mollis nec arcu malesuada tincidunt.</div>
            </div>
        </div>

    )
}

export default Message