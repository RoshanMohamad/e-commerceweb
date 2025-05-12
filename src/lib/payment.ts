// types/payment.ts
export interface PaymentDetails {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  // Add other payment method specific details
}

export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

export interface OrderData {
  userId: string;
  items: PaymentItem[];
  totalAmount: number;
  paymentMethod: string;
  shippingAddress?: string;
  billingAddress?: string;
}

export interface OrderResult extends OrderData {
  orderId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

// services/payment.ts
export async function processPayment({
  amount,
  paymentMethod,
  paymentDetails,
}: {
  amount: number;
  paymentMethod: string;
  paymentDetails: PaymentDetails;
  items: PaymentItem[];
}): Promise<PaymentResult> {
  // Validate input
  if (amount <= 0) {
    throw new Error('Invalid payment amount');
  }

  if (!['credit_card', 'paypal', 'bank_transfer'].includes(paymentMethod)) {
    throw new Error('Unsupported payment method');
  }

  // Simulate API call to payment processor
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Additional validation could go here
        if (paymentMethod === 'credit_card' && !paymentDetails.cardNumber) {
          throw new Error('Card number is required');
        }

        // Simulate successful payment (95% success rate)
        if (Math.random() < 0.95) {
          resolve({
            success: true,
            transactionId: `txn_${Math.random().toString(36).substring(2, 15)}`,
            amount,
            date: new Date().toISOString(),
            paymentMethod,
          });
        } else {
          // Simulate payment failure
          throw new Error('Payment processing failed. Please try again.');
        }
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Payment processing error'));
      }
    }, 2000); // Simulate network delay
  });
}

// services/order.ts
export async function saveOrder(orderData: OrderData): Promise<OrderResult> {
  // Validate order data
  if (!orderData.userId) {
    throw new Error('User ID is required');
  }

  if (!orderData.items || orderData.items.length === 0) {
    throw new Error('Order must contain at least one item');
  }

  const now = new Date().toISOString();
  
  // In a real app, this would save to a database
  const savedOrder: OrderResult = {
    ...orderData,
    orderId: `ord_${Math.random().toString(36).substring(2, 10)}`,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  console.log('Order saved:', savedOrder);
  return savedOrder;
}

