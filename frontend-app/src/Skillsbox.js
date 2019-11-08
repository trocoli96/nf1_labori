import React from 'react';

function Skillsbox() {
    const skills = [{
        name : 'titulo',
        number : '2',
        endorsment : 'XY has endorsed this'
    }];

    return (
        <div>
            <header>
                Skills & Endorsment
                <button>+</button>
                <img src={skills[0].name} alt='skill name'/>
            </header>
        </div>
    );
};

export default Skillsbox;
