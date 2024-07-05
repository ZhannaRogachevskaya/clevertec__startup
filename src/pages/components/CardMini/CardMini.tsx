import { Divider } from 'antd';

import './CardMini.css';
export const CardMini: React.FC = (props) => (
    <div className='card__mini'>
        <div className='title__card fs16'>{props.children}</div>
        <Divider style={{ margin: '0' }} />
    </div>
);
