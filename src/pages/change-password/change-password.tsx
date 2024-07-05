import './change-password.css';
import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../Loader/Loader';
export const ChangePassword: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const description = location.state;
    const { check } = useAuth();
    const [loading, setLoading] = useState(false);
    // const from = location.state?.from?.pathname;

    // zhanna.rogachevskaya1992@gmail.com
    const onFinish = () => {
        setLoading(true);
        axios
            .post(
                'https://marathon-api.clevertec.ru/auth/change-password',
                {
                    description,
                    password,
                    confirmPassword,
                },

                {
                    withCredentials: true,
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                // const fromPage = location.state?.from?.pathname || '/auth';
                console.log(response);
                const fromPage = location.pathname;
                if (response.status === 201) {
                    check(fromPage, () => navigate('/result/success-change-password'));
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                const err = error.response.status;
                const fromPage = location.pathname;
                if (err) {
                    check(fromPage, () => navigate('/result/error-change-password'));
                }
                setLoading(false);
            });
    };
    // if (from === '/result/error-change-password') {
    //     onFinish();
    // }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {loading && <Loader />}
            <div className='window__background'>
                <div className='window__change'>
                    <div className='change__title'>Восстановление аккаунта</div>
                    <Form
                        form={form}
                        name='basic'
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                    >
                        <Form.Item
                            label=''
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                            help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        >
                            <Input.Password
                                placeholder='Пароль'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                data-test-id='change-password'
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirm'
                            label=''
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Пароли не совпадают',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Пароли не совпадают!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder='Повторите пароль'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                data-test-id='change-confirm-password'
                            />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button
                                type='primary'
                                htmlType='submit'
                                style={{ marginTop: '38px' }}
                                data-test-id='change-submit-button'
                            >
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};
