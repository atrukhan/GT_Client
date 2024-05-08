import React from 'react'
import styles from './styles.module.scss'
import ChatRoom from '../ChatRoom'
import Message from '../Message'

const MessengerTab = () => {
    return (
        <div className={styles.messenger}>
            <div className={styles.messenger_wrapper}>
                <div className={styles.conversation_area}>
                    <div className={styles.chat_area_header}>
                        <div className={styles.chat_area_title}>Chats</div>
                    </div>
                    <ChatRoom status={'active'} />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom status={'online'} />
                    <ChatRoom status={'online'} />
                    <ChatRoom />
                    <ChatRoom />
                    <ChatRoom />
                    <button className={styles.add}></button>
                    <div className={styles.overlay}></div>
                </div>
                <div className={styles.chat_area}>
                    <div className={styles.chat_area_header}>
                        <div className={styles.chat_area_title}>Group Name</div>
                        <div className={styles.chat_area_group}>
                            <img className={styles.chat_area_profile} src="../imagee/main_page/avatar.jpg" alt="" />
                            <img className={styles.chat_area_profile} src="../imagee/main_page/avatar.jpg" alt="" />
                            <img className={styles.chat_area_profile} src="../imagee/main_page/avatar.jpg" alt="" />
                            <span>+4</span>
                        </div>
                    </div>
                    <div className={styles.chat_area_main}>
                        <Message type={'owner'} />
                        <Message />
                        <Message />
                        <Message type={'owner'} />
                        <Message type={'owner'} />
                        <Message type={'owner'} />
                        <Message />
                    </div>
                    <div className={styles.chat_area_footer}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-paperclip">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
                        <input type="text" placeholder="Type something here..." />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-smile">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up">
                            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessengerTab