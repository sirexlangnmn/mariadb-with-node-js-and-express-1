require("dotenv").config();
const mysql = require("mysql");

// Prepare to connect to MySQL with your secret environment variables
const connection = mysql.createConnection({
    host: process.env.MYSQL,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

// Make the connection
connection.connect(function (err) {
    // Check if there is a connection error
    if (err) {
        console.log("connection error", err.stack);
        return;
    }

    // If there was no error, print this message
    console.log(`connected to database`);
});

const sql = "SELECT * FROM monsters";
connection.query(sql, function (err, results, fields) {
    if (err) throw err;

    console.log("here are your results", results);
});

// WARNING: Pay attention to the question mark syntax
function getMonsterById(id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM monsters WHERE id = ?";
        connection.query(sql, [id], function (err, results, fields) {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    });
}

// run the function, looking up a monster by ID
getMonsterById(2)
    .then(data => console.log("monster #2", data))
    .catch(err => console.error(err));



connection.end();