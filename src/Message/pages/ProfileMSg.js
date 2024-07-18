import { Link } from "react-router-dom";
function ProfileMSg(props){
    return (
      <div className='ProfileMSg'>
        <img src={ props.profile||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOr3cDHrDjizSMpE4E4zRDzGsV6F7EmO867A&s'}></img>
        <div>{props.name||'APNA COLLEGE'}</div>
        <div>{props.Messager||'Officialapnacollege . insta'}</div>
        <Link to={`/profile/${props.id}`}><div className='viewPro'>view profile</div></Link>
      </div>
    )
  }
  export default ProfileMSg;