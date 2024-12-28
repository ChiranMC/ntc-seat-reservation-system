const PaymentRecieptHistory = require('../model/paymentRecieptHistory');

class PaymentRecieptHistoryRepository{
    async addNewRecieptHistory(paymentReciept){
        try {
            const pymnt = await PaymentRecieptHistory.create(paymentReciept);
            return pymnt.payment_receipt_id;
        } catch (error) {
            console.error(error);
        }
    }
}
module.exports = new PaymentRecieptHistoryRepository();