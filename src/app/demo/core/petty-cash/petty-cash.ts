import { TreeNode } from "primeng/api";

export interface PettyCashReport {
    Id: number;
    Description: string;
    Weight: string;
    Quantity: number;
    UnitPrice: number;
    ItemTotalAmount ?: number;
    PettyCashReportList: PettyCashReport[]; // Recursive list of PettyCashReport items
}

export interface PettyCashRequestBody {
    PettyCashReport: PettyCashReport;
    SelectedDate: Date;
    EstateId: number;
    ParentId: number;
    CurrentId: number;
    AddDirection: string;
    ActionType: string;
    UserID: number;

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
            unitPrice: item.UnitPrice,
            totalAmount: item.ItemTotalAmount
        },
        expanded: true,
        children: item.PettyCashReportList ? transformToTreeNode(item.PettyCashReportList) : []
    }));
};