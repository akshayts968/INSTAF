import './Item.css';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
function Item(props) {
  function SearchActive(e){
    if(props.name==="Search")
    props.onClick(!props.isSearchActive);
    console.log(e.target);
    console.log(props.name=="Search");
    const SearchD=document.getElementsByClassName("Search-Div");
  }
  return (
    //{props.name==="Search"?:}
    <Link to={props.name != "Search" ? `/${props.link}` : undefined}><div className="Item" onClick={SearchActive}>
       {props.icon}
        <div className='ItemName'>{props.name}</div>
    </div></Link>
  );
}

export default Item;
