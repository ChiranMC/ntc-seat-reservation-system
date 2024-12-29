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
}
module.exports = new PaymentRecieptHistoryRepository();