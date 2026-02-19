import { InventoryItem, Quotation, Concern, Sale } from '../types/schema';

const STORAGE_KEYS = {
    INVENTORY: 'eps_inventory',
    QUOTATIONS: 'eps_quotations',
    CONCERNS: 'eps_concerns',
    SALES: 'eps_sales',
};

class DatabaseService {
    constructor() {
        // Seed data if empty
        if (!localStorage.getItem(STORAGE_KEYS.INVENTORY)) {
            this.set(STORAGE_KEYS.INVENTORY, [
                { id: '1', name: 'Glossy Paper A4', category: 'Paper', quantity: 500, unitPrice: 0.50, threshold: 100, lastUpdated: new Date().toISOString() },
                { id: '2', name: 'Matte Paper A4', category: 'Paper', quantity: 300, unitPrice: 0.55, threshold: 50, lastUpdated: new Date().toISOString() },
                { id: '3', name: 'Epson Ink Black', category: 'Ink', quantity: 20, unitPrice: 15.00, threshold: 5, lastUpdated: new Date().toISOString() },
            ]);
        }
        if (!localStorage.getItem(STORAGE_KEYS.QUOTATIONS)) {
            console.log('[DB] Seeding Quotations');
            this.set(STORAGE_KEYS.QUOTATIONS, [
                { id: 'q1', customerName: 'John Doe', customerEmail: 'john@example.com', items: [{ itemName: 'Glossy Paper A4', quantity: 100, price: 50 }], totalAmount: 50, status: 'PENDING', createdAt: new Date().toISOString() }
            ]);
        }
        if (!localStorage.getItem(STORAGE_KEYS.CONCERNS)) {
            console.log('[DB] Seeding Concerns');
            this.set(STORAGE_KEYS.CONCERNS, [
                { id: 'c1', customerName: 'Jane Smith', email: 'jane@example.com', subject: 'Inquiry', message: 'I need help with my order.', status: 'OPEN', createdAt: new Date().toISOString() }
            ]);
        }
        console.log('[DB] Initialized. Inventory:', this.getInventory().length, 'Quotes:', this.getQuotations().length, 'Concerns:', this.getConcerns().length);
    }

    // Helpers
    private get<T>(key: string): T[] {
        try {
            const data = localStorage.getItem(key);
            if (!data) return [];
            return JSON.parse(data);
        } catch (error) {
            console.error(`[DB] Error reading ${key}:`, error);
            return [];
        }
    }

    private notifyUpdate() {
        window.dispatchEvent(new CustomEvent('eps-db-update'));
    }

    private set(key: string, data: any[]) {
        try {
            console.log(`[DB] Setting ${key} at origin ${window.location.origin}:`, data);
            localStorage.setItem(key, JSON.stringify(data));
            this.notifyUpdate();
        } catch (error) {
            console.error(`[DB] Error saving ${key}:`, error);
        }
    }

    // Inventory
    getInventory(): InventoryItem[] {
        return this.get<InventoryItem>(STORAGE_KEYS.INVENTORY);
    }

    addInventoryItem(item: InventoryItem) {
        const items = this.getInventory();
        items.push(item);
        this.set(STORAGE_KEYS.INVENTORY, items);
    }

    updateInventoryItem(updatedItem: InventoryItem) {
        const items = this.getInventory();
        const index = items.findIndex((i) => i.id === updatedItem.id);
        if (index !== -1) {
            items[index] = updatedItem;
            this.set(STORAGE_KEYS.INVENTORY, items);
        }
    }

    deleteInventoryItem(id: string) {
        const items = this.getInventory();
        const newItems = items.filter(i => i.id !== id);
        this.set(STORAGE_KEYS.INVENTORY, newItems);
    }

    // Quotations
    getQuotations(): Quotation[] {
        return this.get<Quotation>(STORAGE_KEYS.QUOTATIONS);
    }

    addQuotation(quotation: Quotation) {
        console.log('[DB] Adding Quotation:', quotation);
        const quotes = this.getQuotations();
        quotes.push(quotation);
        this.set(STORAGE_KEYS.QUOTATIONS, quotes);
    }

    updateQuotationStatus(id: string, status: Quotation['status']) {
        const quotes = this.getQuotations();
        const quote = quotes.find((q) => q.id === id);
        if (quote) {
            quote.status = status;
            this.set(STORAGE_KEYS.QUOTATIONS, quotes);
        }
    }

    markQuotationAsRead(id: string) {
        const quotes = this.getQuotations();
        const quote = quotes.find(q => q.id === id);
        if (quote) {
            quote.isRead = true;
            this.set(STORAGE_KEYS.QUOTATIONS, quotes);
        }
    }

    // Concerns
    getConcerns(): Concern[] {
        return this.get<Concern>(STORAGE_KEYS.CONCERNS);
    }

    addConcern(concern: Concern) {
        console.log('[DB] Adding Concern:', concern);
        const concerns = this.getConcerns();
        concerns.push(concern);
        this.set(STORAGE_KEYS.CONCERNS, concerns);
    }

    updateConcernStatus(id: string, status: Concern['status']) {
        const concerns = this.getConcerns();
        const concern = concerns.find((c) => c.id === id);
        if (concern) {
            concern.status = status;
            this.set(STORAGE_KEYS.CONCERNS, concerns);
        }
    }

    markConcernAsRead(id: string) {
        const concerns = this.getConcerns();
        const concern = concerns.find(c => c.id === id);
        if (concern) {
            concern.isRead = true;
            this.set(STORAGE_KEYS.CONCERNS, concerns);
        }
    }

    markAllNotificationsAsRead() {
        const quotes = this.getQuotations();
        const concerns = this.getConcerns();

        let modified = false;

        quotes.forEach(q => {
            if (q.status === 'PENDING' && !q.isRead) {
                q.isRead = true;
                modified = true;
            }
        });

        concerns.forEach(c => {
            if (c.status === 'OPEN' && !c.isRead) {
                c.isRead = true;
                modified = true;
            }
        });

        if (modified) {
            this.set(STORAGE_KEYS.QUOTATIONS, quotes);
            this.set(STORAGE_KEYS.CONCERNS, concerns);
        }
    }

    // Sales
    getSales(): Sale[] {
        return this.get<Sale>(STORAGE_KEYS.SALES);
    }

    addSale(sale: Sale) {
        const sales = this.getSales();
        sales.push(sale);
        this.set(STORAGE_KEYS.SALES, sales);

        // AUTOMATION: Deduct stock
        const inventory = this.getInventory();
        sale.items.forEach((saleItem) => {
            const product = inventory.find(p => p.name === saleItem.itemName); // Simple match by name for now, ideally ID
            if (product) {
                product.quantity -= saleItem.quantity;
                product.lastUpdated = new Date().toISOString();
            }
        });
        this.set(STORAGE_KEYS.INVENTORY, inventory);
    }
}

export const db = new DatabaseService();
