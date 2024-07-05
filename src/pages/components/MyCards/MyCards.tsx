import { Col, Layout, Row } from 'antd';
import { Card } from '../Card/Card';
import './MyCards.css';
import { CardMini } from '../CardMini/CardMini';
import { ButtonTrain } from '../ButtonTrain/ButtonTrain';
import { ButtonCalendar } from '../ButtonCalendar/ButtonCalendar';
import { ButtonSchedule } from '../ButtonSchedule/ButtonSchedule';
export const MyCards: React.FC = () => (
    <>
        <div className='card__container'>
            <Row style={{ marginBottom: '20px' }}>
                <Col span={24}>
                    <Card>
                        <div className='about_app '>
                            <p className='fs16_b'>С CleverFit ты сможешь:</p>
                            <p className='fs16_b'>
                                — планировать свои тренировки на календаре, выбирая тип и уровень
                                нагрузки;
                            </p>
                            <p className='fs16_b'>
                                — отслеживать свои достижения в разделе статистики, сравнивая свои
                                результаты c нормами и рекордами;
                            </p>
                            <p className='fs16_b'>
                                — создавать свой профиль, где ты можешь загружать свои фото, видео и
                                отзывы о тренировках;
                            </p>

                            <p className='fs16_b'>
                                — выполнять расписанные тренировки для разных частей тела, следуя
                                подробным инструкциям и советам профессиональных тренеров.
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginBottom: '16px' }}>
                <Col span={24}>
                    <Card>
                        <div className='about__cleverFit'>
                            <p className='fs20'>
                                CleverFit — это не просто приложение, а твой личный помощник в мире
                                фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
            <div className='card__actions'>
                <div className='card__item'>
                    <CardMini>Расписать тренировки</CardMini>
                    <ButtonTrain />
                </div>
                <div className='card__item'>
                    <CardMini>Назначить календарь</CardMini>
                    <ButtonCalendar />
                </div>
                <div className='card__item'>
                    <CardMini>Заполнить профиль</CardMini>
                    <ButtonSchedule />
                </div>
            </div>
        </div>
    </>
);
