const {sign, verify} = require('jsonwebtoken')
const bodyParser = require('body-parser');
const express = require('express')
const cookie_parser = require('cookie-parser')
const app = express()

app.use(bodyParser.json())
app.use(cookie_parser())

const createToken = (user) => {
    const accessToken = sign(
        {email: user.email},
        "jwtsecret"
    )
    return accessToken;
}

const validateToken = (req) => {
    try {
        const validToken = verify(req, "jwtsecret")
        if (validToken !== null) {
            return {tokenExists: true}
        } else {
            console.log("INVALID-TOKEN")
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    createToken,
    validateToken
}