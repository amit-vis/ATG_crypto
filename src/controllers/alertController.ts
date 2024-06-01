import { Request, Response } from 'express';
import { createAlert, getAlerts, updateAlert } from '../services/alertService';

export const addAlert = async (req: Request, res: Response) => {
    try {
        const alert = await createAlert(req.body);
        res.status(201).json(alert);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const checkAlerts = async (req: Request, res: Response) => {
    try {
        const alerts = await getAlerts();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const markAlertNotified = async (req: Request, res: Response) => {
    try {
        const alert = await updateAlert(req.params.id, { notified: true });
        res.status(200).json(alert);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};
