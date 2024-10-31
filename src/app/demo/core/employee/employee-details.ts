import { Address } from "../address-details";
import { RoleDetails } from "../role-details";

export interface EmployeeDetails {
    Id: number;
    Fullname: string;
    Email: string;
    Phone: string;
    Salary: number;
    OTRate: number;
    JoinDate: Date;
    EmployeeRoleDetails: RoleDetails;
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
  }

  export interface EmployeeAttendance{
    Id: number;
    Fullname: string;
    Phone: string;
    OnTime: Date;
    OffTime: Date;
    EmployeeDuty: string;
    Attendance: string;
    Comment: string;
  }

  export const  attendanceStatuses = [
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
    {
      Id: 1,
      Fullname: 'John Doe',
      Phone: '123-456-7890',
      OnTime: new Date('2024-10-21T09:00:00'),
      OffTime: new Date('2024-10-21T17:00:00'),
      EmployeeDuty: 'Developer',
      Attendance: 'P',
      Comment: 'Worked on project tasks'
    },
    {
      Id: 2,
      Fullname: 'Jane Smith',
      Phone: '234-567-8901',
      OnTime: new Date('2024-10-21T09:30:00'),
      OffTime: new Date('2024-10-21T13:00:00'),
      EmployeeDuty: 'Designer',
      Attendance: 'HD',
      Comment: 'Left due to a medical appointment'
    },
    {
      Id: 3,
      Fullname: 'Sam Wilson',
      Phone: '345-678-9012',
      OnTime: new Date('2024-10-21T09:30:00'),
      OffTime: new Date('2024-10-21T13:00:00'),
      EmployeeDuty: 'Marketing',
      Attendance: 'A',
      Comment: 'Notified absence due to family emergency'
    },
    {
      Id: 4,
      Fullname: 'Emily Johnson',
      Phone: '456-789-0123',
      OnTime: new Date('2024-10-21T09:00:00'),
      OffTime: new Date('2024-10-21T17:00:00'),
      EmployeeDuty: 'HR',
      Attendance: 'WFH',
      Comment: 'Working remotely due to transport issues'
    },
    {
      Id: 5,
      Fullname: 'Michael Brown',
      Phone: '567-890-1234',
      OnTime: new Date('2024-10-21T10:00:00'),
      OffTime: new Date('2024-10-21T16:00:00'),
      EmployeeDuty: 'Support',
      Attendance: 'P',
      Comment: 'Came in late due to traffic'
    },
    {
      Id: 6,
      Fullname: 'Laura White',
      Phone: '678-901-2345',
      OnTime: new Date('2024-10-21T09:30:00'),
      OffTime: new Date('2024-10-21T13:00:00'),
      EmployeeDuty: 'Admin',
      Attendance: 'L',
      Comment: 'Approved annual leave'
    }
  ];
  
