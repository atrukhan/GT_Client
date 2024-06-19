import React, { useState } from 'react'
import styles from './styles.module.scss'
import axios from "../../../api/axios";
import { MdClose } from "react-icons/md";
import { useTranslation } from "react-i18next";

const FriendForm = ({addChat, visability, setVisability }) => {

    const [searchVal, setSearchVal] = useState('')
    const [users, setUsers] = useState(null)

    const { t, i18n } = useTranslation()

    const getUsersByNickname = async (nick) => {
        try {
            const response = await axios.post('/api/user/users', { nickname: nick })
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const addFriend = async (id) => {
        try {
            const response = await axios.post('/api/user/add_friend', { id: id })
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const handleClose = () => {
        setVisability(false)
        setSearchVal('')
        setUsers(null)
    }

    const searchUsers = (val) => {
        setSearchVal(val)
        getUsersByNickname(val).then(result => setUsers(result))
    }

    const handleAdd = (id) => {
        addFriend(id).then(result => {
            addChat(result)
        })
        handleClose()
    }

    return (
        <div>
            <div className={`${styles.modal_window} ${visability ? styles.show : ''}`}>
                <div className={styles.form_add}>
                    <div className={styles.add_block}>
                        <div className={styles.close}>
                            <span><MdClose onClick={() => { handleClose() }} /></span>
                        </div>
                        <h1>{t('messenger.add_friend')}</h1>
                        <div className={styles.input_box}>
                            <input type="text" placeholder={t('search')} onChange={e => searchUsers(e.target.value)} />
                        </div>
                        <div className={styles.block_checkbox}>
                            {users?.map(el => {
                                return (
                                    <label className={styles.tasks_list_item} onClick={e => handleAdd(el.id)}>
                                        <input type="checkbox" value="1" className={styles.tasks_list_cb} />
                                        <span className={styles.tasks_list_mark}></span>
                                        <span className={styles.tasks_list_desc}>{el.nickname}</span>
                                    </label>
                                )
                            })}

                        </div>
                        {/* <div className={styles.block_item}>
                            <button className={styles.button_addlibrary}>Добавить</button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className={`${styles.modal_window__backdrop} ${visability ? '' : styles.hidden}`} onClick={() => { handleClose() }}></div>
        </div>
    )
}

export default FriendForm