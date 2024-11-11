export interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface Supplier {
    label: string;
    value: { code: string; name: string } | null;
}

export interface InvoiceData {
    id: number;
    companyName: string;
    companyAddress1: string;
    companyAddress2: string;
    clientName: string;
    clientContact: string;
    clientAddress: string;
    invoiceNumber: string;
    companyPhone1: string;
    companyPhone2: string;
    companyEmail: string;
    companyWeb: string;
    supplier: Supplier;
    invoiceDate: Date;
    discount: number;
    dueDate: Date;
    items: InvoiceItem[];
}
