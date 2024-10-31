export interface TransportDetails{
    Id: number;
    VehicleNumber: string;
    TransportedItem: string;
    TripStartDate: Date;
    TripEndDate: Date;
    ReportCreatedDate: Date;
    TotalAmount: number;
    Route: string;
    TotalCount: number;
    
}

export interface TransportFullDetails{
    Id: number;
    VehicleNumber: string;
    TransportedItem: string;
    TripStartDate: Date;
    TripEndDate: Date;
    ReportCreatedDate: Date;
    TotalAmount: number;
    Route: string;
    FuelExpense: number;
    DriverPayment: number;
    DriverMealsExpense: number;
    HelperPayment: number;
    HelperMealsExpense: number;
    HighwayCharges: number;
    BusPairParking: number;

}

export const transportDetails: TransportDetails[] = [
    {
      Id: 1,
      VehicleNumber: "ABC1234",
      TransportedItem: "Electronics",
      TripStartDate: new Date("2024-08-10"),
      TripEndDate: new Date("2024-08-12"),
      ReportCreatedDate: new Date("2024-08-13"),
      TotalAmount: 1500.75,
      Route: "New York - Los Angeles",
      TotalCount: 200
    },
    {
      Id: 2,
      VehicleNumber: "DEF5678",
      TransportedItem: "Furniture",
      TripStartDate: new Date("2024-07-15"),
      TripEndDate: new Date("2024-07-18"),
      ReportCreatedDate: new Date("2024-07-19"),
      TotalAmount: 2450.50,
      Route: "Chicago - Miami",
      TotalCount: 120
    },
    {
      Id: 3,
      VehicleNumber: "GHI9012",
      TransportedItem: "Food Supplies",
      TripStartDate: new Date("2024-06-20"),
      TripEndDate: new Date("2024-06-22"),
      ReportCreatedDate: new Date("2024-06-23"),
      TotalAmount: 1800.00,
      Route: "Dallas - San Francisco",
      TotalCount: 300
    },
    {
      Id: 4,
      VehicleNumber: "JKL3456",
      TransportedItem: "Clothing",
      TripStartDate: new Date("2024-05-10"),
      TripEndDate: new Date("2024-05-12"),
      ReportCreatedDate: new Date("2024-05-13"),
      TotalAmount: 1300.25,
      Route: "Boston - Seattle",
      TotalCount: 400
    },
    {
      Id: 5,
      VehicleNumber: "MNO7890",
      TransportedItem: "Machinery",
      TripStartDate: new Date("2024-04-05"),
      TripEndDate: new Date("2024-04-07"),
      ReportCreatedDate: new Date("2024-04-08"),
      TotalAmount: 3100.85,
      Route: "Houston - Denver",
      TotalCount: 50
    }
  ];

  export const transportFullDetails: TransportFullDetails[] = [
    {
      Id: 1,
      VehicleNumber: "ABC1234",
      TransportedItem: "Electronics",
      TripStartDate: new Date("2024-08-10"),
      TripEndDate: new Date("2024-08-12"),
      ReportCreatedDate: new Date("2024-08-13"),
      TotalAmount: 1500.75,
      Route: "New York - Los Angeles",
      FuelExpense: 300.50,
      DriverPayment: 200.00,
      DriverMealsExpense: 50.00,
      HelperPayment: 100.00,
      HelperMealsExpense: 30.00,
      HighwayCharges: 70.00,
      BusPairParking: 40.00
    },
    {
      Id: 2,
      VehicleNumber: "DEF5678",
      TransportedItem: "Furniture",
      TripStartDate: new Date("2024-07-15"),
      TripEndDate: new Date("2024-07-18"),
      ReportCreatedDate: new Date("2024-07-19"),
      TotalAmount: 2450.50,
      Route: "Chicago - Miami",
      FuelExpense: 450.75,
      DriverPayment: 250.00,
      DriverMealsExpense: 60.00,
      HelperPayment: 150.00,
      HelperMealsExpense: 40.00,
      HighwayCharges: 85.00,
      BusPairParking: 55.00
    },
    {
      Id: 3,
      VehicleNumber: "GHI9012",
      TransportedItem: "Food Supplies",
      TripStartDate: new Date("2024-06-20"),
      TripEndDate: new Date("2024-06-22"),
      ReportCreatedDate: new Date("2024-06-23"),
      TotalAmount: 1800.00,
      Route: "Dallas - San Francisco",
      FuelExpense: 350.00,
      DriverPayment: 220.00,
      DriverMealsExpense: 55.00,
      HelperPayment: 120.00,
      HelperMealsExpense: 35.00,
      HighwayCharges: 65.00,
      BusPairParking: 45.00
    },
    {
      Id: 4,
      VehicleNumber: "JKL3456",
      TransportedItem: "Clothing",
      TripStartDate: new Date("2024-05-10"),
      TripEndDate: new Date("2024-05-12"),
      ReportCreatedDate: new Date("2024-05-13"),
      TotalAmount: 1300.25,
      Route: "Boston - Seattle",
      FuelExpense: 280.25,
      DriverPayment: 190.00,
      DriverMealsExpense: 48.00,
      HelperPayment: 110.00,
      HelperMealsExpense: 32.00,
      HighwayCharges: 60.00,
      BusPairParking: 35.00
    },
    {
      Id: 5,
      VehicleNumber: "MNO7890",
      TransportedItem: "Machinery",
      TripStartDate: new Date("2024-04-05"),
      TripEndDate: new Date("2024-04-07"),
      ReportCreatedDate: new Date("2024-04-08"),
      TotalAmount: 3100.85,
      Route: "Houston - Denver",
      FuelExpense: 500.00,
      DriverPayment: 300.00,
      DriverMealsExpense: 70.00,
      HelperPayment: 150.00,
      HelperMealsExpense: 45.00,
      HighwayCharges: 90.00,
      BusPairParking: 60.00
    }
  ];
  
  export const emptyTransportFullDetails: TransportFullDetails = {
    Id: 0,
    VehicleNumber: "",
    TransportedItem: "",
    TripStartDate: new Date(),
    TripEndDate: new Date(),
    ReportCreatedDate: new Date(),
    TotalAmount: 0,
    Route: "",
    FuelExpense: 0,
    DriverPayment: 0,
    DriverMealsExpense: 0,
    HelperPayment: 0,
    HelperMealsExpense: 0,
    HighwayCharges: 0,
    BusPairParking: 0
  };