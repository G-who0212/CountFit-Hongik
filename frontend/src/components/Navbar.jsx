import React, { useContext } from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './../contexts/AuthContext';

function Navbar(props) {

    const navigate = useNavigate();

    const location = useLocation();

    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

    const handleMyPage = () => {
        navigate('/mypage');
    };

    const hideAuthLinks = ['/login', '/sign-up'].includes(location.pathname);

    return (
        <Container>
            <Logo onClick={() => navigate('/')}>CountFit</Logo>
            {!hideAuthLinks && (
                isLoggedIn ? (
                    <Box>
                        <MyPage onClick={handleMyPage}>마이페이지</MyPage>
                        <Login onClick={handleLogout}>로그아웃</Login>
                    </Box>
                ) : (
                    <Login onClick={handleLogin}>로그인</Login>
                )
            )}
        </Container>
    );
}

const Container = styled.div`
    //background-color: yellow;
    height: 12vh;
    /* height: 120px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    /* box-shadow: 0px 4px 2px -2px gray; */
`

const Logo = styled.div`
    font-size: 36px;
    font-weight: bold;
    cursor: pointer;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        font-size: 24px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        font-size: 30px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        font-size: 36px;
    }
`;

const Box = styled.div`
    display: flex;
    align-items: center;
`;

const MyPage = styled.div`
    font-size: 18px;
    cursor: pointer;
    font-weight: bold;
    margin-right: 40px;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        font-size: 14px;
        margin-right:20px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        font-size: 16px;
        margin-right: 30px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        font-size: 18px;
        margin-right: 40px;
    }

`;

const Login = styled.div`
    font-size: 18px;
    cursor: pointer;
    font-weight: bold;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        font-size: 14px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        font-size: 16px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        font-size: 18px;
    }
`;

export default Navbar;
