import React from 'react';
import "../styles/loadingScreen.css"

const LoadingScreen = () => {
    return (
        <div class="overlay">
            <div class="lds-roller"><div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
};

export default LoadingScreen;