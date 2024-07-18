import { useEffect,useState } from "react";
import axios from "axios";
function Comment(props){
    const [user,setUser] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${props.ownerId}`);
                console.log(response);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();
      }, [props.ownerId]);
   return(<><div>
    Comment:{props.text}
   </div>
   <div>Owner: {user.username || 'Unknown User'}
   </div>
   <div>Owner: {user.name || 'Unknown User'}
   </div>
   <img src={user.profile} alt="'Profile Image'"/></>)
}
export default Comment;
