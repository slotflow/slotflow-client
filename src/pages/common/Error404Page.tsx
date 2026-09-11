import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import error404 from '../../assets/svgs/error404.svg';

const Error404Page = () => {
  const navigate = useNavigate();

  return (
    <section
      id="error"
      className={`h-screen flex flex-col items-center justify-center bg-[var(--background)]`}
    >
      <img src={error404} className="h-40 md:h-80" />
      <Button
        title="Return To Home"
        onClick={() => {
          navigate('/');
        }}
        className="mt-6 cursor-pointer hover:bg-[var(--mainColor)] hover:text-white transition-colors border-[var(--mainColor)]"
      >
        Return To Home
      </Button>
    </section>
  );
};

export default Error404Page;
