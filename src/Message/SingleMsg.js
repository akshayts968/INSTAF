import './SingleMsg.css';
function SingleMsg(props) {
 const sender = props.userid!=props.sender?"Sender":'Receiver';
 const SBOOL = sender!="Sender";
  return (
    <div className={`${sender} SingleMsg`}>
        {SBOOL&&<img className='IMG' src={props.profile||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOr3cDHrDjizSMpE4E4zRDzGsV6F7EmO867A&s'}></img>}
        <div className='MSG'>
            <div className='MSG-content'>
               {props.content}
            </div>
        </div>
    </div>
    );
}

export default SingleMsg;