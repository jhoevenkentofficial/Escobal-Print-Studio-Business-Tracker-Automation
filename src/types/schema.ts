export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    quantity: number;
    unitPrice: number;
    threshold: number; // Low stock alert threshold
    lastUpdated: string;
}

export interface Quotation {
    id: string;
    customerName: string;
    customerEmail: string;
    items: { itemName: string; quantity: number; price: number }[];
    totalAmount: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    isRead?: boolean;
}

export interface Concern {
    id: string;
    customerName: string;
    email: string;
    subject: string;
    message: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
    createdAt: string;
    isRead?: boolean;
}

export interface Sale {
    id: string;
    customerName: string; // Optional if walk-in
    items: { itemName: string; quantity: number; price: number }[];
    totalAmount: number;
    date: string;
    paymentMethod: 'CASH' | 'GCASH' | 'BANK_TRANSFER';
}
