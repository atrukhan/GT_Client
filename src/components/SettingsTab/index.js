import React, {useState, useRef} from 'react'
import styles from './styles.module.scss'
import { CFormRange } from '@coreui/react'

const SettingsTab = () => {

    const refRadio = useRef(null)
    const refColor = useRef(null)
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const ref4 = useRef(null)

    const handleRadioClick = (id) => {
        refRadio.current.childNodes.forEach((element) => element.classList.remove(styles.is_active));
        refRadio.current.childNodes[id].classList.toggle(styles.is_active)
    }

    const handleColorClick = (id) => {
        refColor.current.childNodes.forEach((element) => element.classList.remove(styles.selected));
        refColor.current.childNodes[id].classList.toggle(styles.selected)
        const theme = refColor.current.childNodes[id].getAttribute('data-color');
        document.body.setAttribute('data-theme', theme);
    }

    const handleToggleClick = (ref) => {
        ref.current.classList.toggle(styles.is_on)
    }

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.card__body}>
                    <div className={styles.container_form}>
                        <div className={styles.grid}>
                            <h1>Settings</h1>
                        </div>
                    </div>
                    <div className={styles.container_form}>
                        <div className={styles.grid}>
                            <h3 className={styles.form_item__title}>General</h3>
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Name</label>
                            </div>
                            <input type="text" className={styles.input_card} placeholder="Your name" />
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>User Name</label>
                            </div>
                            <input type="text" className={styles.input_card} placeholder="User name" />
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Email</label>
                            </div>
                            <input type="text" className={styles.input_card} placeholder="Your email" />
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Password</label>
                            </div>
                            <input type="text" className={styles.input_card} placeholder="Your password" />
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Show icon in dock</label>
                                <div className={`${styles.form_item__control} ${styles.toggle_setting}`} ref={ref1} onClick={() => handleToggleClick(ref1)}>
                                    <div className={styles.toggle_setting__handle}></div>
                                </div>
                            </div>
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Hide Unlock Extreme button</label>
                                <div className={`${styles.form_item__control} ${styles.toggle_setting}`} ref={ref2} onClick={() => handleToggleClick(ref2)}>
                                    <div className={styles.toggle_setting__handle}></div>
                                </div>
                            </div>
                            <div className={styles.detail_change}>
                                Change Color
                                <div className={styles.colors} ref={refColor}>
                                    <div className={`${styles.color} ${styles.blue} ${styles.selected}`} data-color="blue" onClick={() => handleColorClick(0)}></div>
                                    <div className={`${styles.color} ${styles.purple}`} data-color="purple" onClick={() => handleColorClick(1)}></div>
                                    <div className={`${styles.color} ${styles.green}`} data-color="green" onClick={() => handleColorClick(2)}></div>
                                    <div className={`${styles.color} ${styles.orange}`} data-color="orange" onClick={() => handleColorClick(3)}></div>
                                </div>
                            </div>
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Text information</label>
                                <div className={styles.form_item__control}>
                                    <select className={styles.control} defaultValue="default">
                                        <option value="default">Default</option>
                                        <option value="option_1">Option 1</option>
                                        <option value="option_2">Option 2</option>
                                        <option value="option_3">Option 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Text size</label>
                                <div className={styles.form_item__control}>
                                    <div className={styles.radio} ref={refRadio}>
                                        <div className={styles.radio__item} onClick={ () => handleRadioClick(0)}><span className={styles.u_text__small}>A</span></div>
                                        <div className={`${styles.radio__item} ${styles.is_active}`} onClick={ () => handleRadioClick(1)}><span className={styles.u_text__normal}>A</span></div>
                                        <div className={styles.radio__item} onClick={ () => handleRadioClick(2)}><span className={styles.u_text__large}>A</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.grid}>
                            <h3 className={styles.form_item__title}>Performance</h3>
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Threshold level</label>
                                <div className={styles.form_item__control}><small><strong><span >500</span><span>mb</span></strong></small></div>
                                <div className={styles.slider}>
                                    <input className={styles.slider__input} type="range"  min="0" max="1000" />
                                </div>
                            </div>
                            <p className={styles.form_item__smallp}><small>If the available memory goes below this amount, the status bar text will turn red.</small></p>
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Auto clean</label>
                                <div className={`${styles.form_item__control} ${styles.toggle_setting}`} ref={ref3} onClick={() => handleToggleClick(ref3)}>
                                    <div className={styles.toggle_setting__handle}></div>
                                </div>
                            </div>
                            <p className={styles.form_item__smallp}><small>Automatically clean when available memory drops below the above threshold. Auto clean is limited to once every 3 minutes.</small></p>
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Disable auto clean cooldown</label>
                                <div className={`${styles.form_item__control} ${styles.toggle_setting}`} ref={ref4} onClick={() => handleToggleClick(ref4)}>
                                    <div className={styles.toggle_setting__handle}></div>
                                </div>
                            </div>
                            <p><small>Auto clean cooldown: <strong>136 seconds</strong></small></p>
                            <div className={styles.form_item}>
                                <label className={styles.form_item__label}>Refresh interval</label>
                                <div className={styles.form_item__control}><small><strong><span>5</span><span>&nbsp;seconds</span></strong></small></div>
                                <div className={styles.slider}>
                                    <input className={styles.slider__input} type="range" min="0" max="20" />
                                </div>
                            </div>
                            <p className={styles.form_item__smallp}><small>If the available memory goes below this amount, the status bar text will turn red.</small></p>
                            <div className={styles.buttons}>
                                <button className={styles.button}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsTab