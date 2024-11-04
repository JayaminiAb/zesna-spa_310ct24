export interface Filter {
    SearchQuery: string;
    RecordsPerPage: number;
    CurrentPage: number;
    SortCol: string;
    SortAsc: boolean;
}

export interface TransportFilter {
    EstateId: number;
    TransportedItem: string;
    VehicleNumber: string;
    StartDate: Date;
    EndDate: Date;
}