import { users } from "../dummyData/data.js";

const userResolver = {
    Query:{
        //fetch all users
        users:(_,args,{req, res}) =>{
            return users
        },
        //select user by userId ->from resolver user(userId:ID!):User
        user:(_, args) =>{
            return users.find((user) =>user._id === args.userId)
        }
    },
    Mutation:{}
}

export default userResolver;