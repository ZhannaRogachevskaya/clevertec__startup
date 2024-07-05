import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { Tabs } from 'antd';
import './login-page.css';
import { Link } from 'react-router-dom';
import { GooglePlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../Loader/Loader';

const onChange2 = (key: string) => {
    console.log(key);
};

export const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const { signin } = useAuth();
    const { check } = useAuth();
    // const fromPage = location.state?.from?.pathname || '/auth';

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values: any) => {
        setLoading(true);
        const { email, password } = values;
        axios
            .post(
                'https://marathon-api.clevertec.ru/auth/login',
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                    headers: {
                        accept: 'application/json',
                        // Authorization: 'Bearer qweqweqwe',
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                console.log(response);
                const token = response.data.accessToken;
                if (token) {
                    signin(true, () => navigate('/main', { replace: true }));
                    if (isChecked) {
                        localStorage.setItem('accessToken', token);
                    }
                }
                setLoading(false);
            })
            .catch((error) => {
                const err = error.response.status;
                const fromPage = location.pathname;
                if (err) {
                    check(fromPage, () => navigate('/result/error-login'));
                }
                setLoading(false);
            });
    };

    const onFinish2 = () => {
        setLoading(true);
        axios
            .post(
                'https://marathon-api.clevertec.ru/auth/check-email',
                {
                    email: email,
                },
                {
                    headers: {
                        accept: 'application/json',
                        // Authorization: 'Bearer qweqweqwe',
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    const fromPage = location.pathname;
                    check(fromPage, () => navigate('/auth/confirm-email', { state: email }));
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                const data = { email, password };
                const err = error.response.status;
                const fromPage = location.pathname;

                if (err == 404 && error.config.message == 0) {
                    check(fromPage, () => navigate('/result/error-check-email', { replace: true }));
                } else if (err == 404 && error.config.message !== 0) {
                    check(fromPage, () =>
                        navigate('/result/error-check-email-no-exist', { state: { data } }),
                    );
                } else if (err == 409) {
                    check(fromPage, () =>
                        navigate('/result/error-check-email', { state: { data } }),
                    );
                }
                setLoading(false);
            });
    };
    const [isValid, setIsValid] = useState(true);

    const validateEmail = () => {
        // Регулярное выражение для валидации email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (!email || !emailRegex.test(email)) {
            setIsValid(false);
            return Promise.reject('Не верный формат email');
        } else {
            setIsValid(true);
            return Promise.resolve();
        }
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!password || !passwordRegex.test(password)) {
            return Promise.reject('Пароль не менее 8 символов, с заглавной буквой и цифрой');
        } else {
            setIsValid(true);
            return Promise.resolve();
        }
    };

    return (
        <>
            {loading && <Loader />}

            <div className='window__background'>
                <div className='form__login_enter'>
                    <div className='icon__logo'></div>
                    <Tabs
                        defaultActiveKey='1'
                        onChange={onChange2}
                        items={[
                            {
                                label: `Вход`,
                                key: '1',
                                children: (
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
                                            name='email'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '',
                                                },
                                                {
                                                    validator: validateEmail,
                                                },
                                            ]}
                                        >
                                            <Input
                                                name='email'
                                                addonBefore={'email'}
                                                style={{ width: '100%', borderRadius: '2px' }}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                data-test-id='login-email'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label=''
                                            name='password'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '',
                                                },
                                                {
                                                    validator: validatePassword,
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder='Пароль'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                data-test-id='login-password'
                                            />
                                        </Form.Item>

                                        <div className='auth__block'>
                                            <Form.Item
                                                wrapperCol={{ span: 24 }}
                                                className='remember'
                                                name='remember'
                                                valuePropName='checked'
                                                style={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <Checkbox
                                                    checked={isChecked}
                                                    onChange={() => {
                                                        setIsChecked((prevState) => !prevState);
                                                    }}
                                                    className='check'
                                                    data-test-id='login-remember'
                                                >
                                                    Запомнить меня
                                                </Checkbox>
                                            </Form.Item>

                                            <Form.Item
                                                wrapperCol={{ span: 24 }}
                                                className='remember'
                                                name='change-password'
                                                valuePropName='checked'
                                            >
                                                <Button
                                                    type='link'
                                                    onClick={onFinish2}
                                                    data-test-id='login-forgot-button'
                                                    disabled={!isValid}
                                                >
                                                    Забыли пароль?
                                                </Button>
                                            </Form.Item>
                                        </div>

                                        <Form.Item wrapperCol={{ span: 24 }}>
                                            <Button
                                                type='primary'
                                                htmlType='submit'
                                                style={{ marginTop: '24px' }}
                                                data-test-id='login-submit-button'
                                            >
                                                Войти
                                            </Button>
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ span: 24 }}>
                                            <Button icon={<GooglePlusOutlined />} htmlType='submit'>
                                                Войти через Google
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                ),
                            },
                            {
                                label: (
                                    <Link to='/auth/registration' style={{ color: '#000' }}>
                                        Регистрация
                                    </Link>
                                ),
                                key: '2',
                                children: '',
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
};
