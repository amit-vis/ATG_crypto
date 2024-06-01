import { getCryptoPrice } from '../services/priceService';
import { getAlerts, updateAlert } from '../services/alertService';
import { cryptoNoti } from '../utils/nodemailer'; // Ensure this path is correct based on your project structure

const checkPriceAlerts = async () => {
    const alerts = await getAlerts();

    for (const alert of alerts) {
        const priceData = await getCryptoPrice(alert.cryptocurrency);
        const currentPrice = priceData[alert.cryptocurrency].usd;

        let alertTriggered = false;
        if (alert.comparison === 'above' && currentPrice > alert.targetPrice) {
            alertTriggered = true;
        } else if (alert.comparison === 'below' && currentPrice < alert.targetPrice) {
            alertTriggered = true;
        }

        if (alertTriggered) {
            console.log(`Alert triggered for user ${alert.userId}: ${alert.cryptocurrency} is ${alert.comparison} ${alert.targetPrice}`);

            // Call the cryptoNoti function to send the notification email
            const notificationResult = await cryptoNoti(alert.userId, alert.cryptocurrency, alert.comparison, alert.targetPrice.toString());

            if (notificationResult.success) {
                console.log("Notification email sent successfully.");
                await updateAlert(alert._id.toString(), { notified: true });
            } else {
                console.log("Failed to send notification email.", notificationResult.error);
            }
        }
    }
};

// Run the check every minute
setInterval(checkPriceAlerts, 60000);
