import { Service } from "../models/services.model"
import * as serviceBl from '../bl/service.bl'
import { Request, Response } from 'express';

/**
 * @swagger
 * tags:
 *   name: Service
 *   description: APIs for managing services
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: Service
 *       required:
 *         - _id
 *         - name
 *         - duration
 *         - price
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the service
 *         name:
 *           type: string
 *           description: The name of the service
 *         duration:
 *           type: number
 *           description: The duration of the service
 *         price:
 *           type: number
 *           description: The price of the service
 *         description:
 *           type: strind
 *           description: The description of the service
 *       example:
 *         _id: '1'
 *         name: 'Photography session'
 *         duration: 120
 *         price: 100
 *         description: "hdbfjwbdiufbweubcuwebu"
 *     ServiceDetails:
 *       type: ServiceDetails
 *       required:
 *         - name
 *         - duration
 *         - price
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the service
 *         duration:
 *           type: number
 *           description: The duration of the service
 *         price:
 *           type: number
 *           description: The price of the service
 *         description:
 *           type: strind
 *           description: The description of the service
 *       example:
 *         name: 'Photography session'
 *         duration: 120
 *         price: 100
 *         description: "hdbfjwbdiufbweubcuwebu"
 */


/**
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the service to retrieve
 *     responses:
 *       200:
 *         description: Service details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 */
const getServiceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const service: Service = await serviceBl.getServiceById(id) ;
        res.status(200).send(service);
    } catch (err) {
        res.status(404).send("Service does not exist");
    }
}

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: List of all services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 */
const getAllServices = async(req: Request, res: Response)=>{
    try{
        const allServices:Service [] = await serviceBl.getAllServices();
        res.status(200).send(allServices);
    }
    catch{
        res.status(404).send("Not found");
    }
}


/**
 * @swagger
 * /service:
 *   post:
 *     summary: Create a new service
 *     tags: [Service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceDetails'
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Invalid service details
 */
const createService = async (req: Request, res: Response): Promise<void> => {
    try {
        const service: Service | null = req.body as unknown as Service;
        const newService: Service = await serviceBl.createService(service);
        res.status(201).send(newService);
    } catch (err) {
        res.status(400).send("Invalid service details");
    }
}



/**
 * @swagger
 * /service/{id}:
 *   put:
 *     summary: Update a service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the service to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Service update failed
 */
const updateService = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const  serviceToUpdate: Service = req.body;
        await serviceBl.updateService(id, serviceToUpdate);
        res.status(200).send("The update was successful");
    } catch (err) {
        res.status(400).send("Service update failed");
    }
}


/**
 * @swagger
 * /service/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the service to delete
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       400:
 *         description: Service deletion failed
 */
const deleteService = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        await serviceBl.deleteService(id);
        res.status(200).send("Service deletion successful");
    } catch (err) {
        res.status(400).send("Service deletion failed");
    }
}

export { createService, updateService, getServiceById, deleteService , getAllServices }
