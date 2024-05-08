import React from 'react'
import styles from './styles.scss'

const TestsTab = () => {
    return (
        <div className="grid">
            <div className="grid-item tiny">
                <div className="tiny_flex">
                    <h1 className="title_themes">Themes</h1>
                </div>
            </div>
            <div className="grid-item tiny">
                <div className="tiny_flex">
                    <h1 className="title_themes">What the words</h1>
                </div>
            </div>
            <div className="grid-item tiny">
                <div className="tiny_flex">
                    <h1 className="title_themes">Themes</h1>
                </div>
            </div>
            <div className="grid-item regular">
                <div className="block_item">
                    <h1 className="title_words">Audio</h1>
                    <p className="number_words">(translate your page)</p>
                </div>
            </div>
            <div className="grid-item regular">
                <div className="block_item">
                    <h1 className="title_result">Today's Result</h1>
                    <p className="number_result">100–120</p>
                </div>
            </div>
            <div className="grid-item long">
                <div className="block_item">
                    <h1 className="title_activity">What the words</h1>
                    <p className="number_words">(accept correct your page)</p>
                </div>
            </div>
            <div className="grid-item regular">
                <div className="block_activity">
                    <h1 className="title_activity">Activity</h1>
                </div>
            </div>
            <div className="grid-item regular">
                <div className="block_item">
                    <h1 className="title_level">Language Lavel</h1>
                    <p className="number_level">A1</p>
                </div>
            </div>
        </div>
    )
}

export default TestsTab