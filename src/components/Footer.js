import React from 'react';
import facebook from '../assests/facebook.png'
import insta from '../assests/insta.png'

const Footer = () => {
    return (
        <div>
            <div class="footer">
                <img id="academlo" src='https://scontent.fgdl1-4.fna.fbcdn.net/v/t39.30808-6/287178203_3180282872298077_250236634334075648_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHr4ytAy8Ehmvw9fvRLC007F7DSOJ5_ZicXsNI4nn9mJ1SouwtTOACzzwpsvG0MXzCosxPM0f4zIJwuL1UaYtjA&_nc_ohc=Now5W-wzzOsAX-BAeAY&_nc_ht=scontent.fgdl1-4.fna&oh=00_AT8XNCJMBo5gaBOXuLX1HxOMK81lZjzLalb2kuz-3nkFEw&oe=62AB7935' />
                <h4>©Academlo 2022</h4>
                <div>
                    <a href='https://www.facebook.com/academlo/'><img src={facebook} /></a>
                    <a href='https://www.instagram.com/academlohq/?hl=es-la'><img src={insta} /></a>
                </div>
            </div>
        </div>
    );
};

export default Footer;