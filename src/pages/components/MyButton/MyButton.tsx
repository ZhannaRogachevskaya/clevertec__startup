import './MyButton.css';
export const MyButton: React.FC = (props) => (
    <>
        <button className='myBtn fs14_b '>{props.children}</button>
    </>
);
