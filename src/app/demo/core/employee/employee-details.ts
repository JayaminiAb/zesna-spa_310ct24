import { Address } from "../address-details";
import { RoleDetails } from "../role-details";

export interface EmployeeDetails {
  Id: number;
  Fullname: string;
  Email: string;
  Phone: string;
  Salary: number;
  BasicSalary: number;
  SalaryTypeCode: string;
  OTRate: number;
  JoinDate: Date;
  Duty: string;
  Address: Address;
  Total: number;

}

export interface EmployeePaySheet {
  Id: number;
  EmployeeId: number;
  EmployeeDisplayId: string;
  EmployeeDuty: string;
  EmployeeName: string;
  EmployeeOTRate: number;
  EmployeeSalary: number;
  OnTime: Date; // Use string format for time representation in TypeScript
  OffTime: Date; // Use string format for time representation in TypeScript
  OtHours: number;
  OtPayment: number;
  PaymentDone: boolean;
  Mobile: string;
}



export interface EmployeeAttendance {
  EmpoyeeId: number;
  EmpoyeeFullName: string;
  EmpoyeePhone: string;
  AttendanceId: number;
  OnTime: Date;
  OffTime: Date;
  EmpoyeeDuty: string;
  AttendanceSattus: string;
  Comment: string;
  AddedDate: Date;
}
export interface PaymentObject {
  EmployeePaySheet: EmployeePaySheet;
  EstateId: number;
  SelectedDate: Date;
  AType: string;
}
export interface EventHoliday {
  Id: number;
  Name: string;
  HolidayDate: Date;
}
export interface EmployeeAdvancePayment {
  Id: number;
  Amount: number;
  PaymentDate: Date;
  Description: string;
}

export interface EmployeeSalarySheet {

  Id: number;
  EmployeeId: number;
  EmployeeName: string;
  EmployeeSlaryType: string;
  FirstHalfSalary: number;
  SecondHalfSalary: number;
  FirstHalfOT: number;
  SecondHalfOT: number;
  TotalMonthly: number;
  AdditionDaySalary: number;
  TotalAdvancePayment: number;
  BasicSalary: number;
  EPFAmount: number;
  EFPAmount: number;
  SalaryDetuction: number;
  NetSalary: number;
  IsFirstHalfPaid: boolean;
  IsSecondHalfPaid: boolean;
  FirstHalfAdvanceList: EmployeeAdvancePayment[];
  SecondHalfAdvanceList: EmployeeAdvancePayment[];
  EmployeeDetails: EmployeeDetails;
  EmployeeAttendance: EmployeeAttendance[];
}

export interface DisplayEmployeeSalarySheet {
  Name: string;
  SalaryFirstHalf: number;
  OTFirstHalf: number;
  SalarySecondHalf: number;
  OTSecondHalf: number;
  SalaryMonthlyTotal: number;
  AdditionalPayment: number;
  BasicSalary: number;
  EPF: number;
  ETF: number;
  NoPay: number;
  Advance: EmployeeAdvancePayment[];
  NetSalary: number;
  TotalAdvanceAmount: number;
  SalaryDeduction: number;
}

export const DEFAULT_PERM_EMP_PAY: EmployeeSalarySheet = {
  Id: 0,
  EmployeeId: 0,
  EmployeeName: 'Test name',
  EmployeeSlaryType: '',
  FirstHalfSalary: 0,
  SecondHalfSalary: 0,
  FirstHalfOT: 0,
  SecondHalfOT: 0,
  TotalMonthly: 0,
  AdditionDaySalary: 0,
  TotalAdvancePayment: 0,
  BasicSalary: 0,
  EPFAmount: 0,
  EFPAmount: 0,
  SalaryDetuction: 0,
  NetSalary: 0,
  IsFirstHalfPaid: false,
  IsSecondHalfPaid: false,
  FirstHalfAdvanceList: [],
  SecondHalfAdvanceList: [],
  EmployeeDetails: {
    Id: 0,
    Fullname: 'Test name',
    Email: "",
    Phone: "",
    BasicSalary: 0.0,
    Salary: 0.0,
    SalaryTypeCode: 'MONTHLY',
    OTRate: 0.0,
    JoinDate: new Date(),
    Duty: "",
    Address: {
      HouseNo: "",
      Street: "",
      City: "",
      PostalCode: ""
    },
    Total: 0
  },
  EmployeeAttendance: []
};

export const DEFAULT_TEMP_EMP: EmployeePaySheet = {
  Id: 0,
  EmployeeId: 0,
  EmployeeDisplayId: '',
  EmployeeDuty: '',
  EmployeeName: '',
  EmployeeOTRate: 0.0,
  EmployeeSalary: 0.0,
  OnTime: new Date(), // Default to the current date and time
  OffTime: new Date(), // Default to the current date and time
  OtHours: 0,
  OtPayment: 0.0,
  PaymentDone: false,
  Mobile: ''
};
export const attendanceStatuses = [
  { label: 'Select (S)', value: 'S' },
  { label: 'Present (P)', value: 'P' },
  { label: 'Absent (A)', value: 'A' },
  { label: 'Half Day (HD)', value: 'HD' },
  { label: 'Full Day Leave (L)', value: 'L' },
  { label: 'Sick Leave (SL)', value: 'SL' },
  { label: 'Casual Leave (CL)', value: 'CL' },
  { label: 'Earned Leave (EL)', value: 'EL' },
  { label: 'Work From Home (WFH)', value: 'WFH' },
  { label: 'Public Holiday (PH)', value: 'PH' },
  { label: 'On Duty (OD)', value: 'OD' },
  { label: 'Compensatory Off (CO)', value: 'CO' },
  { label: 'Training (T)', value: 'T' }
];

export const employeeAttendanceData: EmployeeAttendance[] = [
  // {
  //   Id: 1,
  //   Fullname: 'John Doe',
  //   Phone: '123-456-7890',
  //   OnTime: new Date('2024-10-21T09:00:00'),
  //   OffTime: new Date('2024-10-21T17:00:00'),
  //   EmployeeDuty: 'Developer',
  //   Attendance: 'P',
  //   Comment: 'Worked on project tasks'
  // },
  // {
  //   Id: 2,
  //   Fullname: 'Jane Smith',
  //   Phone: '234-567-8901',
  //   OnTime: new Date('2024-10-21T09:30:00'),
  //   OffTime: new Date('2024-10-21T13:00:00'),
  //   EmployeeDuty: 'Designer',
  //   Attendance: 'HD',
  //   Comment: 'Left due to a medical appointment'
  // },
  // {
  //   Id: 3,
  //   Fullname: 'Sam Wilson',
  //   Phone: '345-678-9012',
  //   OnTime: new Date('2024-10-21T09:30:00'),
  //   OffTime: new Date('2024-10-21T13:00:00'),
  //   EmployeeDuty: 'Marketing',
  //   Attendance: 'A',
  //   Comment: 'Notified absence due to family emergency'
  // },
  // {
  //   Id: 4,
  //   Fullname: 'Emily Johnson',
  //   Phone: '456-789-0123',
  //   OnTime: new Date('2024-10-21T09:00:00'),
  //   OffTime: new Date('2024-10-21T17:00:00'),
  //   EmployeeDuty: 'HR',
  //   Attendance: 'WFH',
  //   Comment: 'Working remotely due to transport issues'
  // },
  // {
  //   Id: 5,
  //   Fullname: 'Michael Brown',
  //   Phone: '567-890-1234',
  //   OnTime: new Date('2024-10-21T10:00:00'),
  //   OffTime: new Date('2024-10-21T16:00:00'),
  //   EmployeeDuty: 'Support',
  //   Attendance: 'P',
  //   Comment: 'Came in late due to traffic'
  // },
  // {
  //   Id: 6,
  //   Fullname: 'Laura White',
  //   Phone: '678-901-2345',
  //   OnTime: new Date('2024-10-21T09:30:00'),
  //   OffTime: new Date('2024-10-21T13:00:00'),
  //   EmployeeDuty: 'Admin',
  //   Attendance: 'L',
  //   Comment: 'Approved annual leave'
  // }
];

