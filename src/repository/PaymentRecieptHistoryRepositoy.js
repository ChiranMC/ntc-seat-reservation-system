const PaymentRecieptHistory = require('../model/paymentRecieptHistory');

class PaymentRecieptHistoryRepository{
    async addNewRecieptHistory(paymentReciept){
        const pymnt = PaymentRecieptHistory.create(paymentReciept);
        return pymnt.get('payment_receipt_id');;
    }
}
module.exports = new PaymentRecieptHistoryRepository();