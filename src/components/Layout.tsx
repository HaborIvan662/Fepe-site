import { useState } from 'react';
import type { FC } from 'react';
import Header from './Header';
import NewsHeader from './NewsHeader';
import MenuOverlay from './home/MenuOverlay';
import Footer from './Section/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='bg-custom-green w-full overflow-x-hidden min-h-screen'>
      <Header onMenuToggle={setIsMenuOpen} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <NewsHeader />
      {children}
      <Footer />
    </div>
  );
};

export default Layout; 