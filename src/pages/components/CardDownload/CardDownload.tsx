import { Divider, Button } from 'antd';
import './CardDownload.css';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
export const CardDownload: React.FC = () => (
    <div className='card__download'>
        <div className='title__card_down'>
            <div className='fs16_2b'>Скачать на телефон</div>
            <div>Доступно в PRO-тарифе</div>
        </div>
        <Divider style={{ margin: '0' }} />

        <div className='card__download_btns'>
            <Button type='text' icon={<AndroidFilled />}>
                Android OS
            </Button>
            <Button type='text' icon={<AppleFilled />}>
                Apple iOS
            </Button>
        </div>
    </div>
);
