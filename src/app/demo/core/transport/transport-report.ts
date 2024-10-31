export interface TransportReport {
    Id: number;
    Route: string;
    Fuel: number;
    DriverBata: number;
    DriverMeals: number;
    HelperBata: number;
    HelperMeals: number;
    HighwayCharges: number;
    BusFairParking: number;
    OverallId: number;
    TransportStartDate: Date;
    TransportEndDate: Date;
    VehicleNo: string;
    TransportItem: string;
    TotalCount: number;
}
