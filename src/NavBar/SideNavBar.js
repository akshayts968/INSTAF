import './SideNavBar.css'
import Logo from './component/Logo'
import Item from './component/Item';
function SideNavBar() {
    return (
      <div className="SideNavBar">
          <Logo></Logo>
          <Item image={'https://static.vecteezy.com/system/resources/previews/021/948/181/non_2x/3d-home-icon-free-png.png'} name={"Home"}></Item>
          <Item image={'https://static.vecteezy.com/system/resources/thumbnails/014/441/308/small_2x/magnifying-glass-icon-3d-design-for-application-and-website-presentation-png.png'} name={"Home"}></Item>
          <Item image={'https://as2.ftcdn.net/v2/jpg/02/11/05/67/1000_F_211056713_DCMErsexeSBxZwjPl4UI1ghrgim9aSzd.jpg'} name={"Home"}></Item>
          <Item image={'https://img.lovepik.com/element/45013/1733.png_860.png'} name={"Home"}></Item>
          <Item image={"https://www.pngfind.com/pngs/m/115-1158373_why-facebook-messenger-messenger-black-and-white-hd.png"} name={"Message"}></Item>
          <Item image={""} name={""}></Item>
          <Item image={"https://static.thenounproject.com/png/768833-200.png"} name={""}></Item>
          <Item image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThsuyKXDhMqeKMC91uA09-w_uNaSxuDyNULw&s"} name={"Profile"}></Item>
      </div>
    );
  }
  
  export default SideNavBar;