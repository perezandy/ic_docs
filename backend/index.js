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
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  attachment: { type: String } // 
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;




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



app.post('/replyToPost/:postId', upload.single('attachment'), async (req, res) => {
  const postId = req.params.postId;
  const { content, userId } = req.body;

  try {

    const parentPost = await Message.findById(postId);
    if (!parentPost) {
      return res.status(404).json({ message: 'Parent post not found' });
    }

   
    const newReply = new Message({
      content,
      user: userId,
      attachment: req.file ? req.file.path : null, 
      parentPost: postId,
    });

    await newReply.save();
    res.status(201).json({ message: 'Reply created successfully', reply: newReply });
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/recent-posts', async (req, res) => { // get 5 most recent messages
  try {
    const recentPosts = await Message.find({ replies: { $size: 0 } }).sort({ createdAt: -1 }).limit(5); 
    res.status(200).json(recentPosts);

  } catch (error) {
    console.error('Error fetching recent posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/posts/:postId', async (req, res) => { // get specific messages by postids - will come in useful for replies
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});