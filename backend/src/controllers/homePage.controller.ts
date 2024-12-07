import { HomePage, HomePageDetails } from '../models/homePage.tmodel'
import * as homePageBl from '../bl/homePage.bl'
import { Request, Response } from 'express';



/**
 * @swagger
 * tags:
 *   name: HomePage
 *   description: APIs for managing home page
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     HomePage:
 *       type: HomePage
 *       required:
 *         - _id
 *         - about
 *         - contact 
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the home page
 *         about:
 *           type: string
 *           description: the about text of business 
 *         contact:
 *           type: string
 *           description: The contact text of business 
 *       example:
 *         _id: ' 878svve'
 *         about: 'fdhe gerg gergjer greg ermeg erg'
 *         contact: 'dhdfv dfvdevfdv fdefbvd fdvdfv fd fgvedfv fddv d'
 *     HomePageDetails:
 *       type: HomePageDetails
 *       required:
 *         - about
 *         - contact 
 *       properties:
 *         about:
 *           type: string
 *           description: the about text of business 
 *         contact:
 *           type: string
 *           description: The contact text of business 
 *       example:
 *         about: 'fdhe gerg gergjer greg ermeg erg'
 *         contact: 'dhdfv dfvdevfdv fdefbvd fdvdfv fd fgvedfv fddv d'
 */


/**
 * @swagger
 * /homepage:
 *   get:
 *     summary: Get home page
 *     tags: [HomePage]
 *     responses:
 *       200:
 *         description: Home page text
 *         content:
 *           application/json:
 *             schema:
 *               type: HomePage
 *               items:
 *                 $ref: '#/components/schemas/HomePage'
 */
const getHomePage = async (req: Request, res: Response) => {
    try{
        const homePage: HomePage = await homePageBl.getHomePage();
        res.status(200).send(homePage);
    } catch {
        res.status(404).send("Not Found");
    }
}


/**
 * @swagger
 * /homepage:
 *   post:
 *     summary: Create a new home page
 *     tags: [HomePage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HomePageDetails'
 *     responses:
 *       201:
 *         description: Home Page created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HomePage'
 *       400:
 *         description: Invalid Home Page details
 */
const createHomePage = async (req: Request , res: Response) => {
    try {
        const homrPage: HomePageDetails = req.body;
        const homePageCreated: HomePage = await homePageBl.createHomepage(homrPage);
        res.status(201).send(homePageCreated); 
    } catch (error) {
        res.status(400).send('Invalid Home Page details');
    }
}


/**
 * @swagger
 * /homepage/{id}:
 *   put:
 *     summary: Update a home page by ID
 *     tags: [HomePage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the home page to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HomePage'
 *     responses:
 *       200:
 *         description: Home page updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HomePage'
 *       400:
 *         description: Home page update failed
 */
const updateHomePage = async (req: Request , res:Response) => {
    try {
        const homePage: HomePage = req.body;
        const id : string = req.params.id;
        const homePageUpdated: HomePage = await homePageBl.updateHomePage(id, homePage);
        return res.status(200).send(homePageUpdated);
    } catch (error) {
        res.status(400).send('Home page update failed');
    }
}

export {
    getHomePage,
    createHomePage,
    updateHomePage,
}