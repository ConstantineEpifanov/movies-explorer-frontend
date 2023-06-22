import './NotFound.css'
import { Link, useNavigate } from 'react-router-dom';


function NotFound() {
    const navigate = useNavigate();

    return (
        <div className='not-found'>
            <h2 className='not-found__title'>404</h2>
            <p className='not-found__subtitle'>Страница не найдена</p>
            <Link className='not-found__link link-hover' onClick={() => navigate(-2)}>Назад</Link>
        </div>
    );
}

export default NotFound
