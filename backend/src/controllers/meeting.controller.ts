import { Meeting, MeetingDetails } from "../models/meeting.model"
import * as meetingBl from '../bl/meeting.bl'
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: Meeting
 *   description: APIs for managing meetings
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Meeting:
 *       type: Meeting
 *       required:
 *         - _id
 *         - userId
 *         - serviceId
 *         - startTime
 *         - endTime
 *         - textMessage
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the meeting
 *         userId:
 *           type: string
 *           description: The unique identifier of the meeting user
 *         serviceId:
 *           type: string
 *           description: The unique identifier of the meeting service
 *         endTime:
 *           type: string
 *           description: The end time of meeting
 *         textMessage:
 *           type: string
 *           description: A text message from the user to the admin
 *       example:
 *         _id: '1dfvdvfdvfvf'
 *         userId: '1dfvfdv878'
 *         serviceId: '1dfv-dvfdv-fvfdsgdf'
 *         startTime: '2025-03-03T14:50:59.744Z'
 *         endTime: '2025-03-03T21:50:59.744Z'
 *         textMessage: 'hhhhhh'
 *     MeetingDetails:
 *       type: MeetingDetails
 *       required:
 *         - userId
 *         - serviceId
 *         - startTime
 *         - endTime
 *         - textMessage
 *       properties:
 *         userId:
 *           type: string
 *           description: The unique identifier of the meeting user
 *         serviceId:
 *           type: string
 *           description: The unique identifier of the meeting service
 *         endTime:
 *           type: string
 *           description: The end time of meeting
 *         textMessage:
 *           type: string
 *           description: A text message from the user to the admin
 *       example:
 *         userId: '1dfvfdv878'
 *         serviceId: '1dfv-dvfdv-fvfdsgdf'
 *         startTime: '2025-03-03T14:50:59.744Z'
 *         endTime: '2025-03-03T21:50:59.744Z'
 *         textMessage: 'hhhhhh'
 */


/**
 * @swagger
 * /meeting/{id}:
 *   get:
 *     summary: Get a meeting by ID
 *     tags: [Meeting]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meeting to retrieve
 *     responses:
 *       200:
 *         description: Meeting details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       404:
 *         description: Meeting not found
 */
const getMeetingById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const meeting: Meeting = await meetingBl.getMeetingById(id) ;
        res.status(200).send(meeting);
    } catch (err) {
        res.status(404).send("Meeting does not exist");
    }
}

/**
 * @swagger
 * /meetings:
 *   get:
 *     summary: Get all meetings
 *     tags: [Meeting]
 *     responses:
 *       200:
 *         description: List of all meetings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meeting'
 */
const getAllMeetings = async(req: Request, res: Response)=>{
    try{
        const allMeetings:Meeting [] = await meetingBl.getAllMeetings();
        res.status(200).send(allMeetings);
    }
    catch{
        res.status(404).send("Not found");
    }
}


/**
 * @swagger
 * /meeting/user/{userId}:
 *   get:
 *     summary: Get all meeting by user ID
 *     tags: [Meeting]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of user
 *     responses:
 *       200:
 *         description: All meetings by user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meeting'
 *       404:
 *         description: Meetings not found
 */
const getMeetingsByUserId = async (req:Request, res:Response) => {
    try {
        const userId: string = req.params.userId;
        const meetingsByUserId: Meeting[] = await meetingBl.getMeetingsByUserId(userId);
        res.status(200).send(meetingsByUserId);
    } catch (error) {
        res.status(400).send("Not found");
    }
}


/**
 * @swagger
 * /meeting:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meeting]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MeetingDetails'
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       400:
 *         description: Invalid meeting details
 */
const createMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
        const meeting: MeetingDetails = req.body;
        const newMeeting: Meeting = await meetingBl.createMeeting(meeting);
        res.status(201).send(newMeeting);
    } catch (err) {
        res.status(400).send("Invalid meeting details");
    }
}



/**
 * @swagger
 * /meeting/{id}:
 *   put:
 *     summary: Update a meeting by ID
 *     tags: [Meeting]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meeting to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meeting'
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       400:
 *         description: Meeting update failed
 */
const updateMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const  meetingToUpdate: Meeting = req.body;
        await meetingBl.updateMeeting(id, meetingToUpdate);
        res.status(200).send("The update was successful");
    } catch (err) {
        res.status(400).send("Meeting update failed");
    }
}


/**
 * @swagger
 * /meeting/{id}:
 *   delete:
 *     summary: Delete a meeting by ID
 *     tags: [Meeting]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meeting to delete
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 *       400:
 *         description: Meeting deletion failed
 */
const deleteMeeting = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        await meetingBl.deleteMeeting(id);
        res.status(200).send("Meeting deletion successful");
    } catch (err) {
        res.status(400).send("Meeting deletion failed");
    }
}

export { 
    createMeeting, 
    updateMeeting, 
    getMeetingById, 
    deleteMeeting , 
    getAllMeetings,
    getMeetingsByUserId 
}
