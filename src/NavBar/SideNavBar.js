import './SideNavBar.css'
import Logo from './component/Logo'
import Item from './component/Item';
function SideNavBar() {
    return (
      <div className="SideNavBar">
          <Logo></Logo>
          <div className='sideM'>

          <div >
          <Item image={'https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png'} name={"Home"}></Item>
          <Item image={'https://static.vecteezy.com/system/resources/thumbnails/014/441/308/small_2x/magnifying-glass-icon-3d-design-for-application-and-website-presentation-png.png'} name={"Home"}></Item>
          <Item image={'https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png'} name={"Home"}></Item>
          <Item image={'https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png'} name={"Home"}></Item>
          <Item image={"https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png"} name={"Message"}></Item>
          <Item image={"https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png"} name={"Notification"}></Item>
          <Item image={"https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png"} name={"Create"}></Item>
          <Item image={"https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png"} name={"Profile"}></Item>
          </div><div className='sideL'>
          <Item image={'https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png'} name={"Home"}></Item>
          <Item image={'https://static.vecteezy.com/system/resources/thumbnails/014/441/308/small_2x/magnifying-glass-icon-3d-design-for-application-and-website-presentation-png.png'} name={"Home"}></Item></div></div>
      </div>
    );
  }
  
  export default SideNavBar;