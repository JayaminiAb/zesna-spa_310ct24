import { Component } from '@angular/core';
import { Company, CompanyDetails, DATA13, EmptyMainExpense } from '../../core/petty-cash';
import { TreeNode } from 'primeng/api';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { ZesnaEmployeeService } from 'src/app/demo/service/zesna-services/zesna-employee.service';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { ZesnaPettyCashModel } from 'src/app/demo/model/zesna-petty-cash-model';
import { ZesnaPettyCashService } from 'src/app/demo/service/zesna-services/zesna-petty-cash.service';
import { PettyCashReport, transformToTreeNode } from 'src/app/demo/core/petty-cash/petty-cash';
interface Column {
  field: string;
  header: string;
}
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  cols!: Column[];
  files: TreeNode[] = [];
  pettyCashReportDetails: PettyCashReport[] = [];
  emptyMainExpense: TreeNode = EmptyMainExpense;
  estateList: EstateDetails[] = [];
  selectedEstate: EstateDetails = {
    Id: 0,
    Name: '',
    AddressDetails: '',
    ContactNumber: '',
    OtherDetails: '',
    Balance: 0,
    Total: 0
  };
  selectedDate: Date = new Date();
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  zesnaEmployeeModel: ZesnaEmployeeModel;
  //Store estate model
  zesnaPettyCashModel: ZesnaPettyCashModel;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  ngOnInit() {

    this.cols = [
      { field: 'description', header: 'Description' },
      { field: 'amount', header: 'Amount' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'unitPrice', header: 'Unit Price' },
      { field: 'totalAmount', header: 'Item Total' },
      { field: 'action', header: 'Action' },


    ];
    this.generatePettyCashTreeNode();
  }

  constructor(
    private _zesnaCommonService: ZesnaCommonService,
    private _zesnaEmployeeService: ZesnaEmployeeService,
    private _zesnaPettyCashService: ZesnaPettyCashService
  ) {
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
    this.zesnaPettyCashModel = new ZesnaPettyCashModel(this._zesnaPettyCashService);
  }

  onEstateChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    this.selectedEstate = event;
    //Get pettycash report
    this.getPettyCashReport();
  }

  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstateDetails(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.getPettyCashReport();
        }
      }
    );
  }

  getPettyCashReport() {
    this.zesnaPettyCashModel.GetPettyCashReport(this.selectedDate, this.selectedEstate.Id).then(
      (data) => {
        if (data) {
          this.pettyCashReportDetails = <PettyCashReport[]>data;
          this.generatePettyCashTreeNode();
        }
      }
    );
  }

  generatePettyCashTreeNode() {
    this.pettyCashReportDetails = [
      {
        id: 1,
        description: "Main Report 1",
        weight: "50kg",
        quantity: 10,
        unitPrice: 100,
        pettyCashReportList: [
          {
            id: 2,
            description: "Sub Report 1-1",
            weight: "20kg",
            quantity: 5,
            unitPrice: 50,
            pettyCashReportList: [
              {
                id: 3,
                description: "Sub-Sub Report 1-1-1",
                weight: "5kg",
                quantity: 2,
                unitPrice: 25,
                pettyCashReportList: []
              },
              {
                id: 4,
                description: "Sub-Sub Report 1-1-2",
                weight: "10kg",
                quantity: 1,
                unitPrice: 10,
                pettyCashReportList: []
              }
            ]
          },
          {
            id: 5,
            description: "Sub Report 1-2",
            weight: "15kg",
            quantity: 3,
            unitPrice: 75,
            pettyCashReportList: []
          }
        ]
      },
      {
        id: 6,
        description: "Main Report 2",
        weight: "30kg",
        quantity: 6,
        unitPrice: 120,
        pettyCashReportList: [
          {
            id: 7,
            description: "Sub Report 2-1",
            weight: "10kg",
            quantity: 2,
            unitPrice: 60,
            pettyCashReportList: [
              {
                id: 8,
                description: "Sub-Sub Report 2-1-1",
                weight: "3kg",
                quantity: 1,
                unitPrice: 30,
                pettyCashReportList: []
              }
            ]
          },
          {
            id: 9,
            description: "Sub Report 2-2",
            weight: "12kg",
            quantity: 4,
            unitPrice: 48,
            pettyCashReportList: []
          }
        ]
      }
    ];
    this.files = transformToTreeNode(this.pettyCashReportDetails);
    this.generateRowNumbers(this.files);
  }









  // Method to generate hierarchical numbering for rows
  generateRowNumbers(nodes: TreeNode[], parentNumber: string = ''): void {
    nodes.forEach((node, index) => {
      // Generate the current node's number by combining the parent's number and the node's position
      const currentNumber = parentNumber ? `${parentNumber}.${index + 1}` : `${index + 1}`;

      // Store the number in a custom property (you can choose the property name)
      node.data['rowNumber'] = currentNumber;

      // If the node has children, recursively assign numbers to them
      if (node.children && node.children.length > 0) {
        this.generateRowNumbers(node.children, currentNumber);
      }
    });
  }



  addNewExpense() {
    this.files = [...this.files, this.deep(this.emptyMainExpense)];
    this.generateRowNumbers(this.files);
    console.log(this.files)
  }
  //Add expense to top
  addExpenseTop(indexStr: string) {
    debugger
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0] - 1;
    this.files.splice(insertIndex, 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    this.generateRowNumbers(this.files);
  }
  //Add expense to bottom
  addExpenseBottom(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files.splice(insertIndex, 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    this.generateRowNumbers(this.files);
  }

  addSubExpenseTop(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children.splice(+indexList[1] - 1, 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    this.generateRowNumbers(this.files);
  }

  addSubExpenseBottom(indexStr: string) {

    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children.splice(+indexList[1], 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    this.generateRowNumbers(this.files);
  }

  //Add sub expense
  addSubExpenseFromMain(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children.push(this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    this.generateRowNumbers(this.files);
  }

  addThirdLevelExpenseBottom(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children[+indexList[1] - 1].children.splice(+indexList[2], 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    this.generateRowNumbers(this.files);
  }

  addThirdLevelExpenseTop(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children[+indexList[1] - 1].children.splice(+indexList[2] - 1, 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    this.generateRowNumbers(this.files);
  }

  addThirdLevelExpenseFromSub(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children[+indexList[1] - 1].children.push(this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    this.generateRowNumbers(this.files);
  }


  onDateRangeChange(event: any) {
    // Filter petty cash history based on selected date range
    console.log(event)
  }

  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }

}
