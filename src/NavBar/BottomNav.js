import './BottomNav.css';
import Item from './component/Item';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';

import ForumIcon from '@mui/icons-material/Forum';
const iconNames = [
  'Home',
  'Explore',
  'Movie Creation',
  'Favorite',
  'Messager',
  'Create',
  'Account',
];
const icons = [
  <HomeIcon key="home" />,
  <ExploreIcon key="explore" />,
  <MovieCreationIcon key="movie_creation" />,
  <FavoriteIcon key="favorite" />,
  <CreateIcon key="create" />,
  <ChatIcon key="Messager"/>,
];
const BIcon = [ 
  <SettingsIcon key="settings" />,
  <ForumIcon key="thread"/>
];
function BottomNav() {
  return (
    <div className="BottomNav">
      {icons.map((icon, index) => (
          <Item key={index} icon={icon}>
            {icon}
          </Item> ))}
          <Link to="/profile">
          <Item key={6} icon={ <AccountCircleIcon key="account" />}></Item></Link>
    </div>
  );
}

export default BottomNav;
