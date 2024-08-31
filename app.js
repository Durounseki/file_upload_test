const express = require('express');
const app = express();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const upload = multer({storage});

app.get('/',(req,res) => {
    res.send('<form action="/upload" method="POST" enctype="multipart/form-data"><input type="file" name="file"><button type="submit">Submit</button></form>');
});

app.post('/upload', upload.single('file'),(req,res)=>{
    res.json(req.file);
});

const port = process.env.PORT  || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});