import {Route, Routes} from 'react-router-dom';
import './App.css';
import WebCamPage from './pages/WebCamPage';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import GoalSettingPage from './pages/GoalSettingPage';
import CameraGuidePage from './pages/CameraGuidePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/webcam" element={<WebCamPage/>}/>
        <Route path="/goal-setting" element={<GoalSettingPage />} />
        <Route path="/camera-guide" element={<CameraGuidePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;
