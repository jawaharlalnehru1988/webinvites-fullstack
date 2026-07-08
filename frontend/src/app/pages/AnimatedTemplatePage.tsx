import { useEffect } from 'react';
import { HeroAnimation } from '../components/animated-template/HeroAnimation';
import { LetterSection } from '../components/animated-template/LetterSection';
import { CardsSection } from '../components/animated-template/CardsSection';
import '../../styles/animated-template.css';

export function AnimatedTemplatePage() {
  // Adding the google fonts specific to this template
  useEffect(() => {
    const link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.googleapis.com';
    
    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';

    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Bonheur+Royale&family=Poppins:wght@600;700;800&display=swap';

    document.head.appendChild(link1);
    document.head.appendChild(link2);
    document.head.appendChild(link3);

    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
      document.head.removeChild(link3);
    };
  }, []);

  return (
    <div className="animated-template-container">
      <HeroAnimation />
      <LetterSection />
      <CardsSection />
    </div>
  );
}
