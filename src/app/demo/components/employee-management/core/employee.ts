import { Time } from "@angular/common";

export interface Employee{
  Id: number;
  Name: string;
  CompanyId: number;
  Duty: string;
 
  Salary: number;
  ContactDetails: EmployeeContactDetails;
  JoinDate: Date;
  OTRate: number;
}

export interface EmployeeContactDetails{
  Address: Address;
  Email: string;
  ContactNumber: string;
}

export interface Address{
  No: string;
  Street: string;
  City: string;
  PostalCode: string;
}

export interface EmployeePayment{
  Id: number;
  FullName: string;
  Duty: string;
  OnTime: Date;
  OffTime: Date;
  OTHours: number;
  OTRate: number;
  OTPayment: number;
  DayPayment: number;
  TotalPayment: number;
}

export const employeePayments: EmployeePayment[] = [
  {
    Id: 1,
    FullName: "John Doe",
    Duty: "Software Engineer",
    OnTime: new Date(),  // Time type can be represented as { hours, minutes }
    OffTime: new Date(),
    OTHours: 2,
    OTRate: 25,
    OTPayment: 50,
    DayPayment: 200,
    TotalPayment: 250,
  },
  {
    Id: 2,
    FullName: "Jane Smith",
    Duty: "Project Manager",
    OnTime: new Date(),
    OffTime: new Date(),
    OTHours: 1.5,
    OTRate: 30,
    OTPayment: 45,
    DayPayment: 250,
    TotalPayment: 295,
  },
  {
    Id: 3,
    FullName: "Michael Brown",
    Duty: "Accountant",
    OnTime: new Date(),
    OffTime: new Date(),
    OTHours: 3,
    OTRate: 20,
    OTPayment: 60,
    DayPayment: 180,
    TotalPayment: 240,
  },
  {
    Id: 4,
    FullName: "Sara White",
    Duty: "HR Manager",
    OnTime: new Date(),
    OffTime: new Date(),
    OTHours: 0.5,
    OTRate: 35,
    OTPayment: 17.5,
    DayPayment: 230,
    TotalPayment: 247.5,
  },
  {
    Id: 5,
    FullName: "James Lee",
    Duty: "Sales Executive",
    OnTime: new Date(),
    OffTime: new Date(),
    OTHours: 2,
    OTRate: 22,
    OTPayment: 44,
    DayPayment: 220,
    TotalPayment: 264,
  }
];

export const newPayment: EmployeePayment = {
  Id: 0,
  FullName: "",
  Duty: "",
  OnTime: new Date(),  // Time type can be represented as { hours, minutes }
  OffTime: new Date(),
  OTHours: 0,
  OTRate: 0,
  OTPayment: 0,
  DayPayment: 0,
  TotalPayment: 0,
};

export const employees: Employee[] = [
  {
    Id: 1,
    Name: "Alice Johnson",
    CompanyId: 101,
    Duty: "Software Engineer",
    OTRate: 0,
    Salary: 85000,
    ContactDetails: {
      Address: {
        No: "12A",
        Street: "Elm Street",
        City: "Springfield",
        PostalCode: "12345"
      },
      Email: "alice.johnson@example.com",
      ContactNumber: "+1234567890"
    },
    JoinDate: new Date("2021-06-15"),
  },
  {
    Id: 2,
    Name: "Bob Smith",
    CompanyId: 102,
    Duty: "Project Manager",
    OTRate: 0,
    Salary: 95000,
    ContactDetails: {
      Address: {
        No: "34B",
        Street: "Oak Street",
        City: "Metropolis",
        PostalCode: "54321"
      },
      Email: "bob.smith@example.com",
      ContactNumber: "+0987654321"
    },
    JoinDate: new Date("2020-01-20"),
  },
  {
    Id: 3,
    Name: "Charlie Brown",
    CompanyId: 103,
    Duty: "Accountant",
    OTRate: 0,
    Salary: 70000,
    ContactDetails: {
      Address: {
        No: "56C",
        Street: "Pine Street",
        City: "Gotham",
        PostalCode: "67890"
      },
      Email: "charlie.brown@example.com",
      ContactNumber: "+1122334455"
    },
    JoinDate: new Date("2019-11-05"),
  },
  {
    Id: 4,
    Name: "Diana Prince",
    CompanyId: 101,
    Duty: "HR Manager",
    OTRate: 0,
    Salary: 80000,
    ContactDetails: {
      Address: {
        No: "78D",
        Street: "Maple Street",
        City: "Central City",
        PostalCode: "98765"
      },
      Email: "diana.prince@example.com",
      ContactNumber: "+1234987654"
    },
    JoinDate: new Date("2018-08-12"),
  },
  {
    Id: 5,
    Name: "Ethan Hunt",
    CompanyId: 104,
    Duty: "Sales Executive",
    OTRate: 0,
    Salary: 75000,
    ContactDetails: {
      Address: {
        No: "90E",
        Street: "Birch Street",
        City: "Star City",
        PostalCode: "13579"
      },
      Email: "ethan.hunt@example.com",
      ContactNumber: "+1098765432"
    },
    JoinDate: new Date("2022-03-25"),
  }
];

export const newEmployee: Employee = {
  Id: 0, // This can be auto-generated in your system
  Name: "",
  CompanyId: 0,
  Duty: "",
  OTRate: 0,
  Salary: 0,
  ContactDetails: {
    Address: {
      No: "",
      Street: "",
      City: "",
      PostalCode: ""
    },
    Email: "",
    ContactNumber: ""
  },
  JoinDate: new Date() // Default to current date, or set to `null` if required
};