import { MyCards } from '@pages/components/MyCards/MyCards';
import { Button, Layout } from 'antd';
import { CardDownload } from '@pages/components/CardDownload/CardDownload';
import './MyContent.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Loader } from '../../Loader/Loader';
import { ModalError } from '../ModalError/ModalError';
import { error } from '../../components/ModalError/ModalError';

export const MyContent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { Content } = Layout;
    const navigate = useNavigate();
    const authToken = localStorage.getItem('accessToken');
    const onFinish = () => {
        setLoading(true);
        axios
            .get('https://marathon-api.clevertec.ru/feedback', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                console.log(response);
                // if (response.status == 200) {
                //     const fromPage = location.pathname;
                //     check(fromPage, () => navigate('/auth/confirm-email', { state: email }));
                // }
                const data = response.data;
                navigate('/feedbacks', { state: { data } });
                setLoading(false);
            })
            .catch((error2) => {
                console.log(error2);
                const err = error2.response.status;
                // const fromPage = location.pathname;

                if (err == 403) {
                    localStorage.removeItem('accessToken');
                    navigate('/auth', { replace: true });
                } else if (err !== 403) {
                    navigate('/feedbacks', { replace: true });
                    error();
                }

                // navigate('/result/error-check-email', { state: { data } }),
                setLoading(false);
            });
    };

    return (
        <>
            {loading && <Loader />}
            <Content className='content'>
                <div className='wrapper'>
                    <MyCards />
                    <footer>
                        <Button
                            type='link'
                            className='btn__reviews fs16_2b reviews'
                            onClick={onFinish}
                        >
                            Смотреть отзывы
                        </Button>
                        <CardDownload />
                    </footer>
                </div>
            </Content>
        </>
    );
};
