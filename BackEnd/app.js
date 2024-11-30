require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const { connect } = require('./db');
const app = express();
const MONGO_URL = process.env.MONGO||"mongodb://127.0.0.1:27017/temperary";
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Post = require("./model/Post.js");
const User = require("./model/User.js");
const Message = require("./model/Message.js");
const Comment = require("./model/Comment.js");
const MongoStore = require('connect-mongo');
const Reset = require('./utils/Reset.js');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wanderlust_DEV',
        allowedFormats: ['png', 'jpg', 'jpeg'],
    },
});

const upload = multer({ storage });

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
});

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};
function extractMention(text) {
    if (text.startsWith('@')) {
      const spaceIndex = text.indexOf(' ');
      if (spaceIndex !== -1) {
        return {
          mention: text.slice(1, spaceIndex), // Exclude the '@'
          remaining: text.slice(spaceIndex + 1) // Text after the space
        };
      }
      return {
        mention: text.slice(1), // If there's no space, return the part after '@'
        remaining: '' // No remaining text
      };
    }
    return {
      mention: '', // Return empty if it does not start with '@'
      remaining: text
    };
  }
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use(flash());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST','DELETE','PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

mongoose.connect(MONGO_URL)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));
    const store = MongoStore.create({
    mongoUrl:MONGO_URL,
    crypto: {
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});
/*
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
  });*/
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('message', (data) => {
        console.log('Received message:', data);
    });

    socket.on('sendMessage', (data) => {
        const { room, content } = data;
        console.log('sendMessage:', room, content);
        socket.broadcast.to(room).emit('sendMessage', content);
    });
    socket.on('sendComment', (data) => {
        const { room, content } = data;
        console.log('sendComment:', room, content,data);
        socket.broadcast.to(room).emit('sendComment', content);
    });
});

app.post("/Messages/:sendId/:rId", async (req, res) => {
    const { sendId, rId } = req.params;
    const { content } = req.body;
    try {
        const message = new Message({
            sender: sendId,
            receiver: rId,
            content: content
        });
        await message.save();
        res.json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

app.get('/Messages/:id/:Rid', async (req, res) => {
    const { id, Rid } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: id, receiver: Rid },
                { sender: Rid, receiver: id }
            ]
        }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

app.post("/signup", async (req, res) => {
    const { username, email, password, name } = req.body;
    const newUser = new User({
        email: email,
        username: username,
        name: name,
    });
    try {
        console.log("started");
        const registeredUser = await User.register(newUser, password);
        console.log("ended");
        res.send(registeredUser);
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

app.put('/user/:id/edit', upload.single('profile'), async (req, res) => {
    try {
      const id = req.params.id;
      const { username, name, email } = req.body;
      const profileUrl = req.file ? req.file.path : null; 
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (profileUrl && user.profile) {
        const urlParts = user.profile.split('/');
        const oldImagePublicId = urlParts[urlParts.length - 1].split('.')[0];
        await cloudinary.uploader.destroy(`wanderlust_DEV/${oldImagePublicId}`);
      }
      const updatedUser = await User.findByIdAndUpdate(id, {
        username,
        name,
        email,
        profile: profileUrl || user.profile, 
      }, { new: true });
  
      res.json({user:updatedUser});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
  

app.get("/all", async (req, res) => {
    try {
        const result = await User.find({}, '_id username profile name');
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.put("/user/:id/:uId", async (req, res) => {
    try {
        const { id, uId } = req.params;
        const { action } = req.body; // expect 'addFollower', 'removeFollower', 'addFollowing', 'removeFollowing'
        const user = await User.findById(id);
        const targetUser = await User.findById(uId);
        console.log("KOK",targetUser.followings.includes(id));
        
        if (!user || !targetUser) {
            return res.status(404).json({ message: "User not found" });
        }
            if (!targetUser.followings.includes(id)) {
                const Man = await User.findByIdAndUpdate(uId, {
                    $push: { followings: id },
                    $inc: { nFollowing: 1 }
                }, { new: true });
                const coMan = await User.findByIdAndUpdate(id, {
                    $push: { followers: uId },
                    $inc: { nFollowers: 1 }
                }, { new: true });
                res.json({ message: "Follower added successfully",user:Man,coMan });
            }else{
                const Man =  await User.findByIdAndUpdate(uId, {
                    $pull: { followings: id },
                    $inc: { nFollowing: -1 }
                }, { new: true });
                const coMan =  await User.findByIdAndUpdate(id, {
                    $pull: { followers: uId },
                    $inc: { nFollowers: -1 }
                }, { new: true });
                res.json({ message: "Follower removed successfully",user:Man,coMan });
            }
            console.log(user,targetUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/post/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("post");
        res.json({ data: user.post, User: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post("/post/:id/create", upload.single('Post'), async (req, res) => {
    const id = req.params.id;
    const postUrl = req.file ? req.file.path : null;
    const body = Object.assign({}, req.body);
    const description = body.Description;
    //console.log(body,description);
    try {
        if (!postUrl) {
            throw new Error("No file uploaded");
        }

        const newPost = new Post({
            videourl: postUrl,
            postOwner:id,
            description: description || "",
        });

        const savedPost = await newPost.save();
        
        const user = await User.findByIdAndUpdate(
            id,
            { $push: { post: savedPost._id }, $inc: { nPost: 1 } },
            { new: true } 
        );

        console.log(savedPost, user);
        res.status(201).json({savedPost,user}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create post" });
    }
});
app.put("/post/:id", async (req, res) => {
  const { commentId, post } = req.body;
    try {
        const { mention, remaining } = extractMention(req.body.comment);
      const CommentData = new Comment({
        text:remaining,
        owner: req.body.userId,
        replies: [], 
      });
      console.log("Naina",mention,remaining,CommentData);
      const savedComment = await CommentData.save();
      let updateUserResult;
      if (mention) {
        updateUserResult = await Comment.findByIdAndUpdate(
          commentId,
          {
            $push: { replies: savedComment._id },
            $inc: { nReply: 1 },
          },
          { new: true }
        );
        console.log('Comment updated:', updateUserResult);
      }else{
        updateUserResult = await Post.findByIdAndUpdate(
          req.body.post,
          {
            $push: { comments: savedComment._id },
            $inc: { nComments: 1 },
          },
          { new: true }
        );
      }
      
  
      res.status(200).json({savedComment,updateUserResult}); // Sending the saved comment back in the response
    } catch (error) {
      console.error("Error updating post with new comment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.delete('/post/:postId', async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const userId = post.postOwner._id;
      console.log(post.videourl,"data to delete");
        const urlParts = post.videourl.split('/');
        const publicIdWithExtension = urlParts.slice(-1)[0];
        const publicId = publicIdWithExtension.split('.')[0];

        console.log('Extracted Public ID:', publicId); // Should print: wanderlust_DEV/jhzsrwgy5o0rddipl22u

        await cloudinary.uploader.destroy(`wanderlust_DEV/${publicId}`, (error, result) => {
        if (error) {
            console.error('Error deleting image:', error);
        } else {
            console.log('Image delete result:', result);
        }
        });
      await Post.findByIdAndDelete(postId);
  
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { post: postId },
          $inc: { nPost: -1 },
        },
        { new: true }
      );
  
      res.status(200).json({ message: 'Post deleted successfully',user });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
app.get('/sresult', async (req, res) => {
    const query = req.query.query;
    try {
        const result = await User.find(
            { username: { $regex: query, $options: 'i' } },
            { _id: 1, username: 1, profile: 1, name: 1 }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get("/fetchcomment", async (req, res) => {
    try {
      const comments = await Comment.find({}).populate("owner");
      res.json(comments); 
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Internal Server Error' }); 
    }
  });
  app.get("/comment/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const post = await Post.findById(id)
  .populate({
    path: 'comments',
    populate: {
      path: 'replies',
      populate: { path: 'owner' },
      populate: {
        path: 'replies', 
        populate: { path: 'owner' } 
      }
    }
  })
  .populate('postOwner');
      //const commentowner = post.comments.populate("");
      //console.log("comments jbjbj",post);
      res.json(post); 
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Internal Server Error' }); 
    }
  });
app.post("/login", passport.authenticate("local", {
    failureFlash: true,
}), (req, res) => {
    res.send({ message: 'Login successful!', user: req.user });
});
app.get('/post/all', async (req, res) => {
    try {
        const posts = await Post.find({}).populate('postOwner');
      //console.log(posts);
      res.json({
        posts
    });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Server error');
    }
  });
  app.get('/reset', async (req, res) => {
    try {
        await Reset();
        res.json({ message: 'All user counts reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.get('/deleteAllPosts/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const result = await Comment.deleteMany({});
    } catch (error) {
      console.error('Error deleting posts:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
app.all("*", (req, res) => {
    res.send("WELCOME");
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
