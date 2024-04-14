const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const multer = require('multer'); // for file upload

const app = express();
const PORT = 3000;


const secretkey = process.env.SECRET_KEY;
const url = process.env.DB_URL;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema for users
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);




/*------------------------------------------------- Authentication Functions -------------------------------------------------*/

app.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });


    await newUser.save();

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {

    const { username, password } = req.body;
    
    try {

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password'});
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const token = jwt.sign({ userId: user._id, username: user.username }, secretkey);
      res.status(200).json({ token });

    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

/*------------------------------------------------- Message Functions -------------------------------------------------*/

const upload = multer({ // Define maximum attachment length
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB 
  },
});



const messageSchema = new mongoose.Schema({ // define schema for messages - includes an array of replies
  header: { type: String, required: true },
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  likedby: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  attachment: { type: String } // 
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;



//Completely original post
app.post('/createNewPost', upload.single('attachment'), async (req, res) => {
  const { header, text, user } = req.body;
  const attachmentPath = req.file ? req.file.path : null;

  try {
  
    const newPost = new Message({ header, text, user, attachment: attachmentPath });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
    
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



//Replying to a post
app.post('/replyToPost/:postId', upload.single('attachment'), async (req, res) => {
  const postId = req.params.postId;
  const { text, user } = req.body;
  const attachmentPath = req.file ? req.file.path : null;
  const header = " ";

  try {
    const parentPost = await Message.findById(postId);
    if (!parentPost) {
      return res.status(404).json({ message: 'Parent post not found' });
    }

    const newPost = new Message({ header, text, user, attachment: attachmentPath });
    await newPost.save();

    parentPost.replies.push(newPost);
    await parentPost.save();

    // Fetch the parent post again to get the updated version
    const updatedParentPost = await Message.findById(postId).populate('replies');
    if (!updatedParentPost) {
      return res.status(404).json({ message: 'Updated parent post not found' });
    }

    res.status(201).json({ message: 'Post created successfully', post: updatedParentPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/recent-posts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const [recentPosts, totalPosts] = await Promise.all([
      Message.find({ header: { $ne: " " } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Message.countDocuments({ header: { $ne: " " } }) // Get total count
    ]);

    res.status(200).json({ posts: recentPosts, totalPosts });
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


async function populateAllReplies(message) { //populate all replies of a message recursively
  await message.populate('replies');
  await message.populate({
    path: 'user',
    select: 'username'
  });
  if (!message.user) {
    message.user = { _id: null, username: '[deleted]' }; 
  }


  for (const reply of message.replies) {
    await populateAllReplies(reply);
    if (!reply.user) {
      reply.user = { _id: null, username: '[deleted]' }; 
    }
  }
}

app.get('/posts/:postId', async (req, res) => { // get specific messages by postids and recursively populate all replies
  try {
    const postId = req.params.postId;
    const post = await Message.findById(postId).populate({
      path: 'user',
      select: 'username'
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await populateAllReplies(post);
    res.status(200).json(post);
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/*------------------------------------------------- Liking Posts -------------------------------------------------*/
app.post('/liked-post/:postId', async (req, res) => { // Allows user to like the post - acts as a toggle
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Message.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const userIndex = post.likedby.indexOf(userId);
    if (userIndex === -1) {
      post.likedby.push(userId);
    } 
    else {
      post.likedby.splice(userIndex, 1);
    }
    
    
    const updatedPost = await post.save();
    res.status(200).json({ message: 'Post like toggled successfully', post: updatedPost });
  } 
  catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/likedbyuser/:postId/:userId', async (req, res) => { // Returns true or false if user has liked post
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;

    const post = await Message.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const isLikedByUser = post.likedby.includes(userId);
    res.status(200).json({ liked: isLikedByUser });
  } catch (error) {
    console.error('Error checking if post is liked by user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});