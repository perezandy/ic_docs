const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

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


//define schema for messages
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;


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


app.post('/createNewPost', async (req, res) => {
  const { content, userId } = req.body;

  try {
    const newPost = new Message({ content, user: userId });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/replyToPost/:postId', async (req, res) => {
  const { content, userId } = req.body;
  const { postId } = req.params;

  try {
    const parentPost = await Message.findById(postId);
    if (!parentPost) {
      return res.status(404).json({ message: 'Parent post not found' });
    }

    const reply = new Message({ content, user: userId });
    await reply.save();

    parentPost.replies.push(reply);
    await parentPost.save();

    res.status(201).json({ message: 'Reply posted successfully', reply });
  } catch (error) {
    console.error('Error replying to post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});