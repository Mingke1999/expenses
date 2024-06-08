import passport from "passport";
import bcrypt from 'bcryptjs';

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () =>{
    passport.serializeUser((User, done)=>{
        done(null,User.id)
    });

    passport.deserializeUser(async (id,done)=>{
        console.log("Desrializing User")
        try{
            const user = await User.findById(id);
            done(null, user)
        }catch(err){
            done(err)
        }
    })
     passport.use(
        new GraphQLLocalStrategy(async (username, password, done)=>{
            try{
                const user =  await User.findOne({username});
                const validPassword = await bcrypt.compare(password, user.password)
                if(!user || !validPassword){
                    throw new Error("Invalid username or password")
                }
                return done(null, user)
            }catch(err){
                return done(err)
            }
        })
     )
}