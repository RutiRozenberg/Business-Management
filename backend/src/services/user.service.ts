
import { userModel, User, UserDetails } from '../models/user.model'; 

const createUser = async (userData: UserDetails): Promise<User> => {
  try {
    const newUser = new userModel(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error('Failed to save user to the database');
  }
};


const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      throw new Error('Failed to fetch user from the database');
    }
};

const getUserById = async (id :string ) =>{
  try {
    const user:User | null = await userModel.findById(id);    
    return user;
  } catch{
    throw new Error("Failed");
    
  }
}

const updateUser = async (id: string , userData:User)=>{
  try{
    await userModel.findByIdAndUpdate(id , userData);
  }
  catch{
    throw new Error("Faild");
  }
}


const getAllUsers = async(): Promise<User[]>=>{
  try{
    const users:User[] =  await userModel.find();
    return users;
   
  }
  catch{
    throw new Error("Faild");
  }
}



export { createUser , getUserByEmail , getAllUsers , getUserById , updateUser };
