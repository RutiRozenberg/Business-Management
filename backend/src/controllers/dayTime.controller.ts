import * as dayTimeBl from '../bl/daytimes.bl'
import { Request, Response } from 'express';
import { DayTimes } from '../models/daytimes.model';


/**
 * @swagger
 * tags:
 *   name: Daytimes
 *   description: APIs for managing daytime
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     DayTimes:
 *       type: DayTimes
 *       required:
 *         - _id
 *         - date
 *         - times
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the daytime
 *         date:
 *           type: string
 *           description: The date field in the format YYYY-MM-DDTHH:MM:SS.sssZ
 *         times:
 *           type: TimeRange[]
 *           description: The time range in this date
 *       example:
 *         _id: '1dfv-dvfdv-fvf'
 *         date: '2025-03-03T21:50:59.744Z'
 *         times: []
 *     DayTimesDetails:
 *       type: DayTimesDetails
 *       required:
 *         - date
 *         - times
 *       properties:
 *         date:
 *           type: string
 *           description: The date field in the format YYYY-MM-DDTHH:MM:SS.sssZ
 *         times:
 *           type: TimeRange[]
 *           description: The time range in this date
 *       example:
 *         date: '2025-03-03T21:50:59.744Z'
 *         times: []
 */


/**
 * @swagger
 * /daytime/{id}:
 *   get:
 *     summary: Get a daytime by ID
 *     tags: [Daytimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meeting to retrieve
 *     responses:
 *       200:
 *         description: Daytime details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DayTimes'
 *       404:
 *         description: Daytime not found
 */
const getDayTimesById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const daytime: DayTimes = await dayTimeBl.getDayTimeById(id) ;
        res.status(200).send(daytime);
    } catch (err) {
        res.status(404).send("Daytime does not exist");
    }
}


/**
 * @swagger
 * /daytime/date/{date}:
 *   get:
 *     summary: Get a daytime by date
 *     tags: [Daytimes]
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: Date of the daytime to retrieve.
 *     responses:
 *       200:
 *         description: Daytimes details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DayTimes'
 *       404:
 *         description: Daytime not found
 */
const getDayTimeByDate = async (req: Request, res: Response): Promise<void> => {
    try {
        const dateData:Date = new Date(req.params.date);
        const timeByDate = await dayTimeBl.getDayTimeByDate(dateData);
        res.status(200).send(timeByDate);
    } catch (error) {
        res.status(404).send("Daytime does not exist");
    }
}

/**
 * @swagger
 * /daytimes:
 *   get:
 *     summary: Get all daytimes
 *     tags: [Daytimes]
 *     responses:
 *       200:
 *         description: List of all daytime
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DayTimes'
 */
const getAllDayTimes = async(req: Request, res: Response)=>{
    try{
        const allDayTimes:DayTimes [] = await dayTimeBl.getAllDayTimes();
        res.status(200).send(allDayTimes);
    }
    catch{
        res.status(404).send("Not found");
    }
}


/**
 * @swagger
 * /daytime:
 *   post:
 *     summary: Create a new daytime
 *     tags: [Daytimes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DayTimesDetails'
 *     responses:
 *       201:
 *         description: Daytime created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DayTimes'
 *       400:
 *         description: Invalid daytime details
 */
const createDayTimes = async (req: Request, res: Response): Promise<void> => {
    try {
        const daytime: DayTimes | null = req.body as unknown as DayTimes;    
        const newDayTimes: DayTimes = await dayTimeBl.createDayTimes(daytime);
        res.status(201).send(newDayTimes);
    } catch (err) {
        res.status(400).send("Invalid daytime details");
    }
}


/**
 * @swagger
 * /daytime/{id}:
 *   put:
 *     summary: Update a daytime by ID
 *     tags: [Daytimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the daytime to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DayTimes'
 *     responses:
 *       200:
 *         description: Daytime updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DayTimes'
 *       400:
 *         description: Daytime update failed
 */
const updateDayTimes = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;        
        const  dayTimeToUpdate: DayTimes = req.body;
        await dayTimeBl.updateDayTimes(id, dayTimeToUpdate);
        res.status(200).send("The update was successful");
    } catch (err) {
        res.status(400).send("Daytime update failed");
    }
}


/**
 * @swagger
 * /daytime/{id}:
 *   delete:
 *     summary: Delete a daytime by ID
 *     tags: [Daytimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the daytime to delete
 *     responses:
 *       200:
 *         description: Daytime deleted successfully
 *       400:
 *         description: Daytime deletion failed
 */
const deleteDayTimes = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        await dayTimeBl.deleteDayTimes(id);
        res.status(200).send("Daytime deletion successful");
    } catch (err) {
        res.status(400).send("Daytime deletion failed");
    }
}

export { getAllDayTimes, getDayTimesById, createDayTimes, updateDayTimes, deleteDayTimes, getDayTimeByDate}
