import './Main.css';
import SideNavBar from './NavBar/SideNavBar';
import MainHome from './MainHome/MainHome';
import TopNav from './NavBar/TopNav';
import BottomNav from './NavBar/BottomNav';

function Main() {
  return (
    <div className="Main">
      <TopNav></TopNav>
      <SideNavBar></SideNavBar>
      <MainHome></MainHome>
      <BottomNav></BottomNav>
    </div>
  );
}

export default Main;
