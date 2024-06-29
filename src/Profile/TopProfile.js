import './TopProfile.css';
function TopProfile(props) {
  const classId=props.cl?"TopProfile "+props.cl:"TopProfile";
  return (
    <div className={classId}>
        <div className='leftTProfile'></div>
        <div className='midTProfile'>{props.user.name||'ak__s_h__ay'}</div>
        <div className=' rightTProfile'></div>
    </div>);
}

export default TopProfile;