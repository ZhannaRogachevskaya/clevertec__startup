import { Menu } from 'antd';
import { CalendarOutlined, HeartFilled, TrophyFilled, IdcardOutlined } from '@ant-design/icons';

import Exit from './Vector.png';
import './MyMenu.css';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const MyMenu: React.FC = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();
    return (
        <Menu
            className={'menu__content'}
            mode='vertical'
            items={[
                {
                    label: 'Календарь',
                    key: 'Calendar',
                    icon: <CalendarOutlined style={{ color: '#061178', marginRight: '10px' }} />,
                },
                {
                    label: 'Тренировки',
                    key: 'Train',
                    icon: <HeartFilled style={{ color: '#061178', marginRight: '10px' }} />,
                },
                {
                    label: 'Достижения',
                    key: 'Progr',
                    icon: <TrophyFilled style={{ color: '#061178', marginRight: '10px' }} />,
                },
                {
                    label: 'Профиль',
                    key: 'Account',
                    icon: <IdcardOutlined style={{ color: '#061178', marginRight: '10px' }} />,
                },

                {
                    label: 'Выход',
                    key: 'Exit',
                    icon: (
                        <img
                            src={Exit}
                            alt='Exit SVG'
                            className='exit__btn'
                            style={{
                                marginRight: '15px',
                            }}
                        />
                    ),
                    onClick: () => {
                        signout(false, () => navigate('/auth', { replace: true }));
                        localStorage.removeItem('accessToken');
                    },
                },
            ]}
        ></Menu>
    );
};
