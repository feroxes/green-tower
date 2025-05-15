import BackgroundProvider from '../background-provider/background-provider';
import Spinner from '../spinner/spinner';

const Fallback = () => {
  return (
    <BackgroundProvider>
      <Spinner />
    </BackgroundProvider>
  );
};

export default Fallback;
