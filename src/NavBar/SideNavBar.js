import './SideNavBar.css'
import { useState,useEffect } from 'react';
import Logo from './component/Logo'
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
import ForumIcon from '@mui/icons-material/Forum';
import axios from 'axios';
import { Link } from 'react-router-dom';
function SearchUser(props){
  return (
    <Link to={`/profile/${props.id}`}>
    <div className='SearchUser'>
      <img className='Search-img' src={`${props.img}`}/>
      <div className='User-deta'>
         <div className='username'>{props.username}</div>
      </div>
      <div className='Close'><ForumIcon style={{ padding: '8px', color: 'wheat' }} /></div>
    </div>
    </Link>
  )
}
const iconNames = [
  'Home',
  'Search',
  'Explore',
  'Movie Creation',
  'Messager',
  'Favorite',
  'Create',
  'Account',
];
const icons = [
  <HomeIcon key="home" />,
  <SearchIcon key="search" />,
  <ExploreIcon key="explore" />,
  <MovieCreationIcon key="movie_creation" />,
  <ChatIcon key="Messager"/>,
  <FavoriteIcon key="favorite" />,
  <CreateIcon key="create" />,
  <AccountCircleIcon key="account" />,
];
const BIcon = [ 
  <SettingsIcon key="settings" />,
  <ForumIcon key="thread"/>
];
function SideNavBar() {
const [sValue,setSValue] = useState("");
const [searchResult, setSearchResult] = useState(null);
  function Search(e){
    console.log(e.target.value);
    setSValue(e.target.value)
  }
  useEffect(() => {
    const fetchData = async () => {
      if (sValue) {
        console.log("in", sValue); 
        try {
          const response = await axios.get(`http://localhost:8080/sresult?query=${sValue}`);
          setSearchResult(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      else{
        setSearchResult("");
      }
    };

    fetchData();
  }, [sValue]);
    return (
      <div className="SideNavBar">
          <Logo></Logo>
          <div className='sideM'>

          <div className='iconDiv' >
          {icons.map((icon, index) => (
          <Item key={index} icon={icon} name={iconNames[index]}>
            {icon}
          </Item>
        ))}
          </div><div className='sideL'>
          {BIcon.map((icon, index) => (
            <Item key={index} icon={icon}>
              {icon}
            </Item>  
          ))}
          </div></div>
          <div className='Search-Div'>
             <div className='Search-Bar'>
                <input className='Search-INPUT' onChange={Search}></input>
             </div>
             <div className='Recent-Search'>
               <div className='Recent-Search-Head'>
               </div>
               {searchResult && searchResult.map((user) => (
               <SearchUser id={user._id} img={user.profile} name={user.name} username={user.username}></SearchUser>
              ))}
              {searchResult && searchResult.map((user) => (
               <SearchUser id={user._id} img={user.profile} name={user.name} username={user.username}></SearchUser>
              ))}
              {searchResult && searchResult.map((user) => (
               <SearchUser id={user._id} img={user.profile} name={user.name} username={user.username}></SearchUser>
              ))}
              {searchResult && searchResult.map((user) => (
               <SearchUser id={user._id} img={user.profile} name={user.name} username={user.username}></SearchUser>
              ))}
              {searchResult && searchResult.map((user) => (
               <SearchUser id={user._id} img={user.profile} name={user.name} username={user.username}></SearchUser>
              ))}
              {searchResult && searchResult.map((user) => (
               <SearchUser id={user._id} img={user.profile} name={user.name} username={user.username}></SearchUser>
              ))}
             </div>
          </div>
      </div>
    );
  }
  
  export default SideNavBar;