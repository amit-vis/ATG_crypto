import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cryptocurrency: { type: String, required: true },
    targetPrice: { type: Number, required: true },
    comparison: { type: String, required: true },
    notified: { type: Boolean, default: false }
});

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
