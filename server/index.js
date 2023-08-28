/*
    index.js file is responsible for connecting the database to the server using Pool.
    And it describes all the /api/functions.
*/

const Pool = require('pg').Pool;
const express = require('express')
const bcrypt = require('bcrypt')
const axios = require('axios')
const app = express();
const {createToken, validateToken} = require('./JWT')

const port = 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const cookie_parser = require('cookie-parser')

app.use(cors());
app.use(express.json())
app.use(cookie_parser())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'Aryan2191+',
  port: 27017
})

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.post('/verifyToken', async (req, res) => {
    const verify = validateToken(Object.keys(req.body)[0])
    return res.json(verify)
})

app.post('/api/verifyUser', async (req, res) => {  // check login
    const {email, password} = req.body;
    const bcryptRes = await axios.post("http://localhost:8080/api/doesUserExists", {email, password})
    if (bcryptRes.data.userExists === true) { // email is correct
        const encryptedPassword = bcryptRes.data.password
        if (await bcrypt.compare(password, encryptedPassword)) { // checking password
            const accessToken = createToken(bcryptRes.data) // if password is correct
            return res.json({accessToken, output: "User Exists", email: email, password: password})
        } else {
            return res.json({output: "Password does not match!"})
        }
    } else {
        return res.json({output: "Email does not exists!"})
    }
})

app.post('/api/doesUserExists', (req, res) => {
  const {email} = req.body;
    pool.query('SELECT * FROM main WHERE email = $1', [email], (err, results) => {
        if (err){
            console.log(err)
        }
        if(results.rows.length === 1) {
            res.json({userExists: true, password: results.rows[0].password, email: results.rows[0].email})
        } else {
            res.json({userExists: false, password: null, email: null})
        }
    })
}) // userExists or not

app.post('/api/createUser', async (req, res) => {
  const {fullName, email, contact, password, address, subscription} = req.body;
    const hash = await bcrypt.hash(password, 10)
    pool.query('INSERT INTO main (full_name, email, contact, password, address, subscription) VALUES ($1, $2, $3, $4, $5, $6)', [fullName, email, contact, hash, address, subscription], (err, results) => {
        if (err){
            console.log(err);
        }
        res.status(200).send('User added!');
    })
}) // register

app.patch('/api/updatePassword', async (req, res) => {
  const {email, newpassword} = req.body;
  const hash = await bcrypt.hash(newpassword, 10)
    pool.query('UPDATE main SET password = $1 WHERE email = $2', [hash, email], (err, results) => {
        if (err){
            console.log(err);
        }
        res.status(200).send('Password updated!')
    })
})

app.post("/api/createService", async(req, res) => {
    const {email, owner, selectedCheckboxes, plate, brand, status, cost, contact, customerEmail, comments} = req.body;

    const jsonObject = {};
    selectedCheckboxes.forEach(element => {
    jsonObject[element] = true;
    });
    const jsonString = JSON.stringify(jsonObject);

    pool.query('INSERT INTO services_created (email, car_owner, services, cost, car_plate, car_brand, status, customer_contact, customer_email, comments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [email, owner, jsonString, cost, plate, brand, status, contact, customerEmail, comments], (err, results) => {
        if(err){
            console.log(err)
        } else {
            res.status(200).send('Service created')
        }
    })
})

app.post('/api/getServices', (req, res) => {
    const {email, status} = req.body;
    pool.query('SELECT * FROM services_created WHERE email = $1 AND status=$2', [email, status], (err, results) => {
        if(err){
            console.log(err)
        }
        if(results.rows.length !== 0){
            res.json({services: true, row_data: results.rows})
        } else {
            res.json({services: false, row_data: null})
        }
    })
})

app.post('/api/cancelService', (req, res) => {
    const {email, car_owner, services, car_plate, car_brand, status} = req.body;
    pool.query('DELETE FROM services_created WHERE email=$1 AND car_owner=$2 AND services=$3 AND car_plate=$4 AND car_brand=$5', [email, car_owner, services, car_plate, car_brand], (err, results)=>{
        if(err){
            console.log(err)
        }
        res.json({deletion: "success"})
    })
})

app.patch('/api/changeToInProgress', (req, res) => {
    const {email, car_owner, services, car_plate, car_brand, status} = req.body;
    const newStatus = "inProgress"
    pool.query('UPDATE services_created SET status=$1 WHERE email=$2 AND car_owner=$3 AND services=$4 AND car_plate=$5 AND car_brand=$6', [newStatus, email, car_owner, services, car_plate, car_brand], (err, results)=>{
        if(err){
            console.log(err)
        }
        res.json({statusToProgress: "success"})
    })
})

app.patch('/api/changeToFinished', (req, res) => {
    const {email, car_owner, services, car_plate, car_brand, status} = req.body;
    const newStatus = "finished"
    pool.query('UPDATE services_created SET status=$1 WHERE email=$2 AND car_owner=$3 AND services=$4 AND car_plate=$5 AND car_brand=$6', [newStatus, email, car_owner, services, car_plate, car_brand], (err, results)=>{
        if(err){
            console.log(err)
        }
        res.json({statusToFinished: "success"})
    })
})

app.patch('/api/updatePassword', (req, res) => {
    const {email, newPassword} = req.body;
    const hash = bcrypt.hash(newPassword, 10)
      pool.query('UPDATE main SET password = $1 WHERE email = $2', [hash, email], (err, results) => {
          if (err){
            console.log(err);
          }
          res.status(200).send('Password updated!')
      })
  })

  app.post('/api/userInfo', (req, res) => {
    const {email} = req.body;
    pool.query('SELECT * FROM main WHERE email = $1', [email], (err, results) => {
        if (err){
          console.log(err);
        }
        res.json({data: results.rows[0]})
    })
  })

  app.patch('/api/editAccount', (req, res) => {
    const {name, contact, address, email} = req.body;
    pool.query('UPDATE main SET full_name = $1, contact = $2, address = $3 WHERE email = $4', [name, contact, address, email], (err, results) => {
        if (err){
          console.log(err);
        }
        res.json({infoUpdated: true})
    })
  })

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})