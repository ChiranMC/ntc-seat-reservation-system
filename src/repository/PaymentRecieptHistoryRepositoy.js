const PaymentRecieptHistory = require('../model/paymentRecieptHistory');

class PaymentRecieptHistoryRepository{
    async addNewRecieptHistory(paymentReciept){
        const pymnt = PaymentRecieptHistory.create(paymentReciept);
        return pymnt;
    }
}
module.exports = new PaymentRecieptHistoryRepository();