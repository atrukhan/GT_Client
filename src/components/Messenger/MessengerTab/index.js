import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.scss'
import ChatRoom from '../ChatRoom'
import Message from '../Message'
import axios from "../../../api/axios";
import FriendForm from '../FriendForm'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client';
import { Context } from '../../../index';
import { useTranslation } from "react-i18next";

var stompClient = null

const MessengerTab = () => {

    const [formVisability, setFormVisability] = useState(false)
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState(null)
    const [currentReceiverId, setCurrentReceiverId] = useState(-1)
    const [currentChatId, setCurrentChatId] = useState("")
    const [allMessages, setAllMessages] = useState(new Map())

    const store = useContext(Context)
    const { t, i18n } = useTranslation()

    const loadFriendFormComponent = () => {
        if (formVisability) {
            return (
                <FriendForm addChat={addChat} visability={formVisability} setVisability={setFormVisability} />
            )
        }
    }

    const addChat = (chat) => {
        setChats([...chats, chat])
    }

    const handleAddClick = () => {
        setFormVisability(true)
    }

    const getChats = async () => {
        try {
            const response = await axios.get('/api/user/chats')
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const getMessages = async (id) => {
        try {
            const response = await axios.get(`/api/user/messages/${id}`)
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    useEffect(() => {

        getChats().then(result => setChats(result))
        connect()
    }, [])

    const connect = () => {
        let Sock = new SockJS("http://localhost:8080/ws")
        stompClient = Stomp.over(Sock)
        stompClient.connect({}, onConnected, onError)
    }

    const onConnected = () => {
        console.log("connected")
        stompClient.subscribe(
            "/user/" + store.user.id + "/private",
            onMessageReceived
        )
    }

    const onError = (err) => {
        console.log(err);
    }

    const onMessageReceived = (payload) => {
        let data = JSON.parse(payload.body)
        if (allMessages.get(data.chatId)) {
            allMessages.get(data.chatId).push(data)
            setAllMessages(new Map(allMessages))
        } else {
            let list = []
            list.push(data)
            allMessages.set(data.chatId, list)
            setAllMessages(new Map(allMessages))
        }
    }

    const sendMessage = () => {
        if (stompClient) {
            const msg = {
                chatId: currentChatId,
                senderId: store.user.id,
                receiverId: currentReceiverId,
                content: message,
                time: new Date(),
            }
            if (allMessages.get(currentChatId)) {
                allMessages.get(currentChatId).push(msg)
                setAllMessages(new Map(allMessages))
            } else {
                let list = []
                list.push(msg)
                allMessages.set(currentChatId, list)
                setAllMessages(new Map(allMessages))
            }

            stompClient.send("/app/private-msg", {}, JSON.stringify(msg));
            setMessage('')
        }
    }

    const changeChat = (receiverId, chatId) => {
        getMessages(chatId).then(result => {
            if (allMessages.get(chatId)) {
                result.forEach(msg => {
                    allMessages.get(chatId).push(msg)
                })
                setAllMessages(new Map(allMessages))
            } else {
                allMessages.set(chatId, result)
                setAllMessages(new Map(allMessages))
            }
        })
        setCurrentReceiverId(receiverId)
    }

    const handleSendBtn = (e) => {
        if (e.keyCode == 13) {
            sendMessage()
        }
    }

    return (
        <div className={styles.messenger}>
            <div className={styles.messenger_wrapper}>
                <div className={styles.conversation_area}>
                    <div className={styles.chat_area_header}>
                        <div className={styles.chat_area_title}>{t('messenger.chats')}</div>
                    </div>
                    <ChatRoom status={currentReceiverId == -1 ? 'active' : ''} nickname={'App'} receiverId={-1} handleClick={changeChat} />
                    {
                        chats?.map((el, index) => {
                            return (
                                <ChatRoom status={currentReceiverId == el.receiverId ? 'active' : 'online'} chatId={el.chatId} receiverId={el.receiverId} nickname={el.receiverNickname} handleClick={changeChat} key={index} />
                            )
                        })
                    }
                    <button className={styles.add} onClick={e => handleAddClick()}></button>
                    <div className={styles.overlay}></div>
                </div>
                <div className={styles.chat_area}>
                    <div className={styles.chat_area_header}>
                        <div className={styles.chat_area_title}>{t('messenger.chat')}</div>
                        <div className={styles.chat_area_group}>
                            {/* <img className={styles.chat_area_profile} src="../imagee/main_page/avatar.jpg" alt="" />
                            <img className={styles.chat_area_profile} src="../imagee/main_page/avatar.jpg" alt="" />
                            <img className={styles.chat_area_profile} src="../imagee/main_page/avatar.jpg" alt="" />
                            <span>+4</span> */}
                        </div>
                    </div>
                    <div className={styles.chat_area_main}>
                        {
                            allMessages?.get(currentReceiverId)?.map((el, index) => {
                                return (
                                    <Message type={el.senderId == store.user.id ? 'owner' : ''} time={el.time} content={el.content} key={index} />
                                );
                            })
                        }
                    </div>
                    <div className={styles.chat_area_footer}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-paperclip">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
                        <input type="text" placeholder={t('messenger.write_anything')} value={message} onChange={e => setMessage(e.target.value)} onKeyUp={e => handleSendBtn(e)} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-smile">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up">
                            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
                    </div>
                </div>
            </div>
            {loadFriendFormComponent()}
        </div>
    )
}

export default MessengerTab