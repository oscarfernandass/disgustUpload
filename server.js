const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 4000;

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// Handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  // Respond with a success message (you can customize this response)
  res.json({ message: 'Image uploaded successfully, please redirect to the original page to see the content in the feed. ' });


  
});

// Serve a list of image filenames as JSON
app.get('/images', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(files);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
