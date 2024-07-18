function MessageOne(props){
    return (
        <div className='MessageOne' onClick={props.onClick}>
           <img src={props.profile ||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOr3cDHrDjizSMpE4E4zRDzGsV6F7EmO867A&s'}></img>
           <div className='MO1'>
             <span className='name'>{props.name ||'Akshay'}</span>
             <div className='info'>Last seen 14:50</div>
           </div>
        </div>
    )
}
export default MessageOne;