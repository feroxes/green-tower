import { OrbitContainer, OrbitingLogo } from './spinner.styles';

function Spinner() {
  return (
    <OrbitContainer>
      <OrbitingLogo displayText={false} />
    </OrbitContainer>
  );
}

export default Spinner;
