import './MainProfile.css';
import React from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
function POST(props){
    return(
        <div className='img'>
      <img className='img20' src={props.img?props.img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOr3cDHrDjizSMpE4E4zRDzGsV6F7EmO867A&s'}></img>
      </div>
    )
}
function POSTIMG(){
    return(
        <div className='POSTIMG'>
         
        </div>
    )
}
function Bar(props){
    const currSelect=props.curr===props.index?" Select":"";
    return (
        <div className={props.title+currSelect} onClick={()=>props.setCurr(props.index)}>
            {props.title}
         </div>
    )
}
function PostBar(){
    const [curr,setCurr]=React.useState(0);
    const bar=["POSTS","SAVED","TAGGED"];
    return (
        <div className='postBar'>
         {bar.map((item, index) => (
            <Bar title={item} key={index} index={index} curr={curr} setCurr={setCurr} ></Bar>
         ))}
       </div>
    )
}
function MainProfile() {
    const [Pos,setPos]= React.useState([]);
    const [User,setUser] = React.useState("");
    let { id } = useParams();
    const [PData,setPData] = React.useState("");

    console.log(id,"is something")
    React.useEffect(() => {
        const fetchPosts = async () => {
          try {
            const User = JSON.parse(localStorage.getItem('user'));
            setUser(User);
            console.log(User,"is found");
            if(id){
                const Nonresponse = await axios.get(`http://localhost:8080/post/${id}`);
                setPos(Nonresponse.data.data);
                setPData(Nonresponse.data.User);
                console.log("RES",Nonresponse)
            }else{
            const response = await axios.get(`http://localhost:8080/post/${User._id}`);
            console.log("RES",response);
            setPos(response.data.data);
            setPData(response.data.User);
            }
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        fetchPosts();/*
       const User = localStorage.getItem('user');
       setPos(User);*/
      }, [id]);
  return (
    <div className="MainProfile">
       <div className='header'>
    <div class="item1">
        <div className='item1Img' style={{
          backgroundImage: `url(${PData.profile})`
        }}></div>
    </div>
    <div class="item2">
        <div className='username'>{PData.name || "ak__s_h__ay"}</div>
        <div className='UserB2'>Edit Profile</div>
        <div className='UserB2'>View archive</div>
    </div>
    <div class="item3">
        <div className='NPost'>{PData.nPost || "0"} posts</div>
        <div className='NPost'>{PData.nFollowers || "0"} followers</div>
        <div className='NPost'>{PData.nFollowing || "0"} following</div>
    </div>
    <div class="item4">
        <div className='Name'>{PData.name || "0"}</div>
        <div className='threadName'>@ ak__s_h__ay</div>
    </div>
    <div class="item5">Item 5</div>
       </div>
       <div className='Highlights'>
         <div className='newHigh'>
            <div className='newHighD'>
            <AddIcon className='plus'/>
            </div>
         </div>
       </div>
       <PostBar></PostBar>
        <div className='Posts'>
         {Pos.map(post => (<POST key={post._id} img={post.videourl}></POST>))}
         </div>
    </div>
    );
}

export default MainProfile;