const User = require('../modal/userModal')
const rootDir = require('../util/path')
const path = require('path')


exports.saveToStorage = async (req, res, next) => {    
    const name = req.body.user
    const email = req.body.emailID
    const phoneNumber = req.body.phoneNumber
  
    if (!name || !email || !phoneNumber) {
      return res.status(400).json({ error: 'Name, email, and phone number are required' });
      
    }
  
    try {
      const data = await User.create({ name:name, email:email, phoneNumber:phoneNumber });
        // res.status(201).redirect('/')
      res.status(201).json({ newUserDetail: data })
    
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error });
    }
  };

exports.getAllUsers = async (req, res, next) => {

    User.findAll()
    .then((users) =>{
        res.json(users)
    })
    .catch(error => console.log(error))

}

exports.deleteUser = async(req,res,next) =>{
  if(!req.params.id){
    res.status(400).json({err:"Missing ID"})
  }
  try{
    const userID = req.params.id
    User.destroy({where:{id : userID}})
    console.log("successfully deleted from backend")
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ error: error });
  }
}

