import React from 'react';

function Experiencebox() {
    const experiences = [{
        name : 'titulo',
        description : 'kdjhkjhwklghwghrgh',
        photoUrl : 'kljbjkb'
    }];

    return (
        <div>
            <header>
                Tittle
                <button>+</button>
                <img src={experiences[0].photoUrl} alt='labori'/>
            </header>
        </div>
    );
};

export default Experiencebox;
