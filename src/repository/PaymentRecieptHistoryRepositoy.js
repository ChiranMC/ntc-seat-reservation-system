const PaymentRecieptHistory = require('../model/paymentRecieptHistory');

class PaymentRecieptHistoryRepository{
    async saveToPayment(paymentData) {
        try {
            const payment = await PaymentRecieptHistory.create(paymentData);  
            return payment.payment_receipt_id;  
        } catch (error) {
            console.error('Error saving payment:', error);
            throw error;
        }
    }

    async getPaymentIdByIssuedTime(issuedTime) {
        try {
            const payment = await PaymentRecieptHistory.findOne({
                where: { issued_time: issuedTime },
                attributes: ['payment_receipt_id'] 
            });
            if (payment) {
                return payment.payment_receipt_id;
            } else {
                console.error('No payment found for the given issued_time.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching payment by issued_time:', error);
            throw error;
        }
    }
}
module.exports = new PaymentRecieptHistoryRepository();