const User = require("../model/User");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("./response/apiResponse");
const auth = require("../middleware/jwt");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);


// User Schema
function UserData(data) {
    this.id = data._id;
    this.name= data.name;
    this.email = data.email;
}

exports.find = [
  auth,
    (req,res) => {
        try {
            User.findById(req.user._id).then((user)=>{
                if(user != null){
                    return apiResponse.successResponseWithData(res,"success",new UserData(user));
                }else{
                    return apiResponse.notFoundResponse(res,"no data");
                }
            }).catch((err)=>{
                return apiResponse.ErrorResponse(res,err);
            });
        } catch (err) {
            return apiResponse.ErrorResponse(res,err);
        }
    }
];

exports.update = [
    auth,
    body("name").isLength({ min: 1 }).trim().withMessage("name must be specified.")
        .isAlphanumeric().withMessage("name has non-alphanumeric characters."),
    sanitizeBody("name").escape(),
    (req,res) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }else{
                User.findById(req.user._id).then((user)=>{
                    if(user != null){
                        user.name = req.body.name;
                        User.findByIdAndUpdate(req.user._id,user,{},(err)=>{
                            if (err) {
                                return apiResponse.ErrorResponse(res, err);
                            }else{
                                return apiResponse.successResponseWithData(res,"Success.", new UserData(user));
                            }
                        })
                    }else{
                        return apiResponse.notFoundResponse(res,"no data");
                    }
                }).catch((err)=>{
                    return apiResponse.ErrorResponse(res,err);
                });
            }
        }catch (err) {
            return apiResponse.ErrorResponse(res,err);
        }
    }
];

exports.delete = [
    auth,
    (req,res) => {
        User.findById(req.user._id).then((user)=>{
            if(user != null){
                User.findByIdAndRemove(req.user._id,(err)=>{
                    if (err) {
                        return apiResponse.ErrorResponse(res, err);
                    }else{
                        return apiResponse.successResponse(res,"User delete Success.");
                    }
                })
            }else{
                return apiResponse.notFoundResponse(res,"no data");
            }
        }).catch((err)=>{
            return apiResponse.ErrorResponse(res,err);
        });
    }
];