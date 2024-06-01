import Alert from '../models/alertModel';

export const createAlert = async (alertData: any) => {
    const alert = new Alert(alertData);
    await alert.save();
    return alert;
};

export const getAlerts = async () => {
    return await Alert.find({ });
};

export const updateAlert = async (alertId: string, data: any) => {
    return await Alert.findByIdAndUpdate(alertId, data, { new: true });
};
