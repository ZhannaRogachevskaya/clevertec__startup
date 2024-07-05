import { MyButton } from '../MyButton/MyButton';
import { IdcardOutlined } from '@ant-design/icons';
export const ButtonSchedule: React.FC = () => (
    <MyButton>
        <IdcardOutlined style={{ color: '#2F54EB', marginRight: '8px' }} />
        <div className='fs14_b '>Профиль</div>
    </MyButton>
);
