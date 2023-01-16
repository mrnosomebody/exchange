import React from 'react';
import '../styles/About.css'

const About = () => {
    return (
        <div className="main">
            <div className="centered">
                <h1>Hey! Hope you'll like it</h1>
            </div>
            <div className="flex">
                <div className="left-part">
                    <h2>It's a crypto exchange simulator. It has been done with:</h2>
                    <ul className="ul">
                        <li className="li">Python</li>
                        <li className="li">Django</li>
                        <li className="li">Django Rest Framework</li>
                        <li className="li">Django Channels</li>
                        <li className="li">PostgreSQL</li>
                        <li className="li">Docker</li>
                        <li className="li">React</li>
                        <li className="li">JWT</li>
                    </ul>
                </div>
                <div className="right-part">
                    <h2>I am backend developer, but in this task I had to
                        implement front part using React, so that's my first time ever
                        using it. That's my first time using websockets as well.
                    </h2>
                    <br/>
                    <h2><u>So what's this all about?</u>
                        <br/>
                        You can go to the "Market" and you'll get all available trading
                        pairs with its' real-time prices. All of them are being got using only 1
                        websocket connection. On click on any pair you get to the trading page, where you
                        can see all open "Buy" and "Sell" orders, as well as Your orders,
                        and real-time price. You can create an order, track it's status and cancel it
                    </h2>

                </div>
            </div>
        </div>
    );
};

export default About;