import userService from '../services/userService'

let getAllService = async(req,res) =>{
    try {
        let info = await userService.getAllService(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        console.log('Get all code error: ',error);
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let handleLogin = async (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password)
    {
        return res.status(500).json({
        errCode : 1,
        message: 'Login Error. Let fill full infomation in the fields.',
        email: email,
        }); 
    }
    let userData = await userService.handleUserLogin(email,password);
    return res.status(200).json({
        errCode : userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {'Error' : "User is undefined"},
    }); //200: chạy bth, 500: lỗi
}

let handleGetUser = async(req,res) =>{
    let id = req.query.id; //ALL || id
    if(!id)
    {
        return res.status(500).json({
            errCode : 1,
            message: 'Missing required parameters.',
            users: []
            }); 
    }
    let users = await userService.getUsers(id);
    return res.status(200).json({
        errCode: 0,
        message : 'OK',
        data: users,
    })
}

let handleCreateNewUser = async(req,res) =>{
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async(req,res) =>{
    let data = req.body; 
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
}
// lỗi is not a function xảy ra do để raw: true ở file config.json hoặc ở đâu đó trong hàm xóa, tương tự đối với hàm update...
let handleDeleteUser = async(req,res) =>{
    if(!req.body)
        return res.status(500).json({
            errCode: 1,
            message: 'Missing required parameters.'
        })
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}


let handleChangePassword = async(req, res) =>{
    try {
        let data = req.body;
        let info = await userService.handleChangePassword(data);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let sendEmail = async(req,res) =>{
    try {
        let data = req.body;
        let info = await userService.sendEmail(data);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let handleFindPassword = async(req,res) =>{
    try {
        let data = req.body;
        let info = await userService.handleFindPassword(data);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}
module.exports = {
    getAllService:getAllService,
    handleLogin : handleLogin,
    handleGetUser: handleGetUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser:  handleEditUser,
    handleDeleteUser: handleDeleteUser,
    handleChangePassword:handleChangePassword,
    sendEmail:sendEmail,
    handleFindPassword :handleFindPassword ,
}