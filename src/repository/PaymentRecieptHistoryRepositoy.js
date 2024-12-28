const PaymentRecieptHistory = require('../model/paymentRecieptHistory');

class PaymentRecieptHistoryRepository{
    async addNewRecieptHistory(paymentReciept){
        const pymnt = PaymentRecieptHistory.create(paymentReciept);
        return pymnt.payment_receipt_id;
    }
}
module.exports = new PaymentRecieptHistoryRepository();