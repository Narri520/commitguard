class PaymentService {
  async createTransaction(amount, recipient, destinationType) {
    throw new Error('createTransaction method not implemented');
  }
  async getTransactionStatus(transactionId) {
    throw new Error('getTransactionStatus method not implemented');
  }
  async refundTransaction(transactionId) {
    throw new Error('refundTransaction method not implemented');
  }
}

class MockPaymentService extends PaymentService {
  async createTransaction(amount, recipient, destinationType) {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    const transactionId = `MOCK-TXN-${randomId}`;

    return {
      transactionId,
      amount,
      recipient,
      destinationType,
      status: 'SUCCESS',
      isMock: true,
      message: 'DEMO / SANDBOX TRANSACTION PROCESSED SUCCESSFULLY',
      timestamp: new Date().toISOString()
    };
  }

  async getTransactionStatus(transactionId) {
    return {
      transactionId,
      status: 'SUCCESS',
      isMock: true
    };
  }

  async refundTransaction(transactionId) {
    return {
      transactionId,
      status: 'REFUNDED',
      isMock: true
    };
  }
}

module.exports = new MockPaymentService();
