// import React from 'react';
// import { styled } from 'styled-components';
// import { useNavigate, useLocation } from 'react-router-dom';

// function CameraGuidePage(props) {

//     const navigate = useNavigate();

//     const location = useLocation();
//     const { selectedExercise, targetReps } = location.state || {};

//     const handleWebcamPage = () => {
//         navigate('/webcam', { state: { selectedExercise, targetReps } });
//     };


//     return (
//         <Container>
//             <Title>
//                 📢 선택하신 운동 종목에 적합한 카메라 구도는 아래와 같아요!
//             </Title>
//             <ContentWrapper>
//                 <VideoPlaceholder />
//                 <Instructions>
//                     <InstructionGroup>
//                         <InstructionTitle>측면 촬영</InstructionTitle>
//                         <InstructionDescription>📸 팔의 각도, 몸통의 자세 등을 확인할 수 있어요.</InstructionDescription>
//                     </InstructionGroup>
//                     <InstructionGroup>
//                         <InstructionTitle>정면 촬영</InstructionTitle>
//                         <InstructionDescription>📸 팔의 펼침 정도, 몸통의 기울기 등을 확인할 수 있어요.</InstructionDescription>
//                     </InstructionGroup>
//                     <InstructionGroup>
//                         <InstructionTitle>45도 각도 촬영</InstructionTitle>
//                         <InstructionDescription>📸 팔의 움직임과 몸통의 안정성 등을 확인할 수 있어요.</InstructionDescription>
//                     </InstructionGroup>
//                 </Instructions>
//             </ContentWrapper>
//             <StartButton onClick={handleWebcamPage}>시작하기</StartButton>
//         </Container>
//     );
// }


// const Container = styled.div`
//   text-align: center;
//   padding: 20px;
// `;

// const Title = styled.div`
//   font-size: 35px;
//   font-weight: 800;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 60px;
//   margin-top: 40px;
// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 20px;
//   //background-color: yellow;
// `;

// const VideoPlaceholder = styled.div`
//   width: 700px;
//   height: 400px;
//   border: 2px solid #ccc;
//   border-radius: 50px;
//   margin-right: 20px;
// `;

// const Instructions = styled.div`
//   text-align: left;
// `;

// const InstructionGroup = styled.div`
//   margin-bottom: 20px;
// `;

// const InstructionTitle = styled.div`
//   font-size: 24px;
//   font-weight: 800;
//   background-color: #d4ecff;
//   padding: 15px;
//   border-radius: 20px;
//   width: 200px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// const InstructionDescription = styled.div`
//   font-size: 23px;
//   font-weight: 600;
//   padding: 10px;
//   margin-top: 5px;
// `;

// const StartButton = styled.div`
//     width: 200px;
//     text-align: center;
//     padding-top: 20px;
//     padding-bottom: 20px;
//     font-size: 25px;
//     font-weight: 700;
//     border-radius: 50px;
//     background-color: #4CAF50;
//     color: white;
//     margin-top: 40px;
//     cursor: pointer;
//     display: inline-block;
// `;

// export default CameraGuidePage;


// 사진 넣는 버전
import React from 'react';
import { styled } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import pushUpImage from '../assets/push_up.png';
import squatImage from '../assets/squat.png';
import pullUpImage from '../assets/pull_up.png';

function CameraGuidePage(props) {

    const navigate = useNavigate();

    const location = useLocation();
    const { selectedExercise, targetReps } = location.state || {};

    const handleWebcamPage = () => {
        navigate('/webcam', { state: { selectedExercise, targetReps } });
    };


    return (
        <Container>
            <Title>
                📢 각 운동 종목에 대한 카운트 원리는 아래와 같으니 참고해주세요 !
            </Title>
            <ContentWrapper>
                <ExerciseSection>
                    <ExerciseTitle>팔굽혀펴기</ExerciseTitle>
                    <ExerciseImage src={pushUpImage} alt="팔굽혀펴기 카메라 구도" />
                    <ExerciseDescription>
                        ✅ <strong>준비 자세</strong> 🔥 <br />하체가 화면상 수평선과 120도 이상을 이뤄야해요 !
                        <br />
                        ✅ <strong>카운트 조건 - 팔 펴는 거리</strong> 🔥
                        <br />팔을 굽혔다가 펼 때 최대 거리의 70%에 도달해야해요. 다시 최대 거리의 80%로 돌아오면 카운트돼요 !
                    </ExerciseDescription>
                </ExerciseSection>

                <ExerciseSection>
                    <ExerciseTitle>스쿼트</ExerciseTitle>
                    <ExerciseImage src={squatImage} alt="스쿼트 카메라 구도" />
                    <ExerciseDescription>
                        ✅ <strong>준비 자세</strong> 🔥 <br />옆으로 섰을 때 무릎 각도가 150도 이상이고 엉덩이가 무릎보다 위에 있어야 해요 !
                        <br />
                        ✅ <strong>카운트 조건 - 무릎 각도</strong> 🔥
                        <br />스쿼트 시 양 무릎 각도가 90도보다 작아져야해요. 다시 무릎 각도가 120도보다 커지면 카운트돼요 !
                    </ExerciseDescription>
                </ExerciseSection>

                <ExerciseSection>
                    <ExerciseTitle>턱걸이</ExerciseTitle>
                    <ExerciseImage src={pullUpImage} alt="턱걸이 카메라 구도" />
                    <ExerciseDescription>
                        ✅ <strong>준비 자세</strong> 🔥 <br />양 손이 어깨보다 위에 위치해야하고 팔꿈치 각도가 120도 이상이어야 해요 !
                        <br />
                        ✅ <strong>카운트 조건 - 팔꿈치 각도</strong> 🔥
                        <br />턱걸이 시 팔꿈치 각도가 90도보다 작아져야해요. 다시 팔꿈치 각도가 100도보다 커지면 카운트돼요 !
                    </ExerciseDescription>
                </ExerciseSection>
            </ContentWrapper>
            <StartButton onClick={handleWebcamPage}>시작하기</StartButton>
        </Container>
    );
}


const Container = styled.div`
  text-align: center;
  //padding: 20px;
  padding-left: 100px;
  padding-right: 100px;
  //background-color: green;
`;

const Title = styled.div`
  font-size: 35px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  margin-top: 60px;
  cursor: default;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  cursor: default;
  //margin-bottom: 20px;
  //background-color: yellow;
`;

const ExerciseSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 800px;
  height: 500px;
  background-color: #ffffff;
  padding: 25px;
  border-radius: 50px;
  box-shadow: 5px 5px 20px -2px rgba(0, 0, 0, 0.3);
`;

const ExerciseTitle = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000000;
  background-color: #d4ecff;
  padding: 15px;
  border-radius: 30px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ExerciseImage = styled.img`
  //width: 100%;
  //max-width: 600px;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ExerciseDescription = styled.div`
  font-size: 20px;
  color: #555;
  text-align: left;
  line-height: 1.6;
`;


const StartButton = styled.div`
    width: 200px;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
    border-radius: 50px;
    background-color: #4CAF50;
    color: white;
    margin-top: 40px;
    cursor: pointer;
    display: inline-block;

    &:hover {
        background-color: #45a049;
    }
`;

export default CameraGuidePage;