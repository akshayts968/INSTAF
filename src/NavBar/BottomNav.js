import './BottomNav.css';
import Item from './component/Item';
import { Link } from 'react-router-dom';
function BottomNav() {
  return (
    <div className="BottomNav">
       <   Item image={'https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png'} name={"Home"}></Item>
          <Item image={'https://static.vecteezy.com/system/resources/thumbnails/014/441/308/small_2x/magnifying-glass-icon-3d-design-for-application-and-website-presentation-png.png'} name={"Home"}></Item>
          <Item image={'https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png'} name={"Home"}></Item>
          <Item image={'https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png'} name={"Home"}></Item>
          <Item image={'https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png'} name={"Home"}></Item>
          <Link to="/profile">
          <Item image={'https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png'} name={"Home"}></Item></Link>
    </div>
  );
}

export default BottomNav;
