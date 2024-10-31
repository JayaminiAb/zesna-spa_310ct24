import { TreeNode } from "primeng/api";

export interface PettyCashReport {
    id: number;
    description: string;
    weight: string;
    quantity: number;
    unitPrice: number;
    pettyCashReportList: PettyCashReport[]; // Recursive list of PettyCashReport items
}

export interface ReimburseDetails {
    id: number;
    userFullName: string;
    amount: number;
    addedDate: Date; // Use ISO string format for DateTime, e.g., "YYYY-MM-DDTHH:mm:ss"
    totalRecords: number;
}

export const transformToTreeNode = (data: PettyCashReport[]): TreeNode[] => {
    return data.map(item => ({
        data: {
            id: item.id,
            description: item.description,
            weight: item.weight,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        },
        expanded: true,
        children: item.pettyCashReportList ? transformToTreeNode(item.pettyCashReportList) : []
    }));
};