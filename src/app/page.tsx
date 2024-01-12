import MainContent from '@/components/MainContent';
import { BASE_API_URL } from '@/utils/constants';

//app/page.tsx
// import '../styles/globals.css';
// import '../styles/style.css';
// import '../styles/reset.css';
// import Footer from '@/components/Footer/Footer';

const Home = async () =>  {
  if(!BASE_API_URL) {
    return null;
  }

  return (
    <main>
      <MainContent />
    </main>
  )
};

export default Home;
