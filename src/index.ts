import express from 'express';   // Import express
import mysql from 'mysql2';   // Import mysql
const app = express();   // Create express app


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


app.listen(3000, () => {
    console.log('Server started on port 3000');
});   // Start server on port 3000
