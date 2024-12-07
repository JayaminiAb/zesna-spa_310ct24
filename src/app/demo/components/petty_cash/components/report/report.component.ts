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
import { PettyCashReport, PettyCashRequestBody, transformToTreeNode } from 'src/app/demo/core/petty-cash/petty-cash';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';
import { TransportFilter } from 'src/app/demo/core/filter';
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
  emptyPettyCashItem: PettyCashReport = {
    Id: 0,
    Description: '',
    Weight: '',
    Quantity: 0,
    UnitPrice: 0,
    PettyCashReportList: []// Recursive list of PettyCashReport items
  };
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
  updatedDate: Date = new Date();
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  zesnaEmployeeModel: ZesnaEmployeeModel;
  //Store estate model
  zesnaPettyCashModel: ZesnaPettyCashModel;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  // Store the cookie interface
  overallCookieInterface: OverallCookies;

  ngOnInit() {

    this.cols = [
      { field: 'description', header: 'Description' },
      { field: 'weight', header: 'Amount' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'unitPrice', header: 'Unit Price' },
      { field: 'totalAmount', header: 'Item Total' },
      { field: 'action', header: 'Action' },


    ];

    // Initially filter by the last month
    this.getEstateListByUserId();
  }

  constructor(
    private _zesnaCommonService: ZesnaCommonService,
    private _zesnaEmployeeService: ZesnaEmployeeService,
    private _zesnaPettyCashService: ZesnaPettyCashService
  ) {
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
    this.zesnaPettyCashModel = new ZesnaPettyCashModel(this._zesnaPettyCashService);
    this.overallCookieInterface = new OverallCookieModel();
    this.loggedUserId = +this.overallCookieInterface.GetUserId();
    this.loggedUserRole = this.overallCookieInterface.GetUserRole();
  }

  
  onEstateChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    this.selectedEstate = event;
    //Get pettycash report
    this.getPettyCashReport(this.updatedDate);
  }

  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstatesByUserId(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.getPettyCashReport(this.updatedDate);
        }
      }
    );
  }

  getPettyCashReport(selectedDate: Date) {
    
    let obj: TransportFilter = { EndDate: new Date(), StartDate: selectedDate, EstateId: this.selectedEstate.Id, TransportedItem: '', VehicleNumber: '' }
    this.zesnaPettyCashModel.GetPettyCashReport(obj).then(
      (data) => {
        if (data) {
          this.pettyCashReportDetails = <PettyCashReport[]>data;
          // Calculate total for each item in the list
          this.pettyCashReportDetails.forEach(report => this.calculateTotalForItem(report));
          this.generatePettyCashTreeNode();
        }
      }
    );
  }
  calculateTotalForItem(item: PettyCashReport): number {
    // If the item has nested items, calculate total as the sum of all nested items
    if (item.PettyCashReportList && item.PettyCashReportList.length > 0) {
        item.ItemTotalAmount = item.PettyCashReportList.reduce((sum, childItem) => {
            return sum + this.calculateTotalForItem(childItem); // Recursive call for nested items
        }, 0);
    } else {
        // Calculate total for item without nested items
        item.ItemTotalAmount = item.Quantity * item.UnitPrice;
    }

    return item.ItemTotalAmount;
}
  generatePettyCashTreeNode() {
    this.files = transformToTreeNode(this.pettyCashReportDetails);
    this.generateRowNumbers(this.files);
  }

  setPettyCashReportItem(pettyCashReport: PettyCashReport, selectedDate: Date, estateId: number, parentId: number, currentId: number, addDirection: string, actionType: string, userID: number) {
    let Obj: PettyCashRequestBody = {
      PettyCashReport: pettyCashReport,
      SelectedDate: selectedDate,
      EstateId: estateId,
      ParentId: parentId,
      CurrentId: currentId,
      AddDirection: addDirection,
      ActionType: actionType,
      UserID: userID
    };
    this.zesnaPettyCashModel.SetPettyCashReport(Obj).then(
      (data) => {
        if (data) {

          this.getPettyCashReport(this.updatedDate);
        }
      }
    );
  }


  updatePettyCashItem(item: any) {
    
    
    this.setPettyCashReportItem(
      { Id: item.id, Description: item.description, Weight: item.weight, Quantity: item.quantity, UnitPrice: item.unitPrice, PettyCashReportList: [] },
      this.selectedDate, this.selectedEstate.Id, 0, 0, '', 'UPDATE', this.loggedUserId
    );
  }

  deleteItem(item: any){
    
    this.setPettyCashReportItem(
      { Id: item.node.data.id, Description: "", Weight: "", Quantity: 0, UnitPrice: 0, PettyCashReportList: [] },
      this.selectedDate, this.selectedEstate.Id, 0, 0, '', 'REMOVE', this.loggedUserId
    );
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
    this.setPettyCashReportItem(this.deep(this.emptyPettyCashItem), this.updatedDate, this.selectedEstate.Id, 0, 0, 'BOTTOM', 'INSERT', this.loggedUserId);
    //this.generateRowNumbers(this.files);
    // console.log(this.files)
  }
  //Add expense to top
  addExpenseTop(indexStr: string) {

    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0] - 1;
    this.files.splice(insertIndex, 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files];
    this.setPettyCashReportItem(this.deep(this.emptyPettyCashItem), this.updatedDate, this.selectedEstate.Id, 0, this.files[+indexList[0] - 1].data.id, 'TOP', 'INSERT', this.loggedUserId);
    //this.generateRowNumbers(this.files);
  }
  //Add expense to bottom
  addExpenseBottom(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files.splice(insertIndex, 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    //this.generateRowNumbers(this.files);
    this.setPettyCashReportItem(this.deep(this.emptyPettyCashItem), this.updatedDate, this.selectedEstate.Id, 0, this.files[+indexList[0] - 1].data.id, 'BOTTOM', 'INSERT', this.loggedUserId);
  }

  addSubExpenseTop(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children.splice(+indexList[1] - 1, 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    //this.generateRowNumbers(this.files);
    this.setPettyCashReportItem(this.deep(this.emptyPettyCashItem), this.updatedDate, this.selectedEstate.Id, this.files[+indexList[0] - 1].data.id, this.files[+indexList[0] - 1].children[+indexList[1] - 1].data.id, 'TOP', 'INSERT', this.loggedUserId);
  }

  addSubExpenseBottom(indexStr: string) {

    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children.splice(+indexList[1], 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    //this.generateRowNumbers(this.files);
    this.setPettyCashReportItem(this.deep(this.emptyPettyCashItem), this.updatedDate, this.selectedEstate.Id, this.files[+indexList[0] - 1].data.id, this.files[+indexList[0] - 1].children[+indexList[1] - 1].data.id, 'BOTTOM', 'INSERT', this.loggedUserId);
  }

  //Add sub expense
  addSubExpenseFromMain(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children.push(this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    //this.generateRowNumbers(this.files);
    this.setPettyCashReportItem(this.deep(this.emptyPettyCashItem), this.updatedDate, this.selectedEstate.Id, this.files[+indexList[0] - 1].data.id, 0, 'BOTTOM', 'INSERT', this.loggedUserId);
  }

  addThirdLevelExpenseBottom(indexStr: string) {
    
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children[+indexList[1] - 1].children.splice(+indexList[2], 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    //this.generateRowNumbers(this.files);
    this.setPettyCashReportItem(this.deep(this.emptyPettyCashItem), this.updatedDate, this.selectedEstate.Id, this.files[+indexList[0] - 1].children[+indexList[1] - 1].data.id, this.files[+indexList[0] - 1].children[+indexList[1] - 1].children[+indexList[2] - 1].data.id, 'BOTTOM', 'INSERT', this.loggedUserId);
  }

  addThirdLevelExpenseTop(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children[+indexList[1] - 1].children.splice(+indexList[2] - 1, 0, this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    //this.generateRowNumbers(this.files);
    this.setPettyCashReportItem(this.deep(this.emptyPettyCashItem), this.updatedDate, this.selectedEstate.Id, this.files[+indexList[0] - 1].children[+indexList[1] - 1].data.id, this.files[+indexList[0] - 1].children[+indexList[1] - 1].children[+indexList[2] - 1].data.id, 'TOP', 'INSERT', this.loggedUserId);
  }

  addThirdLevelExpenseFromSub(indexStr: string) {
    let indexList: string[] = indexStr.split('.');
    let insertIndex = +indexList[0];
    this.files[insertIndex - 1].children[+indexList[1] - 1].children.push(this.deep(this.emptyMainExpense));
    this.files = [...this.files]
    //this.generateRowNumbers(this.files);
    this.setPettyCashReportItem(this.deep(this.emptyPettyCashItem), this.updatedDate, this.selectedEstate.Id, this.files[+indexList[0] - 1].children[+indexList[1] - 1].data.id, 0, 'BOTTOM', 'INSERT', this.loggedUserId);
  }


  onDateRangeChange(event: any) {
    
    // Filter petty cash history based on selected date range
    
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    this.updatedDate = newDate;
    this.getPettyCashReport(newDate);
  }

  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }

  getTotalExpenses(){
    
    let totalAmount = 0;
    this.files.forEach(element => {
      totalAmount = totalAmount + (+element.data.totalAmount);
    });
    return totalAmount;
  }

}
