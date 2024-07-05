import { MyButton } from '../MyButton/MyButton';
import { CalendarOutlined } from '@ant-design/icons';
export const ButtonCalendar: React.FC = () => (
    <MyButton>
        <CalendarOutlined twoToneColor='#2f54eb' style={{ marginRight: '8px' }} />
        <div className='fs14_b '>Календарь</div>
    </MyButton>
);
