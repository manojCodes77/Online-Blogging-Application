import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import BlogsPage from './pages/BlogsPage';
import Blog from './pages/Blog';
import Publish from './pages/Publish';
import SendOTP from './components/SendOTP';
import FrontPage from './components/FrontPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FrontPage />} >
            <Route path="/" element={<SendOTP />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs" element={<BlogsPage unique={false} />} />
            <Route path="/blog/:id" element={<Blog unique={true} />} />
            <Route path="/others-blog/:id" element={<Blog unique={false} />} />
            <Route path="/my-posts" element={<BlogsPage unique={true} />}>
              <Route path="publish" element={<Publish />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

{/* <Route path="*" element={<Navigate to="/send-otp" replace />} /> */ }