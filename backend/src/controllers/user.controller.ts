import * as userBl from "../bl/user.bl"
import { Request, Response } from 'express';
import { User, UserDetails } from "../models/user.model";


export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: User
 *       required:
 *         - email
 *         - password
 *         - name
 *         - _id 
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         name:
 *           type: string
 *           description: The user's name
 *         _id:
 *           type: string
 *           description: The user's id
 *       example:
 *         email: 'user@example.com'
 *         password: 'password123'
 *         name: 'John Doe'
 *         _id: '454'
 *     UserDetails:
 *       type: UserDetails
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         name:
 *           type: string
 *           description: The user's name
 *       example:
 *         email: 'user@example.com'
 *         password: 'password123'
 *         name: 'John Doe'
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDetails'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
const postSignUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const user:UserDetails = req.body;
        if (!user.email || !user.password || !user.name) {
            res.status(400).send({ error: "Email, password, and name are required" });
        }
        const newUser:User = await userBl.signup(user);
        if (user) {
            res.status(201).send(newUser);
        } else {
            res.status(400).send({ error: "User could not be created" });
        }
    } catch (err) {
        res.status(400).send({ error: "User could not be created, Try another one" });
        

    }
};

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *             example:
 *               email: 'user@example.com'
 *               password: 'password123'
 *     responses:
 *       200:
 *         description: Signed in successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
const postSignIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const token = await userBl.signin(email, password);
            if (token) {
                res.status(200).send(token);
            } else {
                res.status(401).send("Invalid credentials");
            }
        } else {
            res.status(400).send("Email and password are required");
        }
    } catch (err) {
        res.status(500).send("Failed to sign in");
    }
};


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Users not found
 */
const getAllUsers = async( req:Request , res:Response)=>{
    try{
        const users:User[] = await userBl.getAllUsers();
        res.status(200).send(users);
    }
    catch{
        res.status(404).send("Not found");
    }
}


/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User update failed
 */
const updateUser = async (req:Request , res:Response)=>{    
    try{
        const id:string = req.params.id;
        const user:User = req.body;
        await userBl.updateUser(id, user);
        res.status(200).send("Seccesful");
    }
    catch{
        res.status(400).send("Faild");
    }
}


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
const getUserById = async (req:Request , res:Response)=>{
  try{    
    const id:string = req.params.id;
    const user = await userBl.getUserById(id);
    res.status(200).send(user);
  }
  catch{
    res.status(404).send("Not Found");
  }
}


export { postSignUp, postSignIn , getAllUsers , updateUser , getUserById};
