import React, { useContext } from 'react';
import { styled, keyframes } from 'styled-components';
import { Link, Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import mainImage1 from '../assets/icon/mainpage1/mainpage1.jpg';
import mainImage2 from '../assets/icon/mainpage1/mainpage2.jpg';
import mainImage3 from '../assets/icon/mainpage1/mainpage3.jpg';
import mainImage4 from '../assets/icon/mainpage1/mainpage4.jpg';
import mainImage5 from '../assets/icon/mainpage1/mainpage5.jpg';
import mainImage6 from '../assets/icon/mainpage1/mainpage6.jpg';
import mainImage7 from '../assets/icon/mainpage1/mainpage7.jpg';
import mainLogin from '../assets/icon/mainpage2/main_login.jpg';
import mainCamera1 from '../assets/icon/mainpage2/main_camera1.jpg';
import mainCamera2 from '../assets/icon/mainpage2/main_camera2.jpg';
import plan from '../assets/icon/mainpage3/plan.jpg';
import sensor from '../assets/icon/mainpage3/sensor.jpg';
import camera from '../assets/icon/mainpage3/camera.jpg';
import gift from '../assets/icon/mainpage3/gift.jpg';
import good from '../assets/icon/mainpage3/good.jpg';
import { AuthContext } from '../contexts/AuthContext';

function MainPage(props) {

    const navigate = useNavigate();

    const { isLoggedIn } = useContext(AuthContext);

    const handleStartClick = () => {
        if (isLoggedIn) {
            navigate('/goal-setting');
        } else {
            navigate('/login');
        }
    };

    return (
        <Container>

            <FirstSection>
                <Text>
                    하루하루 쌓이는 운동의 기록, <br/>
                    건강한 변화의 시작💪📈
                </Text>
                <BtnContainer>
                    <GuideBtn>
                        <Link to="secondSection" smooth={true} duration={500}>
                        이용 가이드 보러가기
                        </Link>
                    </GuideBtn>
                    <StartBtn onClick={handleStartClick}>
                        바로 시작하기
                    </StartBtn>
                </BtnContainer>
                <ImageContainer>
                    <MainImage src={mainImage1} alt="mainpage1" />
                    <MainImage src={mainImage2} alt="mainpage2" />
                    <MainImage src={mainImage3} alt="mainpage3" />
                    <MainImage src={mainImage4} alt="mainpage4" />
                    <MainImage src={mainImage5} alt="mainpage5" />
                    <MainImage src={mainImage6} alt="mainpage6" />
                    <MainImage src={mainImage7} alt="mainpage7" />
                </ImageContainer>
            </FirstSection>

            <Element name="secondSection">
            <SecondSection>
                <SecondTitle>
                    서비스를 이용하기 전에, <br/>
                    우선 아래의 사항들이 준비되었는지 체크해주세요.
                </SecondTitle>
                <CheckListContainer>
                    <CheckItem>
                        <Circle>1</Circle>
                        <CheckText>
                            <CheckTitle>서비스 진행을 위해 로그인을 해주세요.</CheckTitle>
                            <CheckDescription>
                                ⦁ 아직 계정이 없다면 이메일 주소만으로 빠르게 회원가입할 수 있어요.
                                <br />
                                ⦁ 회원가입 또한 서비스 화면 우측 상단의 '로그인' 버튼을 통해 진행해주세요.
                            </CheckDescription>
                            <ImgContainer>
                                <MainLogin src={mainLogin} alt="mainLogin" />
                            </ImgContainer>
                        </CheckText>
                    </CheckItem>
                    <CheckItem>
                        <Circle>2</Circle>
                        <CheckText>
                            <CheckTitle>카메라 사용에 대한 접근 권한을 허용해주세요.</CheckTitle>
                            <CheckDescription>
                                ⦁ 카메라 권한 요청 팝업이 뜬다면, 카메라 권한을 허용해주세요.
                            </CheckDescription>
                            <ImgContainer>
                                <MainCamera1 src={mainCamera1} alt="mainCamera1" />
                                <MainCamera2 src={mainCamera2} alt="mainCamera2" />
                            </ImgContainer>
                        </CheckText>
                    </CheckItem>
                </CheckListContainer>
            </SecondSection>
            </Element>
            
            <ThirdSection>
                <ThirdTitle>
                    본격적으로 CountFit 이용을 시작해볼까요?
                </ThirdTitle>
                <ThirdCheckListContainer>
                    <ThirdCheckItem>
                        <ThirdCircle>1</ThirdCircle>
                        <ThirdCheckText>
                            <ThirdCheckTitle>원하는 운동 종목을 선택하고 목표 횟수를 입력한 후 설정 완료 버튼을 눌러주세요.</ThirdCheckTitle>
                            <ThirdCheckDescription>
                                ⦁ 운동 종목에 따라 카메라 배치와 구도 설정이 다를 수 있으니 다음 페이지에서 샘플 영상을 꼭 확인해주세요.
                            </ThirdCheckDescription>
                            <ImgContainer>
                                <ThirdMainImage src={plan} alt="plan" />
                            </ImgContainer>
                        </ThirdCheckText>
                    </ThirdCheckItem>
                    <ThirdCheckItem>
                        <ThirdCircle>2</ThirdCircle>
                        <ThirdCheckText>
                            <ThirdCheckTitle>카메라 구도를 조정한 후 시작하기 버튼을 눌러 운동을 시작합니다.</ThirdCheckTitle>
                            <ThirdCheckDescription>
                                ⦁ 카메라를 통해 여러분의 운동 동작이 실시간으로 감지되며, 정확한 동작을 취했을 경우에만 횟수가 화면에 표시됩니다.
                            </ThirdCheckDescription>
                            <ImgContainer>
                                <ThirdMainImage1 src={sensor} alt="sensor" />
                                <ThirdMainImage2 src={camera} alt="camera" />
                            </ImgContainer>
                        </ThirdCheckText>
                    </ThirdCheckItem>
                    <ThirdCheckItem>
                        <ThirdCircle>3</ThirdCircle>
                        <ThirdCheckText>
                            <ThirdCheckTitle>설정한 목표 횟수에 도달하면 목표 달성을 축하하는 알림이 표시됩니다.</ThirdCheckTitle>
                            <ThirdCheckDescription>
                                ⦁ 설정 완료 후 목표 달성에 대한 알림을 받으세요.
                            </ThirdCheckDescription>
                            <ImgContainer>
                                <ThirdMainImage1 src={gift} alt="gift" />
                                <ThirdMainImage2 src={good} alt="good" />
                            </ImgContainer>
                            <Btn onClick={handleStartClick}>
                                바로 시작하기
                            </Btn>
                        </ThirdCheckText>
                    </ThirdCheckItem>
                </ThirdCheckListContainer>
            </ThirdSection>
            
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const FirstSection = styled.div`
    height: calc(100vh - 12vh);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //background-color: green;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        height: calc(100vh - 10vh);
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        height: calc(100vh - 11vh);
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        height: calc(100vh - 12vh);
    }
`;

const SecondSection = styled.div`
    padding-left: 100px;
    padding-right: 100px;
    //background-color: pink;
    height: 100vh;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        padding-left: 20px;
        padding-right: 20px;
        height: auto;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        padding-left: 50px;
        padding-right: 50px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        padding-left: 100px;
        padding-right: 100px;
    }
`;

const ThirdSection = styled.div`
    padding-left: 100px;
    padding-right: 100px;
    //background-color: #4400ff;
    height: 100vh;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        padding-left: 20px;
        padding-right: 20px;
        height: auto;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        padding-left: 50px;
        padding-right: 50px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        padding-left: 100px;
        padding-right: 100px;
    }
`;

const SecondTitle = styled.div`
    font-size: 35px;
    font-weight: 800;
    padding-top: 100px;
    margin-bottom: 50px;
    line-height: 1.5;
    cursor: default;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        font-size: 24px;
        padding-top: 50px;
        margin-bottom: 30px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        font-size: 30px;
        padding-top: 75px;
        margin-bottom: 40px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        font-size: 35px;
    }
`;

const CheckListContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        flex-direction: row;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        flex-direction: row;
    }
`;

const CheckItem = styled.div`
    width: 550px;
    background-color: white;
    padding: 40px;
    border-radius: 30px;
    border: 3px black solid;
    text-align: left;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        width: 90%;
        padding: 20px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        width: 45%;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        width: 550px;
    }
`;

const Circle = styled.div`
    width: 40px;
    height: 40px;
    background-color: black;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    cursor: default;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        width: 30px;
        height: 30px;
        font-size: 16px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        width: 35px;
        height: 35px;
        font-size: 17px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        width: 40px;
        height: 40px;
        font-size: 18px;
    }
`;

const CheckText = styled.div``;

const CheckTitle = styled.div`
    font-size: 25px;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.5;
    text-align: justify;
    cursor: default;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        font-size: 18px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        font-size: 22px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        font-size: 25px;
    }
`;

const CheckDescription = styled.div`
    font-size: 18px;
    font-weight: 500;
    line-height: 1.8;
    color: #555;
    margin-bottom: 20px;
    text-align: justify;
    cursor: default;

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

const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        flex-direction: column;
        gap: 15px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        flex-direction: row;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        flex-direction: row;
    }
`;

const MainLogin = styled.img`
    height: 200px;
`;

const MainCamera1 = styled.img`
    padding-top: 70px;
    //width: 100%;
    //max-width: 250px;
    //height: auto;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        max-width: 180px;
        padding-top: 40px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        max-width: 220px;
        padding-top: 55px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        max-width: 250px;
        padding-top: 70px;
    }
`;

const MainCamera2 = styled.img`
    padding-top: 70px;
    //width: 100%;
    //max-width: 250px;
    //height: auto;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        max-width: 180px;
        padding-top: 40px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        max-width: 220px;
        padding-top: 55px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        max-width: 250px;
        padding-top: 70px;
    }
`;

const ThirdTitle = styled.div`
    font-size: 35px;
    font-weight: 800;
    padding-top: 100px;
    margin-bottom: 50px;
    cursor: default;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        font-size: 24px;
        padding-top: 50px;
        margin-bottom: 30px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        font-size: 30px;
        padding-top: 75px;
        margin-bottom: 40px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        font-size: 35px;
    }
`;

const ThirdCheckListContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;

     /* 모바일 화면 */
     @media (max-width: 600px) {
        gap: 15px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        flex-direction: row;
        justify-content: center;
    }
`;

const ThirdCheckItem = styled.div`
    width: 340px;
    background-color: white;
    padding: 40px;
    border-radius: 30px;
    border: 3px black solid;
    text-align: left;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        width: 90%;
        padding: 20px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        width: 30%;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        width: 340px;
    }
`;

const ThirdCircle = styled.div`
    width: 40px;
    height: 40px;
    background-color: black;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    cursor: default;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        width: 30px;
        height: 30px;
        font-size: 16px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        width: 35px;
        height: 35px;
        font-size: 17px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        width: 40px;
        height: 40px;
        font-size: 18px;
    }
`;

const ThirdCheckText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    cursor: default;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        align-items: flex-start;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        align-items: center;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        align-items: center;
    }
`;

const ThirdCheckTitle = styled.div`
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.5;
    text-align: justify;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        font-size: 18px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        font-size: 22px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        font-size: 24px;
    }
`;

const ThirdCheckDescription = styled.div`
    font-size: 18px;
    font-weight: 500;
    line-height: 1.8;
    color: #555;
    margin-bottom: 20px;
    text-align: justify;

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


const ThirdMainImage = styled.img`
    width: 100%;
    max-width: 300px;
    height: auto;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        max-width: 200px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        max-width: 250px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        max-width: 300px;
    }
`;

const ThirdMainImage1 = styled.img`
    padding-top: 40px;
    width: 100%;
    max-width: 250px;
    height: auto;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        max-width: 180px;
        padding-top: 20px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        max-width: 220px;
        padding-top: 30px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        max-width: 250px;
        padding-top: 40px;
    }
`;

const ThirdMainImage2 = styled.img`
    padding-top: 40px;
    width: 100%;
    max-width: 250px;
    height: auto;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        max-width: 180px;
        padding-top: 20px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        max-width: 220px;
        padding-top: 30px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        max-width: 250px;
        padding-top: 40px;
    }
`;

const floatAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
`

const Text = styled.div`
    font-size: 50px;
    font-weight: 800;
    animation: ${floatAnimation} 3s ease-in-out infinite;
    transform: translate(-50%, -50%);
    text-align: center;
    position: absolute;
    left: 50%;
    top: 35%;
    cursor: default;
    //background-color: yellow;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        font-size: 30px;
        top: 30%;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        font-size: 40px;
        top: 32%;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        font-size: 50px;
        top: 35%;
    }
`
const BtnContainer = styled.div`
    display: flex;
    width: 500px;
    color: white;
    justify-content: space-between;
    margin-top: -100px;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        flex-direction: column;
        width: 80%;
        margin-top: -50px;
        gap: 20px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        flex-direction: row;
        width: 400px;
        margin-top: -75px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        flex-direction: row;
        width: 500px;
        margin-top: -100px;
    }
`

const GuideBtn = styled.div`
    width: 260px;
    background-color: #1946A0;
    cursor: pointer;
    border-radius: 50px;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 22px;
    font-weight: 700;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        width: 100%;
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        width: 200px;
        font-size: 20px;
        padding-top: 12px;
        padding-bottom: 12px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        width: 260px;
        font-size: 22px;
        padding-top: 15px;
        padding-bottom: 15px;
    }
`

const StartBtn = styled.div`
    width: 200px;
    background-color: #33AB11;
    cursor: pointer;
    border-radius: 50px;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 22px;
    font-weight: 700;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        width: 100%;
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        width: 180px;
        font-size: 20px;
        padding-top: 12px;
        padding-bottom: 12px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        width: 200px;
        font-size: 22px;
        padding-top: 15px;
        padding-bottom: 15px;
    }
`

const Btn = styled.div`
    width: 180px;
    background-color: #33AB11;
    cursor: pointer;
    border-radius: 50px;
    text-align: center;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 20px;
    font-weight: 700;
    color: white;
    margin-top: 30px;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        width: 140px;
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
        margin-top: 20px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        width: 160px;
        font-size: 18px;
        padding-top: 11px;
        padding-bottom: 11px;
        margin-top: 25px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        width: 180px;
        font-size: 20px;
        padding-top: 12px;
        padding-bottom: 12px;
        margin-top: 30px;
    }
`;

const ImageContainer = styled.div`
    display: flex;
    position: absolute;
    top: 80%;
    justify-content: space-between;
    width: 1400px;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        flex-direction: column;
        top: 70%;
        //width: 100px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        flex-direction: row;
        top: 75%;
        width: 300px;
        /* gap: 15px; */
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        flex-direction: row;
        top: 80%;
        width: 1400px;
    }
`;

const MainImage = styled.img`
    width: 150px;
    height: 150px;

    /* 모바일 화면 */
    @media (max-width: 600px) {
        width: 80px;
        height: 80px;
    }

    /* 태블릿 화면 */
    @media (min-width: 601px) and (max-width: 1024px) {
        width: 60px;
        height: 60px;
    }

    /* 데스크탑 화면 */
    @media (min-width: 1025px) {
        width: 150px;
        height: 150px;
    }
`;

export default MainPage;