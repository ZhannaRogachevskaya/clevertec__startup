import React, { useState } from 'react';
import { Tabs } from 'antd';
import './RegistrPage.css';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

import { GooglePlusOutlined } from '@ant-design/icons';

import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../Loader/Loader';
import { ResultError } from '../result-error/result-error';
const onChange2 = (key: string) => {
    console.log(key);
};
export const RegistrPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { check } = useAuth();

    const onFinish = (values: any) => {
        console.log('zhopa');
        setLoading(true);
        const { email, password } = values;

        axios
            .post(
                'https://marathon-api.clevertec.ru/auth/registration',
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
                const fromPage = location.pathname;
                if (response.status == 201) {
                    check(fromPage, () =>
                        navigate('/result/success', { state: { from: '/source' } }),
                    );
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                // const data = error.response.config.data;
                const data = { email, password };
                console.log(data);
                const err = error.response.status;
                const fromPage = location.pathname;
                if (err == 409) {
                    check(fromPage, () => navigate('/result/error-user-exist'));
                } else if (err !== 409) {
                    check(fromPage, () => navigate('/result/error', { state: { data } }));
                }
                setLoading(false);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const [isValid, setIsValid] = useState(true);
    const validateEmail = () => {
        // Регулярное выражение для валидации email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        console.log(email);
        if (!email || !emailRegex.test(email)) {
            setIsValid(false);
            return Promise.reject('Не верный формат email');
        } else {
            setIsValid(true);
            return Promise.resolve();
        }
    };
    const [isValid2, setIsValid2] = useState(true);
    const validatePassword = () => {
        // Регулярное выражение для валидации password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        console.log(password);
        if (!password || !passwordRegex.test(password)) {
            setIsValid2(false);
            return Promise.reject('Пароль не менее 8 символов, с заглавной буквой и цифрой');
        } else {
            setIsValid2(true);
            return Promise.resolve();
        }
    };
    const [isValid3, setIsValid3] = useState(true);
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
                                label: (
                                    <Link to='/auth' style={{ color: '#000' }}>
                                        Вход
                                    </Link>
                                ),
                                key: '',
                                children: '',
                            },
                            {
                                label: <Link to='/auth/registration'>Регистрация</Link>,
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
                                            name='email'
                                            label=''
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
                                                addonBefore={'email'}
                                                style={{ width: '100%', borderRadius: '2px' }}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                data-test-id='registration-email'
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
                                            help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                                        >
                                            <Input.Password
                                                placeholder='Пароль'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                data-test-id='registration-password'
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
                                                        if (
                                                            !value ||
                                                            getFieldValue('password') === value
                                                        ) {
                                                            setIsValid3(true);
                                                            return Promise.resolve();
                                                        }
                                                        setIsValid3(false);
                                                        return Promise.reject(
                                                            new Error('Пароли не совпадают!'),
                                                        );
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder='Повторите пароль'
                                                value={password2}
                                                onChange={(e) => setPassword2(e.target.value)}
                                                data-test-id='registration-confirm-password'
                                            />
                                        </Form.Item>

                                        <Form.Item wrapperCol={{ span: 24 }}>
                                            <Button
                                                type='primary'
                                                htmlType='submit'
                                                style={{ marginTop: '38px' }}
                                                data-test-id='registration-submit-button'
                                                disabled={!isValid || !isValid2 || !isValid3}
                                            >
                                                Войти
                                            </Button>
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ span: 24 }}>
                                            <Button
                                                icon={<GooglePlusOutlined />}
                                                htmlType='submit'
                                                style={{ marginTop: '30px' }}
                                            >
                                                Регистрация через Google
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
};
// zhanchick@mail.ru
// As123456789
