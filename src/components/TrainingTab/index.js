import React, { useContext, useState, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { Context } from '../../index';
import TrainingCard from '../TrainingCard'
import axios from "../../api/axios";
import { MdArrowBackIos } from "react-icons/md";

const TrainingTab = ({ trainingId }) => {

    const [isLoaded, setLoaded] = useState(false)
    const [cards, setCards] = useState(null)
    const store = useContext(Context)

    const getTrainingCards = async (id) => {
        try {
            
            const response = await axios.get(`/api/user/training_cards/${id}`)
            console.log(response)
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message)
            return null
        }
    }


    useEffect(() => {

        getTrainingCards(trainingId).then(result => {
            console.log(result)
            result.forEach((el, index, array) => {
                el = {...el, 'style':{zIndex:array.length, transform:`scale(${(20 - index) / 20}) translateY(${-30 * index}px)`, opacity:(10 - index) / 10}}
            });
            setCards(result)
            console.log(result)
        });

    }, []);

    const handleCloseLibrary = () => {
        // if (isDef)
        //     store.setMainComponent(store.mainComponents.allLibraries)
        // else
        //     store.setMainComponent(store.mainComponents.myLibraries)
    }


    // var tinderContainer = document.querySelector('.tinder');
    // var allCards = document.querySelectorAll('.tinder--card');
    // var nope = document.getElementById('nope');
    // var love = document.getElementById('love');

    // function initCards(card, index) {
    //     var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

    //     newCards.forEach(function (card, index) {
    //         card.style.zIndex = allCards.length - index;
    //         card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
    //         card.style.opacity = (10 - index) / 10;
    //     });

    //     tinderContainer.classList.add('loaded');
    // }

    // initCards();

    // allCards.forEach(function (el) {
    //     var hammertime = new Hammer(el);

    //     hammertime.on('pan', function (event) {
    //         el.classList.add('moving');
    //     });

    //     hammertime.on('pan', function (event) {
    //         if (event.deltaX === 0) return;
    //         if (event.center.x === 0 && event.center.y === 0) return;

    //         tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
    //         tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

    //         var xMulti = event.deltaX * 0.03;
    //         var yMulti = event.deltaY / 80;
    //         var rotate = xMulti * yMulti;

    //         event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    //     });

    //     hammertime.on('panend', function (event) {
    //         el.classList.remove('moving');
    //         tinderContainer.classList.remove('tinder_love');
    //         tinderContainer.classList.remove('tinder_nope');

    //         var moveOutWidth = document.body.clientWidth;
    //         var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

    //         event.target.classList.toggle('removed', !keep);

    //         if (keep) {
    //             event.target.style.transform = '';
    //         } else {
    //             var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
    //             var toX = event.deltaX > 0 ? endX : -endX;
    //             var endY = Math.abs(event.velocityY) * moveOutWidth;
    //             var toY = event.deltaY > 0 ? endY : -endY;
    //             var xMulti = event.deltaX * 0.03;
    //             var yMulti = event.deltaY / 80;
    //             var rotate = xMulti * yMulti;

    //             event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
    //             initCards();
    //         }
    //     });
    // });

    // function createButtonListener(love) {
    //     return function (event) {
    //         var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    //         var moveOutWidth = document.body.clientWidth * 1.5;

    //         if (!cards.length) return false;

    //         var card = cards[0];

    //         card.classList.add('removed');

    //         if (love) {
    //             card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    //         } else {
    //             card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    //         }

    //         initCards();

    //         event.preventDefault();
    //     };
    // }

    // var nopeListener = createButtonListener(false);
    // var loveListener = createButtonListener(true);

    // nope.addEventListener('click', nopeListener);
    // love.addEventListener('click', loveListener);

    return (
        <div className={styles.container_form}>
            <h1>Training</h1>
            <div className={styles.tinder}>
                <div className={styles.tinder__status}>
                    <i className={`${styles.fa} ${styles.fa_remove}`}></i>
                    <i className={`${styles.fa} ${styles.fa_cheak}`}></i>
                </div>
                <div className={styles.tinder__cards}>

                    {cards?.map((el) => {
                        return (
                            // card.style.zIndex = allCards.length - index;
                            // card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
                            // card.style.opacity = (10 - index) / 10;
                            <TrainingCard key={el.id}/>
                        )
                    })}

                </div>
                <div className={styles.tinder__buttons}>
                    <button id="nope"><i className={`${styles.fa} ${styles.fa_remove}`}></i></button>
                    <button id="love"><i className={`${styles.fa} ${styles.fa_cheak}`}></i></button>
                </div>
            </div>
        </div>
    )
}

export default TrainingTab