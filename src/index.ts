import express, {Request} from 'express';   // Import express
import cors from 'cors';   // Import cors
import mysql from 'mysql2';   // Import mysql
import fileUpload from 'express-fileupload';  // Import fileUpload
const app = express();   // Create express app

app.use(cors());   // Use cors
app.use(fileUpload());

const db = mysql.createConnection({
    host: 'mysql',
    user: 'terenciani',
    password: '123456',
    database: 'mydb',
    port: 3306
});
app.get('/', (req, res) => {
    db.connect((err) => {
        if (err) {
            res.status(500).send(err);
        }
        db.query('SELECT * FROM user', (err, result) => {
            if (err) {
                res.status(300).send("error");
            }
            res.status(200).send(result);
            });
    
    });
});


app.post('/user/upload', (req, res) => {
    //console.log("tentando mostrar o arquivo enviado.");
    //console.log(req.files?.arquivo);
    if(!req.files) {
        res.send({
            status: 400,
            message: 'No file uploaded'
        });
        return
    }
    const uploadFiles = req.files.arquivo;
    if(Array.isArray(uploadFiles)) {
        uploadFiles.forEach(uploadFile => {
            const prefix = Date.now()+"-"+uploadFile.name;
            uploadFile.mv('./files/upload/'+prefix, (err) => {
                if(err) {
                    res.status(500).send(err);
                }
            });
        });
        return
    }
    const prefix = Date.now()+"-"+uploadFiles.name;
    uploadFiles.mv('./files/upload/'+prefix, (err) => {
        if(err) {
            res.status(500).send(err);
        }
    });
    res.send("file uploaded");
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});   // Start server on port 3000
