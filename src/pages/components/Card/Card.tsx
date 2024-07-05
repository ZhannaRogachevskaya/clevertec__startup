import './Card.css';

export const Card: React.FC = (props) => (
    <>
        <div className='card'>{props.children}</div>
    </>
);
