import React, { useContext, useState, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { Context } from '../../index';
import TrainingCard from '../TrainingCard'
import axios from "../../api/axios";
import ReactHammer from 'react-hammerjs';
import TinderCard from 'react-tinder-card'
import { MdArrowBackIos } from "react-icons/md";

const TrainingTab = ({ trainingId }) => {

    const [isLoaded, setLoaded] = useState(false)
    const [cards, setCards] = useState(null)
    const [filterCount, setFilterCount] = useState(-1)
    const store = useContext(Context)

    const cardsRef = useRef(null)
    const containerRef = useRef(null)

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

            result.forEach((el, index, array) => {
                el = { ...el, 'style': { zIndex: array.length, transform: `scale(${(20 - index) / 20}) translateY(${-30 * index}px)`, opacity: (10 - index) / 10 }, 'removed': false }
            });
            setCards(result)
            setFilterCount(0)
            // cardsRef.current = cardsRef.current.slice(0, result.length)
            setLoaded(true)
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

    const handlePan = (event, index) => {

        cardsRef.current.children[index].children[0].classList.add('moving');

        // if (event.deltaX === 0) return;
        // if (event.center.x === 0 && event.center.y === 0) return;

        containerRef.current.classList.toggle('tinder_love', event.deltaX > 0);
        containerRef.current.classList.toggle('tinder_nope', event.deltaX < 0);

        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;

        event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
        console.log(event.deltaX, event.deltaY)
    }

    const handlePanEnd = (event, index) => {
        cardsRef.current.children[0].children[0].classList.remove('moving');

        containerRef.current.classList.remove('tinder_love');
        containerRef.current.classList.remove('tinder_nope');

        var moveOutWidth = document.body.clientWidth;
        var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        // event.target.classList.toggle('removed', !keep);
        // cards[index] = {...cards[index], 'removed': !keep}

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
            // setFilteredCards(cards?.filter((el) => el.removed == false))
            setFilterCount(filterCount + 1)
            cards.forEach((el, index, array) => {
                if (index >= filterCount) {
                    const newIndex = index - filterCount
                    const newLength = array.length - filterCount
                    el = { ...el, 'style': { zIndex: newLength, transform: `scale(${(20 - newIndex) / 20}) translateY(${-30 * newIndex}px)`, opacity: (10 - newIndex) / 10 }, 'removed': false }
                }
            });
        }
    }
    function swiped(direction){
        console.log(direction)
    }
    function leftScreen(){
      
    }

    const swipe = async (dir) => {
        // await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }

    return (
        <div className={styles.container_form}>
            <h1>Training</h1>
            <div className={isLoaded ? `${styles.tinder} ${styles.loaded}` : styles.tinder} ref={containerRef}>
                <div className={styles.tinder__status}>
                    <i className={`${styles.fa} ${styles.fa_remove}`}></i>
                    <i className={`${styles.fa} ${styles.fa_cheak}`}></i>
                </div>
                <div className={styles.tinder__cards} ref={cardsRef}>

                    {cards?.map((el, index) => {
                        return (
                            // card.style.zIndex = allCards.length - index;
                            // card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
                            // card.style.opacity = (10 - index) / 10;
                            // <TrainingCard style={el.style} key={el.id}/>
                            <ReactHammer onPan={(event) => handlePan(event, index)} onPanEnd={(event) => handlePanEnd(event, index)}>
                                <div className={styles.tinder__card} style={el.style} key={el.id} >
                                    <h3>Card 1</h3>
                                    <p>This is a demo for Tinder like swipe cards</p>
                                </div>
                            </ReactHammer>
                            // <TinderCard
                            //     key={el.id}
                            //     className={`swipe ${styles.tinder__card}`}
                            //     preventSwipe = {['up','down']}
                            //     onSwipe={(direction) => swiped(direction)}
                            //     onCardLeftScreen={() => leftScreen()}
                            // >
                            //     {/* <div className={styles.tinder__card}> */}
                            //          <h3>Card 1</h3>
                            //          <p>This is a demo for Tinder like swipe cards</p>
                            //      {/* </div> */}
                            // </TinderCard>

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