import React, { useContext, useState } from 'react';
import {styled} from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../contexts/AuthContext';

function LoginPage(props) {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = {
                email: email,
                password: password,
            };

            // Send a POST request to the login endpoint
            const response = await axios.post("http://13.125.164.75/account/signin/", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const { token } = response.data; // Assuming token is inside response.data

            if (token) {
                // Store the access and refresh tokens in localStorage
                localStorage.setItem('accessToken', token.access);
                localStorage.setItem('refreshToken', token.refresh);

                login();
                
                // Navigate to a protected page after successful login
                navigate('/'); // or wherever you want to redirect after login
            }

        } catch (err) {
            console.error('로그인 오류:', err);
            if (err.response && err.response.data) {
                // Display error message from the server
                const data = err.response.data;
                let errorMessage = '로그인에 실패했습니다.';

                if (data.email) {
                    errorMessage = data.email.join(' ');
                } else if (data.password) {
                    errorMessage = data.password.join(' ');
                } else if (data.message) {
                    errorMessage = data.message;
                }

                setError(errorMessage);
            } else {
                setError('네트워크 오류가 발생했습니다.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/sign-up');
    };

    return (
        <Container>
            <Title>CountFit</Title>
            <SubTitle>카운트핏과 함께 건강한 첫걸음을 내딛어보세요! 🏃‍♂️</SubTitle>
           
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? '로그인 중...' : '로그인'}
                </Button>
            </Form>
            <RegisterButton onClick={handleSignUpClick}>회원가입 하러가기</RegisterButton>
        </Container>
    );
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 12vh);
    background-color: #ffffff;
`;

const Title = styled.div`
    font-size: 80px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 8px;
`;

const SubTitle = styled.div`
    font-size: 30px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 32px;
    text-align: center;
    line-height: 1.5;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Input = styled.input`
    padding: 12px 16px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    &:focus {
        border-color: #007BFF;
        outline: none;
    }
`;

const Button = styled.button`
    padding: 12px 16px;
    background-color: #1946A0;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #a0c5f7;
        cursor: not-allowed;
    }
`;

const RegisterButton = styled.div`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #33AB11;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #2e9b10;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 16px;
    font-size: 14px;
`;


export default LoginPage;