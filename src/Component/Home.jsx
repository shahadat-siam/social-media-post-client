 
import Post from './Posts/Post'; 
import CreatePostField from './Create/CreatePostField';
import useAuth from './Hook/useAuth';
import LoadingSpinner from '../Shered/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const {loading, user} = useAuth()
    const navigate = useNavigate()
    if(loading) return <LoadingSpinner/>
    if(!user) navigate('/login')
    return (
        <div>
            <CreatePostField/>
            <Post/>
        </div>
    );
};

export default Home;