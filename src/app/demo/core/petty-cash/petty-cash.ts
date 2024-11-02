import { TreeNode } from "primeng/api";

export interface PettyCashReport {
    Id: number;
    Description: string;
    Weight: string;
    Quantity: number;
    UnitPrice: number;
    PettyCashReportList: PettyCashReport[]; // Recursive list of PettyCashReport items
}

export interface ReimburseDetails {
    Id: number;
    UserFullName: string;
    Amount: number;
    AddedDate: Date; // Use ISO string format for DateTime, e.g., "YYYY-MM-DDTHH:mm:ss"
    TotalRecords: number;
}

export const transformToTreeNode = (data: PettyCashReport[]): TreeNode[] => {
    return data.map(item => ({
        data: {
            id: item.Id,
            description: item.Description,
            weight: item.Weight,
            quantity: item.Quantity,
            unitPrice: item.UnitPrice
        },
        expanded: true,
        children: item.PettyCashReportList ? transformToTreeNode(item.PettyCashReportList) : []
    }));
};