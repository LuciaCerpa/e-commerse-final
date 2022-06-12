import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate()
    const submit = data => {
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res => {
                localStorage.setItem("token", res.data.data.token)
                navigate("/");
                alert("Succesfull login!!")
            })
            .catch(error => {                   
                if(error.response.status === 401){
                    alert("Wrong login, please try again!")
                }
            });
    }

    return (
        <div>
            <Card className='loginContainer'>
                <Card.Body className='login'>
                    <h1>Login</h1>
            <Form onSubmit = {handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control {...register("email")}type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        <p className='text'>We'll never share your email with anyone else.</p>
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register("password")} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Card.Body>
            </Card>
        </div>
    );
};

export default Login;