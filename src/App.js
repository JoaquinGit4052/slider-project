import { useState, useEffect } from "react";

import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import data from "./data";
function App() {
    const people = data;
    const [currentPerson, setCurrentPerson] = useState(0);

    useEffect(() => {
        const lastIndex = people.length - 1;
        if (currentPerson < 0) {
            setCurrentPerson(lastIndex);
        }
        if (currentPerson > lastIndex) {
            setCurrentPerson(0);
        }
    }, [currentPerson, people]);

    useEffect(() => {
        let slider = setInterval(() => {
            setCurrentPerson(currentPerson + 1);
        }, 3000);

        return () => clearInterval(slider);
    }, [currentPerson]);

    return (
        <div className='App'>
            <h1>Slider Project</h1>
            <div className='divider' id='divider1'></div>
            <div className='people-container'>
                {people.map((person, index) => {
                    const { id, name, image, title, quote } = people[index];
                    let position = "nextSlide";
                    if (index === currentPerson) {
                        position = "activeSlide";
                    }
                    if (
                        index === currentPerson - 1 ||
                        (currentPerson === 0 && index === people.length - 1)
                    ) {
                        position = "lastSlide";
                    }
                    return (
                        <article className={position} key={id}>
                            <div className='image-container'>
                                <img src={image} alt={name}></img>
                            </div>
                            <h2>{name}</h2>
                            <h4>{title}</h4>
                            <div className='divider' id='divider2'></div>
                            <p>"{quote}"</p>
                        </article>
                    );
                })}
                <button
                    className='prevBtn'
                    onClick={() => {
                        setCurrentPerson(currentPerson - 1);
                    }}>
                    <BsArrowBarLeft />
                </button>
                <button
                    className='nextBtn'
                    onClick={() => {
                        setCurrentPerson(currentPerson + 1);
                    }}>
                    <BsArrowBarRight />
                </button>
            </div>
        </div>
    );
}

export default App;
