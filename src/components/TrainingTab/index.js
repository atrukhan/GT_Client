import React, { useContext, useState, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { Context } from '../../index';
import axios from "../../api/axios";
import ReactHammer from 'react-hammerjs';
import { FaCheck, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const TrainingTab = ({ trainingId }) => {

    const [isLoaded, setLoaded] = useState(false)
    const [cards, setCards] = useState(null)
    const [filterCount, setFilterCount] = useState(-1)
    const [isFrontSide, setFrontSide] = useState(true)
    const store = useContext(Context)

    const cardsRef = useRef(null)
    const containerRef = useRef(null)
    const { t, i18n } = useTranslation()



    const getTrainingCards = async (id) => {
        try {
            const response = await axios.get(`/api/user/training_cards/${id}`)
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }

    const moveCard = async (trainingId, cardId, up) => {
        try {
            const response = await axios.post(`/api/user/move_card/${trainingId}/${cardId}`, { "up": up })
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }


    useEffect(() => {
        getTrainingCards(trainingId).then(result => {
            const newRes = result.map((el, index, array) => {
                return { ...el, style: { zIndex: `${array.length - index}`, transform: `scale(${(20 - index) / 20}) translateY(${-30 * index}px)`, opacity: `${(10 - index) / 10}` }, 'isFrontSide': true }
            });

            setCards(newRes)
            setFilterCount(0)
            setLoaded(true)
        });

    }, []);


    const handleBtnClick = (event, love) => {
        event.preventDefault();
        var moveOutWidth = document.body.clientWidth * 1.5;

        if (filterCount >= cards.length) return false;

        const tempFilterCount = filterCount + 1
        setFilterCount(tempFilterCount)
        const newCards = cards.map((el, index, array) => {
            if (index >= tempFilterCount) {
                const newIndex = index - tempFilterCount
                const newLength = array.length - tempFilterCount
                return { ...el, style: { zIndex: `${newLength - newIndex}`, transform: `scale(${(20 - newIndex) / 20}) translateY(${-30 * newIndex}px)`, opacity: `${(10 - newIndex) / 10}` } }
            } else if (index == tempFilterCount - 1) {
                if (love) {
                    return { ...el, style: { zIndex: el.style.zIndex, transform: `translate(${moveOutWidth}px, -100px) rotate(-30deg)`, opacity: el.style.opacity, transition: 'all 0.2s ease-in-out' } }
                } else {
                    return { ...el, style: { zIndex: el.style.zIndex, transform: `translate(-${moveOutWidth}px, -100px) rotate(30deg)`, opacity: el.style.opacity, transition: 'all 0.2s ease-in-out' } }
                }
            } else {
                return el
            }
        });
        setCards(newCards)
        if (love) {
            moveCard(trainingId, cards[tempFilterCount - 1].id, true)
        } else {
            moveCard(trainingId, cards[tempFilterCount - 1].id, false)
        }
    }


    const handlePan = (event, index) => {

        cardsRef.current.children[index].children[0].classList.add('moving');

        // if (event.deltaX === 0) return;
        // if (event.center.x === 0 && event.center.y === 0) return;

        containerRef.current.classList.toggle(styles.tinder_love, event.deltaX > 0);
        containerRef.current.classList.toggle(styles.tinder_nope, event.deltaX < 0);

        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;

        event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
        console.log(event.deltaX, event.deltaY)
    }

    const handlePanEnd = (event, index) => {
        cardsRef.current.children[0].children[0].classList.remove('moving');

        containerRef.current.classList.remove(styles.tinder_love);
        containerRef.current.classList.remove(styles.tinder_nope);

        var moveOutWidth = document.body.clientWidth;
        var keep = Math.abs(event.deltaX) <= 80 || Math.abs(event.velocityX) < 0.5;

        if (keep) {
            event.target.style.transform = '';
        } else {
            var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
            var toX = event.deltaX > 0 ? endX : -endX;
            var endY = Math.abs(event.velocityY) * moveOutWidth;
            var toY = event.deltaY > 0 ? endY : -endY;
            var xMulti = event.deltaX * 0.03;
            var yMulti = event.deltaY / 80;
            var rotate = xMulti * yMulti;

            event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
            event.target.style.transition = 'all 0.2s ease-in-out'

            const tempFilterCount = filterCount + 1
            setFilterCount(tempFilterCount)
            const newCards = cards.map((el, index, array) => {
                if (index >= tempFilterCount) {
                    const newIndex = index - tempFilterCount
                    const newLength = array.length - tempFilterCount
                    return { ...el, style: { zIndex: `${newLength - newIndex}`, transform: `scale(${(20 - newIndex) / 20}) translateY(${-30 * newIndex}px)`, opacity: `${(10 - newIndex) / 10}` } }
                } else {
                    return el
                }
            });
            setCards(newCards)
            if (event.deltaX > 0) {
                moveCard(trainingId, cards[tempFilterCount - 1].id, true)
            } else {
                moveCard(trainingId, cards[tempFilterCount - 1].id, false)
            }
        }
    }

    const handleTap = (event) => {
        const newCards = cards.map((el, index, array) => {
            if (index == filterCount) {
                return { ...el, isFrontSide: !el.isFrontSide }
            } else {
                return el
            }
        });
        setCards(newCards)
    }

    const handleBack = () => {
        store.setMainComponent(store.mainComponents.myLibraries)
    }

    return (
        <div className={styles.container_form}>
            <h1>{t('training.title')}</h1>
            <div className={isLoaded ? `${styles.tinder} ${styles.loaded}` : styles.tinder} ref={containerRef}>
                <div className={styles.tinder__status}>
                    <span className={`${styles.fa} ${styles.fa_remove}`}><FaTimes /></span>
                    <span className={`${styles.fa} ${styles.fa_check}`}><FaCheck /></span>
                </div>
                <div className={styles.tinder__cards} ref={cardsRef}>

                    {cards?.length > filterCount ? cards?.map((el, index) => {
                        return (
                            <ReactHammer onPan={(event) => handlePan(event, index)} onPanEnd={(event) => handlePanEnd(event, index)} onTap={event => handleTap(event)} key={el.id}>
                                <div className={styles.tinder__card} style={el.style}>
                                    {el.isFrontSide ? <h3 >{el.value}</h3> : <h3>{el.translation}</h3>}
                                </div>
                            </ReactHammer>
                        )
                    }) :
                        <ReactHammer onTap={event => handleBack()} >
                            <div className={styles.tinder__card}>
                                <h3 className={styles.lastcard}>{t('training.ended_card')}</h3>
                            </div>
                        </ReactHammer>
                    }



                </div>
                <div className={styles.tinder__buttons}>
                    <button disabled={cards?.length == filterCount} onClick={e => handleBtnClick(e, false)}><span className={`${styles.fa} ${styles.fa_remove}`}><FaTimes /></span></button>
                    <button disabled={cards?.length == filterCount} onClick={e => handleBtnClick(e, true)}><span className={`${styles.fa} ${styles.fa_check}`}><FaCheck /></span></button>
                </div>
            </div>
        </div>
    )
}

export default TrainingTab