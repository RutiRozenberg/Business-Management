
import { User } from "../models/user.model";
import { comparePassword, hashPassword } from "./bcrypt.bl";
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import * as userService from "../services/user.service";


const envPath = path.join(__dirname, '../config', '.env');
dotenv.config({ path: envPath });


const signup = async (email: string, password: string, name: string) => {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    try{
        const hashedPassword = await hashPassword(password);
        const newUser: User = {
            email,
            password : hashedPassword,
            name,
        } as User;
        const user = await userService.createUser(newUser);
        return user;
    }
    catch(err){
        throw new Error('Something went wrong... try again');
    }
   
}


const signin = async (email :string , password :string ) => {
    const user: User | null = await userService.getUserByEmail(email);
    if( user && await comparePassword(password, user.password)){
        return await createToken(user.email , user.name , false);
    }
    return null;
}


const createToken = async( email : string , name: string , isAdmin:boolean)=>{
    const secret:string | undefined = process.env.SECRET;
    if(secret){
        const token = jwt.sign({ _id:email, name , isAdmin},
            secret, {
                expiresIn: "2h",
            }
        )
        return token;
    }
    return null;
}


const getUserById = async (id: string ) =>{
    try{
        const user:User |null = await userService.getUserById(id);
        if(user){
            return user; 
        }
        else{
            throw new Error("Not Found");
        }
    }
    catch{
        throw new Error("faild");
    }
}

const getAllUsers = async ()=>{
    try{
        const users:User[] = await userService.getAllUsers();
        if(users.length > 0)
        {
            return users;
        }
        throw new Error("Not found");
    }
    catch{
        throw new Error("Faild");
    }
}

const updateUser= async (id:string , userData:User)=>{
  try{
    if(id!=userData.id){
        throw new Error("");  
    }
    const userToUpdate:User = await getUserById(id);
    if(userData.name){
        userToUpdate.name= userData.name;
    }
    await userService.updateUser(id , userToUpdate);
  }
  catch{
    throw new Error("Faild");
    
  }

}


export {signup , signin , createToken , getUserById, getAllUsers , updateUser}
