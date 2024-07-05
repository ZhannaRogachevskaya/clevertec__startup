import './Loader.css';
import loader from './loader.json';
import Lottie from 'react-lottie';
export const Loader: React.FC = () => {
    return (
        <>
            <div className={'loader__wrapper'} data-test-id='loader'>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: loader,
                    }}
                    width={150}
                    height={150}
                    className={'loader'}
                />
            </div>
        </>
    );
};
