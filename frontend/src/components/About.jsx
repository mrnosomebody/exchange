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
            </div>
        </div>
    );
};

export default About;
