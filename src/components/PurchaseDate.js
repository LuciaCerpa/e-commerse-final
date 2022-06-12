import React from 'react';

const PurchaseDate = ({ purchase }) => {

    const date = new Date(purchase.createdAt);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: "numeric" }

    const dateString = date.toLocaleDateString(undefined, options)


    return (
        <div>
            <span>{dateString}</span>
        </div>
    );
};

export default PurchaseDate;