
import { useNavigate } from 'react-router-dom';

export default function Auth({ login, logout, admin, auth }) {
    const navigate = useNavigate()
    const loginAction = () => {
        login(); 
        navigate('/profile');
    }
    const logoutAction = () => {
        logout();
        navigate("/")
    }
    return (
        <>
            {auth && <button className="btn btn-dark btn-sm px-4 mt-2" onClick={logoutAction}>Logout</button>}
            {!auth && <button className="btn btn-outline-dark btn-sm px-4 mt-2" onClick={loginAction}>Login</button>}
        </>

    )
}
