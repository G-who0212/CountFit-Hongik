// import React, { useState } from 'react';
// import { styled } from 'styled-components';
// import { useNavigate } from 'react-router-dom';

// function GoalSettingPage(props) {

//     const [selectedExercise, setSelectedExercise] = useState('');
//     const [targetReps, setTargetReps] = useState('');

//     const exercises = ['팔굽혀펴기', '스쿼트', '턱걸이'];

//     const handleExerciseClick = (exercise) => {
//         setSelectedExercise(exercise);
//     };

//     const handleTargetRepsChange = (e) => {
//         const value = e.target.value;
//         if (/^\d*$/.test(value)) {
//             setTargetReps(value);
//         }
//     };

//     const isFormValid = selectedExercise && targetReps > 0;

//     const navigate = useNavigate();
//     const handleSubmit = () => {
//         if (isFormValid) {
//             navigate('/camera-guide');
//         }
//     };

//     return (
//         <Container>
//             <Content>
//                 <Title>📌 아래의 운동 종목 중 한 가지를 선택해주세요.</Title>
//                 <ExerciseContainer>
//                     {exercises.map((exercise) => (
//                         <ExerciseButton
//                             key={exercise}
//                             onClick={() => handleExerciseClick(exercise)}
//                             selected={selectedExercise === exercise}
//                         >
//                             {exercise}
//                         </ExerciseButton>
//                     ))}
//                 </ExerciseContainer>
//                 <InputContainer>
//                     <InstructionText>
//                         📌 오늘 하루{' '}
//                         <SelectedExerciseText>
//                             {selectedExercise || '<운동 종목을 먼저 선택해주세요!>'}
//                         </SelectedExerciseText>{' '}
//                         몇 회를 목표로 하시나요?
//                     </InstructionText>
//                     <TargetInput
//                         type="text"
//                         placeholder="숫자를 입력해주세요."
//                         value={targetReps}
//                         onChange={handleTargetRepsChange}
//                         disabled={!selectedExercise}
//                     />
//                 </InputContainer>
//                 <SubmitButton onClick={handleSubmit} disabled={!isFormValid}>
//                     설정 완료
//                 </SubmitButton>
//             </Content>
//         </Container>
//     );
// }

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//     height: calc(100vh - 12vh); // 네브바 높이를 제외한 전체 화면 높이
//     background-color: white;
// `;

// const Content = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//     max-width: 1500px;
//     // background-color: pink;
// `;

// const Title = styled.div`
//     font-size: 32px;
//     font-weight: 800;
//     margin-bottom: 40px;
//     text-align: center;
//     color: black;
// `;

// const ExerciseContainer = styled.div`
//     display: flex;
//     gap: 20px;
//     margin-bottom: 80px;
// `;

// const ExerciseButton = styled.button`
//     padding: 20px 30px;
//     border-radius: 50px;
//     border: 2px solid ${(props) => (props.selected ? '#33AB11' : '#ccc')};
//     background-color: ${(props) => (props.selected ? '#33AB11' : 'white')};
//     color: ${(props) => (props.selected ? 'white' : 'black')};
//     font-size: 20px;
//     font-weight: 700;
//     cursor: pointer;

//     &:hover {
//         background-color: ${(props) => (props.selected ? '#33AB11' : '#f0f0f0')};
//     }
// `;

// const InputContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin-bottom: 40px;
//     width: 100%;
//     // background-color: yellow;
// `;

// const InstructionText = styled.div`
//     font-size: 32px;
//     font-weight: 800;
//     margin-bottom: 40px;
//     color: black;
//     text-align: center;
// `;

// const SelectedExerciseText = styled.span`
//     color: black;
//     font-weight: 800;
// `;

// const TargetInput = styled.input`
//     padding: 15px;
//     font-size: 18px;
//     border-radius: 10px;
//     border: 2px solid #ccc;
//     width: 200px;
//     text-align: center;
//     margin-bottom: 80px;

//     &:disabled {
//         background-color: #f0f0f0;
//         color: #aaa;
       
//     }
// `;

// const SubmitButton = styled.div`
//     text-align: center;
//     padding-top: 20px;
//     padding-bottom: 20px;
//     font-size: 24px;
//     font-weight: 700;
//     border-radius: 50px;
//     background-color: ${(props) => (props.disabled ? '#ccc' : '#1946A0')};
//     color: white;
//     border: none;
//     cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
//     width: 200px;

//     &:hover {
//         background-color: ${(props) => (props.disabled ? '#ccc' : '#153873')};
//     }
// `;


// export default GoalSettingPage;



import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function GoalSettingPage(props) {

    const [selectedExercise, setSelectedExercise] = useState('');
    const [targetReps, setTargetReps] = useState('');

    // const exercises = ['push_up', 'squat', 'pull_up'];
    const exercises = [
        { value: 'push_up', label: '팔굽혀펴기' },
        { value: 'squat', label: '스쿼트' },
        { value: 'pull_up', label: '턱걸이' },
    ];

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
    };

    const handleTargetRepsChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setTargetReps(value);
        }
    };

    const isFormValid = selectedExercise && targetReps > 0;

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (isFormValid) {
            navigate('/camera-guide', { state: { selectedExercise, targetReps } });
        }
    };

    return (
        <Container>
            <Content>
                <Title>📌 아래의 운동 종목 중 한 가지를 선택해주세요.</Title>
                <ExerciseContainer>
                    {exercises.map((exercise) => (
                        <ExerciseButton
                            key={exercise.value}
                            onClick={() => handleExerciseClick(exercise.value)}
                            selected={selectedExercise === exercise.value}
                        >
                            {exercise.label}
                        </ExerciseButton>
                    ))}
                </ExerciseContainer>
                <InputContainer>
                    <InstructionText>
                        📌 오늘 하루{' '}
                        <SelectedExerciseText>
                            {/* {selectedExercise || '<운동 종목을 먼저 선택해주세요!>'} */}
                            {selectedExercise ? exercises.find(ex => ex.value === selectedExercise).label : '<운동 종목을 먼저 선택해주세요!>'}
                        </SelectedExerciseText>{' '}
                        몇 회를 목표로 하시나요?
                    </InstructionText>
                    <TargetInput
                        type="text"
                        placeholder="숫자를 입력해주세요."
                        value={targetReps}
                        onChange={handleTargetRepsChange}
                        disabled={!selectedExercise}
                    />
                </InputContainer>
                <SubmitButton onClick={handleSubmit} disabled={!isFormValid}>
                    설정 완료
                </SubmitButton>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 12vh); // 네브바 높이를 제외한 전체 화면 높이
    background-color: white;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1500px;
    // background-color: pink;
`;

const Title = styled.div`
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 40px;
    text-align: center;
    color: black;
    cursor: default;
`;

const ExerciseContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 80px;
`;

const ExerciseButton = styled.button`
    padding: 20px 30px;
    border-radius: 50px;
    border: 2px solid ${(props) => (props.selected ? '#33AB11' : '#ccc')};
    background-color: ${(props) => (props.selected ? '#33AB11' : 'white')};
    color: ${(props) => (props.selected ? 'white' : 'black')};
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.selected ? '#33AB11' : '#f0f0f0')};
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    width: 100%;
    // background-color: yellow;
`;

const InstructionText = styled.div`
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 40px;
    color: black;
    text-align: center;
    cursor: default;
`;

const SelectedExerciseText = styled.span`
    color: black;
    font-weight: 800;
`;

const TargetInput = styled.input`
    padding: 15px;
    font-size: 18px;
    border-radius: 10px;
    border: 2px solid #ccc;
    width: 200px;
    text-align: center;
    margin-bottom: 80px;

    &:disabled {
        background-color: #f0f0f0;
        color: #aaa;
       
    }
`;

const SubmitButton = styled.div`
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
    border-radius: 50px;
    background-color: ${(props) => (props.disabled ? '#ccc' : '#1946A0')};
    color: white;
    border: none;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    width: 200px;

    &:hover {
        background-color: ${(props) => (props.disabled ? '#ccc' : '#153873')};
    }
`;


export default GoalSettingPage;