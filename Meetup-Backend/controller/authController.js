const bcrypt = require('bcrypt')
const Users = require('../model/user')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const registration = async (req, res) => {
    let { name, address, email, phone, password, chatHistory, friends } = req.body

    hasehdPassword = await bcrypt.hash(password, 10)
    password = hasehdPassword
    const user = new Users({
        name, address, email, phone, password, chatHistory, friends
    })

    try {
        result = await user.save()
        if (result) {
            res.status(201).send({
                message: 'User Registered'
            })
        }


    } catch (error) {
        res.status(500).send(error)
    }
}

const Login = async (req, res) => {

    const { phone, password } = req.body

    console.log('Login',req.body)

    const result = (await Users.find({ phone: phone }).populate('friendList'))[0]
    if (result) {
        try {
            const password_check = await bcrypt.compare(password, result.password)

            if (password_check) {

                const user = {
                    phone: result.phone,
                    name: result.name
                }
                const token = jwt.sign(user, process.env.SECRET)
                if (token) {
                    res.status(201).cookie('token', token).send({
                        message: ":Login Successful",
                        data:result
                    })
                }else{
                    res.status(500).send({
                        message:'Token Not Generated Server Problem'
                    })
                }

            } else {
                res.status(401).send({
                    message: 'Password Wrong'
                })
            }

        } catch (error) {
            res.status(500).send(error)
        }
    } else {
        res.status(401).send({
            message: 'User not Found'
        })
    }





}

module.exports = {
    registration,
    Login
}