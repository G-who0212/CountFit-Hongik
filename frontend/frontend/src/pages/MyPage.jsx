import React, { useState, useEffect } from 'react';
import {styled} from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyPage(props) {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setError('로그인이 필요합니다.');
                setIsLoading(false);
                navigate('/login'); // 로그인 페이지로 리디렉션
                return;
            }

            try {
                const response = await axios.get("http://13.125.164.75/account/userinfo/", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                setUserData(response.data);
                setGender(response.data.gender || '');
                setAge(response.data.age !== undefined ? response.data.age : '');
            } catch (err) {
                console.error('사용자 정보 가져오기 오류:', err);
                setError('사용자 정보를 가져오는 데 실패했습니다.');
                if (err.response && err.response.status === 401) {
                    // 토큰이 유효하지 않은 경우 로그인 페이지로 리디렉션
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setUpdateError('');
        setUpdateSuccess('');
        if (!isEditing && userData) {
            setGender(userData.gender || '');
            setAge(userData.age !== undefined ? userData.age : '');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdateError('');
        setUpdateSuccess('');

        // 유효성 검사
        if (age !== '' && (isNaN(age) || age < 0)) {
            setUpdateError('유효한 나이를 입력해주세요.');
            return;
        }

        setIsUpdating(true);

        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setUpdateError('로그인이 필요합니다.');
                setIsUpdating(false);
                navigate('/login');
                return;
            }

            const data = {
                gender: gender || null,
                age: age !== '' ? parseInt(age, 10) : null,
            };

            const response = await axios.post("http://13.125.164.75/account/userinfo/", data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            // 기존 records 데이터 유지하며 userData 업데이트
            setUserData((prevData) => ({
                ...response.data,
                records: prevData.records, // 기존 records 데이터 유지
            }));
            setUpdateSuccess('프로필이 성공적으로 업데이트되었습니다.');
            setIsEditing(false);
        } catch (err) {
            console.error('프로필 업데이트 오류:', err);
            if (err.response && err.response.data) {
                let errorMessage = '프로필 업데이트에 실패했습니다.';

                if (err.response.data.gender) {
                    errorMessage = err.response.data.gender.join(' ');
                }
                if (err.response.data.age) {
                    errorMessage = err.response.data.age.join(' ');
                }

                setUpdateError(errorMessage);
            } else {
                setUpdateError('네트워크 오류가 발생했습니다.');
            }
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return (
            <Container>
                <Message>로딩 중...</Message>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <ErrorMessage>{error}</ErrorMessage>
            </Container>
        );
    }


    return (
        <Container>
            {userData ? (
                <UserInfo>
                    <InfoItem>
                        <Label>📌 닉네임</Label>
                        <Value>{userData.nickname}</Value>
                    </InfoItem>
                    <InfoItem>
                        <Label>📌 성별</Label>
                        <Value>{getGenderLabel(userData.gender)}</Value>
                    </InfoItem>
                    <InfoItem>
                        <Label>📌 나이</Label>
                        <Value>{userData.age !== undefined ? userData.age : '미설정'}</Value>
                    </InfoItem>

                    {!isEditing && (
                        <EditButton onClick={handleEditToggle}>프로필 수정</EditButton>
                    )}

                    {isEditing && (
                        <EditForm onSubmit={handleUpdate}>
                            <FormGroup>
                                <FormLabel>성별</FormLabel>
                                <FormSelect value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">미설정</option>
                                    <option value="male">남성</option>
                                    <option value="female">여성</option>
                                    <option value="other">기타</option>
                                </FormSelect>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>나이</FormLabel>
                                <FormInput
                                    type="number"
                                    placeholder="나이를 입력해주세요"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    min="0"
                                    step="1"
                                />
                            </FormGroup>
                            {updateError && <FieldError>{updateError}</FieldError>}
                            {updateSuccess && <SuccessMessage>{updateSuccess}</SuccessMessage>}
                            <ButtonGroup>
                                <SaveButton type="submit" disabled={isUpdating}>
                                    {isUpdating ? '저장 중...' : '저장'}
                                </SaveButton>
                                <CancelButton type="button" onClick={handleEditToggle} disabled={isUpdating}>
                                    취소
                                </CancelButton>
                            </ButtonGroup>
                        </EditForm>
                    )}
                    
                    {/* 모든 운동 기록 표시 */}
                    <RecordsContainer>
                        <RecordsTitle>🚀 운동 기록</RecordsTitle>
                        {userData.records && userData.records.length > 0 ? (
                            <RecordsList>
                                {userData.records
                                    .slice() // 배열 복사
                                    .sort((a, b) => new Date(b.done_at) - new Date(a.done_at)) // 내림차순 정렬
                                    .map((record) => (
                                        <RecordItem key={record.id}>
                                            <RecordInfo>
                                                <RecordLabel>💪 운동 종목</RecordLabel>
                                                <RecordValue>{translateSportType(record.sport_type)}</RecordValue>
                                            </RecordInfo>
                                            <RecordInfo>
                                                <RecordLabel>🔥 목표 횟수</RecordLabel>
                                                <RecordValue>{record.aim_count}회</RecordValue>
                                            </RecordInfo>
                                            <RecordInfo>
                                                <RecordLabel>📈 완료 횟수</RecordLabel>
                                                <RecordValue>{record.done_count}회</RecordValue>
                                            </RecordInfo>
                                            <RecordInfo>
                                                <RecordLabel>🗓️ 운동 날짜</RecordLabel>
                                                <RecordValue>{new Date(record.done_at).toLocaleString()}</RecordValue>
                                            </RecordInfo>
                                        </RecordItem>
                                    ))}
                            </RecordsList>
                        ) : (
                            <NoRecordsMessage>운동 기록이 없습니다.</NoRecordsMessage>
                        )}
                    </RecordsContainer>
                    {/* {!isEditing && (
                        <EditButton onClick={handleEditToggle}>프로필 수정</EditButton>
                    )} */}
                </UserInfo>
            ) : (
                <Message>사용자 정보가 없습니다.</Message>
            )}
        </Container>
    );
}

const getGenderLabel = (gender) => {
    switch (gender) {
        case 'male':
            return '남성';
        case 'female':
            return '여성';
        case 'other':
            return '기타';
        default:
            return '미설정';
    }
};

// 운동 종목을 한국어로 변환하는 함수
const translateSportType = (sportType) => {
    switch (sportType) {
        case 'push_up':
            return '팔굽혀펴기';
        case 'squat':
            return '스쿼트';
        case 'pull_up':
            return '턱걸이';
        default:
            return sportType;
    }
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //height: calc(100vh - 12vh);
    min-height: calc(100vh - 12vh);
    //background-color: #a3be0d;
    position: relative;
    //padding: 50px;
    /* margin-top: 50px;
    margin-bottom: 50px; */
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 24px;
    border-radius: 20px;
    box-shadow: 5px 5px 20px -2px rgba(0, 0, 0, 0.3);
    width: 600px;
    cursor: default;
    margin-bottom: 50px;
    margin-top: 50px;
`;

const InfoItem = styled.div`
    display: flex;
    margin-bottom: 16px;
`;

const Label = styled.div`
    font-weight: bold;
    font-size: 24px;
    width: 150px;
    color: #333333;
`;

const Value = styled.div`
    color: #555555;
    font-size: 24px;
`;

const RecordsContainer = styled.div`
    //margin-top: 30px;
    //background-color: yellow;
    border-top: 2px #e1e1e1 solid;
`;

const RecordsTitle = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #333333;
    margin-top: 30px;
`;

const RecordsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 18px;
`;

const RecordItem = styled.div`
    background-color: #f0f0f0;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RecordInfo = styled.div`
    display: flex;
    margin-bottom: 8px;
`;

const RecordLabel = styled.div`
    font-weight: bold;
    width: 150px;
    color: #333333;
`;

const RecordValue = styled.div`
    color: #555555;
`;

const NoRecordsMessage = styled.div`
    color: #777777;
    font-size: 16px;
    text-align: center;
`;

const EditButton = styled.button`
    padding: 10px 20px;
    background-color: #1946A0;
    color: #ffffff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    align-self: flex-end;
    margin-top: 10px;
    margin-bottom: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 5px 5px 20px -2px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 400px;
    margin-top: 20px;
    position: absolute;
    //top: 50%;
    left: 70%;
    //transform: translate(-50%, -50%);
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`;

const FormLabel = styled.label`
    font-weight: bold;
    margin-bottom: 8px;
    color: #333333;
    font-size: 18px;
`;

const FormSelect = styled.select`
    padding: 12px 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const FormInput = styled.input`
    padding: 12px 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    &:focus {
        border-color: #007bff;
        outline: none;
    }

    /* Webkit 기반 브라우저에서 스피너 제거 */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const SaveButton = styled.button`
    padding: 10px 20px;
    background-color: #28a745;
    color: #ffffff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;

    &:disabled {
        background-color: #94d3a2;
        cursor: not-allowed;
    }

    &:hover:enabled {
        background-color: #218838;
    }
`;

const CancelButton = styled.button`
    padding: 10px 20px;
    background-color: #6c757d;
    color: #ffffff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;

    &:disabled {
        background-color: #c0c0c0;
        cursor: not-allowed;
    }

    &:hover:enabled {
        background-color: #5a6268;
    }
`;


const ErrorMessage = styled.div`
    color: red;
    font-size: 18px;
    margin-bottom: 16px;
`;

const SuccessMessage = styled.div`
    color: green;
    font-size: 18px;
    margin-bottom: 16px;
`;

const Message = styled.div`
    color: #ffffff;
    font-size: 18px;
    text-align: center;
`;

const FieldError = styled.div`
    color: red;
    margin-bottom: 12px;
    font-size: 14px;
`;

export default MyPage;