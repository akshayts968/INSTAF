import './Item.css';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
function Item(props) {
  return (
    <div className="Item">
       {props.icon}
        <div className='ItemName'>{props.name}</div>
    </div>
  );
}

export default Item;
