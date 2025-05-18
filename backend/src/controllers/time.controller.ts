import { TimeRange } from "../models/timerange.model";
import * as timeBL from '../bl/time.bl';
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: TimeRange
 *   description: APIs for managing time ranges
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TimeRange:
 *       type: TimeRange
 *       required:
 *         - _id
 *         - start
 *         - end
 *       properties:
 *         _id:
 *           type: string
 *         start:
 *           type: string
 *           description: The start field in the format YYYY-MM-DDTHH:MM:SS.sssZ
 *         end:
 *           type: string
 *           description: The end field in the format YYYY-MM-DDTHH:MM:SS.sssZ
 *       example:
 *         _id: '1dsvds-dvds'
 *         start: '2024-08-03T18:50:59.744Z'
 *         end: '2024-08-03T21:50:59.744Z'
 */

/**
 * @swagger
 * /timerange/{daytimeId}/{timerangeId}:
 *   get:
 *     summary: Get a time range by ID
 *     tags: [TimeRange]
 *     parameters:
 *       - in: path
 *         name: daytimeId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the daytime to retrieve
 *       - in: path
 *         name: timerangeId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the time range to retrieve
 *     responses:
 *       200:
 *         description: Time range details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeRange'
 *       404:
 *         description: Time range not found
 */
const getTimeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const daytimeId = req.params.daytimeId;
        const timerangeId = req.params.timerangeId;
        const time: TimeRange = await timeBL.getTimeById(daytimeId , timerangeId);
        res.status(200).send(time);
    } catch (err) {
        res.status(404).send("Time range not found");
    }
}


/**
 * @swagger
 * /timerange/{daytimeId}:
 *   post:
 *     summary: Create a new time range
 *     tags: [TimeRange]
 *     parameters:
 *       - in: path
 *         name: daytimeId
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeRange'
 *     responses:
 *       201:
 *         description: Time range created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeRange'
 *       400:
 *         description: Invalid time range details
 */
const createTime = async (req: Request, res: Response): Promise<void> => {
    try {        
        const time: TimeRange | null = req.body as unknown as TimeRange;
        const daytimeId = req.params.daytimeId ;
        await timeBL.createTime(time , daytimeId);
        res.status(201).send("newTime created");
    } catch (err) {
        res.status(400).send("Invalid time range details");
    }
}

/**
 * @swagger
 * /timerange/{daytimeId}:
 *   put:
 *     summary: Update a time by ID
 *     tags: [TimeRange]
 *     parameters:
 *       - in: path
 *         name: daytimeId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the daytime to retrieve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeRange'
 *     responses:
 *       200:
 *         description: Time range updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeRange'
 *       400:
 *         description: Time range update failed
 */
const updateTime = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.daytimeId;
        const timeToUpdate: TimeRange = req.body;
        await timeBL.updateTime(id, timeToUpdate);
        res.status(200).send("The update was successful");
    } catch (err) {
        res.status(400).send("Time update failed");
    }
}

/**
 * @swagger
 /timerange/{daytimeId}/{timerangeId}:
 *   delete:
 *     summary: Delete a time range by ID
 *     tags: [TimeRange]
 *     parameters:
 *       - in: path
 *         name: daytimeId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the daytime to retrieve
 *       - in: path
 *         name: timerangeId
 *         required: true
 *         schema:
 *           type: string
 *           description: ID of the time range to retrieve
 *     responses:
 *       200:
 *         description: Time range deleted successfully
 *       400:
 *         description: Time range deletion failed
 */
const deleteTime = async (req: Request, res: Response): Promise<void> => {
    try {
        const timeId = req.params.timerangeId;
        const daytimeId = req.params.daytimeId;
        await timeBL.deleteTime(timeId, daytimeId);
        res.status(200).send("Time deletion successful");
    } catch (err) {
        res.status(400).send("Time deletion failed");
    }
}

export { createTime, updateTime, getTimeById, deleteTime};
