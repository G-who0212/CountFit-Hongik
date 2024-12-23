import React, { useState, useEffect }from 'react';
import {styled} from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [nicknameError, setNicknameError] = useState('');

    const navigate = useNavigate();

    const emailRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const noErrors = !emailError && !passwordError && !confirmPasswordError && !nicknameError;
        const allRequiredFilled = email && password && confirmPassword && nickname;
        setIsFormValid(noErrors && allRequiredFilled);
    }, [emailError, passwordError, confirmPasswordError, nicknameError, email, password, confirmPassword, nickname]);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value === '') {
            setEmailError('이메일을 입력해주세요');
        } else if (!emailRegex.test(value)) {
            setEmailError('이메일 형식에 맞게 입력해주세요');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value === '') {
            setPasswordError('비밀번호를 입력해주세요');
        } else if (value.length < 6) {
            setPasswordError('비밀번호는 6자리 이상 입력해주세요');
        } else {
            setPasswordError('');
        }

        // 또한 비밀번호 확인도 업데이트
        if (confirmPassword && value !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value === '') {
            setConfirmPasswordError('비밀번호를 다시 입력해주세요');
        } else if (value !== password) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        setNickname(value);
        if (value.trim() === '') {
            setNicknameError('닉네임을 입력해주세요');
        } else {
            setNicknameError('');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        
        let valid = true;

        // 이메일 검증
        if (email.trim() === '') {
            setEmailError('이메일을 입력해주세요');
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('이메일 형식에 맞게 입력해주세요');
            valid = false;
        } else {
            setEmailError('');
        }

        // 비밀번호 검증
        if (password === '') {
            setPasswordError('비밀번호를 입력해주세요');
            valid = false;
        } else if (password.length < 6) {
            setPasswordError('비밀번호는 6자리 이상 입력해주세요');
            valid = false;
        } else {
            setPasswordError('');
        }

        // 비밀번호 확인 검증
        if (confirmPassword === '') {
            setConfirmPasswordError('비밀번호를 다시 입력해주세요');
            valid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        // 닉네임 검증
        if (nickname.trim() === '') {
            setNicknameError('닉네임을 입력해주세요');
            valid = false;
        } else {
            setNicknameError('');
        }

        if (!valid) {
            return;
        }

        setIsLoading(true);

        try {
            const parsedAge = age ? parseInt(age, 10) : undefined;

            const data = {
                email: email,
                nickname: nickname,
                password: password,
                password2: confirmPassword,
                gender: gender,
                ...(parsedAge !== undefined && { age: parsedAge })
            };
            const response = await axios.post("http://13.125.164.75/account/signup/", data, {
                headers: {
                    "Content-Type": "application/json",
                    // 'Authorization': `Bearer ${TOKEN}`,
                },
            });

            const { token } = response.data;
            if (token) {
                localStorage.setItem('accessToken', token.access);
                localStorage.setItem('refreshToken', token.refresh);
            }

            setSuccess(true);
            console.log('회원가입 성공:', response.data);

            navigate('/login');

        } catch (err) {
            console.error('회원가입 오류:', err);
            if (err.response && err.response.data) {
                // 서버에서 반환한 오류 메시지 표시
                const data = err.response.data;
                let errorMessage = '회원가입에 실패했습니다.';
                
                // 서버의 오류 구조에 따라 메시지를 조정
                if (data.email) {
                    errorMessage = data.email.join(' ');
                } else if (data.nickname) {
                    errorMessage = data.nickname.join(' ');
                } else if (data.password) {
                    errorMessage = data.password.join(' ');
                } else if (data.password2) {
                    errorMessage = data.password2.join(' ');
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

    return (
        <Container>
            <Title>CountFit</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success ? (
                <SuccessMessage>회원가입이 완료되었습니다! 로그인 해주세요.</SuccessMessage>
            ) : (
                <Form onSubmit={handleSignUp}>
                    <Input
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {emailError && <FieldError>{emailError}</FieldError>}

                    <Input
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {passwordError && <FieldError>{passwordError}</FieldError>}

                    <Input
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {confirmPasswordError && <FieldError>{confirmPasswordError}</FieldError>}

                    <Input
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    {nicknameError && <FieldError>{nicknameError}</FieldError>}

                    <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">성별을 선택해주세요</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                        <option value="other">기타</option>
                    </Select>

                    <Input
                        type="number"
                        placeholder="나이를 입력해주세요"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min="0"
                        step="1"
                    />

                    <Button type="submit" disabled={isLoading || !isFormValid}>
                        {isLoading ? '가입 중...' : '회원가입'}
                    </Button>
                </Form>
            )}
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
    margin-bottom: 32px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Input = styled.input`
    padding: 12px 16px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    &:focus {
        border-color: #007BFF;
        outline: none;
    }

    /* Webkit 기반 브라우저에서 스피너 제거 */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

`;

const Select = styled.select`
    padding: 12px 16px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 12px 16px;
    background-color: ${(props) => (props.disabled ? '#ccc' : '#28a745')};
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s ease, cursor 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.disabled ? '#94d3a2' : '#218838')};
    }
`;

const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 16px;
    font-size: 14px;
`;

const SuccessMessage = styled.div`
    color: green;
    margin-bottom: 16px;
    font-size: 14px;
`;

const FieldError = styled.div`
    color: red;
    margin-bottom: 12px;
    font-size: 12px;
`;

export default SignUpPage;