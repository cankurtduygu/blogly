// Home.tsx
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/authSlice';
import Hero from '../../components/HeroSection/Hero';
import BlogSection from '../../components/BlogSection';


export default function Home() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div>
      {currentUser ? <BlogSection /> : <Hero />}
    </div>
  );
}