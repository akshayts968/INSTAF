import './Main.css';
import SideNavBar from './NavBar/SideNavBar';
import MainHome from './MainHome/MainHome';
import TopNav from './NavBar/TopNav';
import BottomNav from './NavBar/BottomNav';
import Dot3 from './Profile/Dot3';
import { useState } from 'react';

function Main() {
  const [Dot, setDot] = useState(false);

  const toggleDot = () => {
    setDot(prevDot => !prevDot);
  };

  return (
    <div className="Main">
      {Dot && <Dot3 toggle={toggleDot}/>}
      <TopNav />
      <SideNavBar />
      <MainHome toggle={toggleDot} />
      <BottomNav />
    </div>
  );
}

export default Main;
