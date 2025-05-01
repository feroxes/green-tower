import Spinner from '../spinner/spinner';
import BackgroundProvider from '../background-provider/background-provider';

const Fallback = () => {
  return (
    <BackgroundProvider>
      <Spinner />
    </BackgroundProvider>
  );
};

export default Fallback;
