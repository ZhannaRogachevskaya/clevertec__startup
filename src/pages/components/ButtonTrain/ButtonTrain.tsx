import { MyButton } from '../MyButton/MyButton';
import { HeartFilled } from '@ant-design/icons';
export const ButtonTrain: React.FC = () => (
    <MyButton>
        <HeartFilled twoToneColor='#2f54eb' style={{ marginRight: '8px' }} />
        <div className='fs14_b '>Тренировки</div>
    </MyButton>
);
