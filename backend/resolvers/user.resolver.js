import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import Transaction from "../models/transaction.model.js";

const userResolver = {
    Query:{
        //fetch all users
        authUser:async(_,args,context) =>{
            try{
                const user = await context.getUser()
                return user;
            }catch(err){
                console.error("Error in authticating user",err);
                throw new Error(err.message || "Internal Server Error");
            }
        },
        //select user by userId ->from resolver user(userId:ID!):User
        user:async(_, {userId}) =>{
           try{
            const user = await User.findById(userId)
            return user;
           }catch(err){
                console.error("Error in fetching user",err);
                throw new Error(err.message || "Internal Server Error");
           }
        }
    },
    Mutation:{
        signup:async(_,{ input },context) =>{
            try{
                const {username, name, password, gender} = input
                
                if(!username || !name || !password || !gender){
                    throw new Error("signup parameter missing");
                }
                const exsitingUser = await User.findOne({username});
                if(exsitingUser){
                    throw new Error("The user existing");
                }
                const salt =  await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt);
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}` ;

                const newUser = new User({
                    username,
                    name, 
                    password:hashedPassword,
                    gender,
                    profilePicture:gender === "male" ? boyProfilePic : girlProfilePic
                })
                await newUser.save();
                await context.login(newUser);

                return newUser;
            }catch(err){
                console.error("Error in signup",err);
                throw new Error(err.message || "Internal Server Error");
            }
        },
        login:async(_,{input},context)=>{
            try{
                const {username, password} = input;
                if (!username || !password) throw new Error("All fields are required");
                const {user} = await context.authenticate("graphql-local",{username, password})

                await context.login(user);

                return user;
            }catch(err){
                console.error("Error in login", err);
                throw new Error(err.message || "Internal Server Error");
            }
        },
        logout:async(_,args,context)=>{
            try{
                await context.logout();
                context.req.session.destroy((err)=>{
                    if(err) throw err
                })
                context.res.clearCookie("connect.sid");
                return {message:"Logged out"};
            }catch(err){
                console.error("Error in logout", err);
                throw new Error(err.message || "Internal Server Error");
            }
        }
        
    },
    User:{
        transactions:async(parent,_,context)=>{
            try{
                const transactions = await Transaction.find({userId:parent._id});
                return transactions;
            }catch(error){
                throw new Error(err.message || "Internal Server Error");
            }
        }
    }
}

export default userResolver;
