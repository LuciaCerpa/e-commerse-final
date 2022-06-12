import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../store/slices/cart.slice';
import SideBar from './SideBar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';



const NavBar = () => {

    const logout = () => localStorage.setItem("token", "")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        const token = localStorage.getItem("token");
        if(token){
            setShow(true);            
        }else{
            navigate("/login")
        }
    }

     useEffect (() => {
         dispatch(getCart())
     },[dispatch])



    return (
        <div>
            <Navbar bg="dark" variant="dark" style={{position:"fixed", zIndex:"1"}}>
                <Container >
                    <Navbar.Brand  href="/#/" >e-commerse</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" >
                            <Nav.Link href="/#/login">Login</Nav.Link>
                            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
                            <Nav.Link role="button" onClick={handleShow}>Cart</Nav.Link>
                            <Nav.Link role="button" onClick={logout}>Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <SideBar show={show} handleClose={handleClose}/>            
        </div>
    );
};

export default NavBar;