import { useEffect,useState } from "react";
import axios from "axios";
import './Comment.css';
function Comment(props){
    const [user,setUser] = useState("");
    const [date,setDate] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${props.ownerId}`);
                //console.log(response);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        function getDaysDifference() {
            const givenDate = new Date(props.date);
            const currentDate = new Date();
            const differenceInTime = currentDate - givenDate;
            
            const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
            if (differenceInDays >= 1) {
              setDate(`${differenceInDays} d`);
              return;
            }
            
            const differenceInHours = Math.floor(differenceInTime / (1000 * 3600));
            if (differenceInHours >= 1) {
              setDate(`${differenceInHours} hr`);
              return;
            }
            
            const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60));
            if (differenceInMinutes >= 1) {
              setDate(`${differenceInMinutes} min`);
              return;
            }
            
            setDate(`Just now`);
          }
          
        fetchData();
        getDaysDifference();
      }, [props.ownerId]);
   return(
   <div className="coment">
    <img src={user.profile} alt="'Profile Image'"/>
    <div className="comment-details">
    
    <div className="comment-1 commentText">
    <span className="comment-2 commentUsername">{user.username || 'Unknown User'}
    </span>
    {props.text}
   </div>
    
   <div className="comment-3">
    <span className="commentago">{date||"1d"}</span>
    <span className="commentago">3 Likes</span>
    <span className="commentago bold6" onClick={()=>{
      props.currText(user.username,props.index)}}>Reply</span>
    <span className="commentago bold6">See translation</span>
   </div><br/>
   {props.replies && props.replies.map((comment) => (
      <Comment key={comment._id} index={comment._id} text={comment.text} replies={comment.replies}  ownerId={comment.owner} owner={comment.owner.profile} date={comment.date} currText={props.currText}/>
    ))}
   <button className="seeReply">View Replies</button>
   </div>
   
   </div>)
}
export default Comment;
