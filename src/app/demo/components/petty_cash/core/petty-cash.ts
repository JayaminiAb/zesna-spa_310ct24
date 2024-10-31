import { TreeNode } from "primeng/api";

export interface PettyCashHistory {
    reimbursedUser: string;
    amount: number;
    date: Date;
  }
  
  export interface Company {
    label: string;
    value: any;
  }

  export interface CompanyDetails{
    Id: number;
    Name: string;
    RemainingPettyCashAmount: number;
  }

  export let EmptyMainExpense: TreeNode = {
    data: {
      description: "New",
      amount: "Amount",
      quantity: 1,
      unitPrice: 0,
      totalAmount: 0,
      action: ""
    },
    expanded: true, children: [],
  } 
  export let DATA13: TreeNode[] = [
    // {
    //   data: {
    //     description: "Applications",
    //     amount: "200mb",
    //     quantity: 1,
    //     unitPrice: 0,
    //     totalAmount: 0,
    //     action: "A"
    //   },
    //   expanded: true, children: [
    //     {
    //       data: {
    //         description: "Angular",
    //         amount: "25mb",
    //         quantity: 1,
    //         unitPrice: 0,
    //         totalAmount: 0,
    //         action: "A"
            
    //       },
    //       expanded: true, children: [
    //         {
    //           data: {
    //             description: "angular.app",
    //             amount: "10mb",
    //             quantity: 1,
    //             unitPrice: 0,
    //             totalAmount: 0,
    //             action: "A"
    //           },
    //         },
    //         {
    //           data: {
    //             description: "cli.app",
    //             amount: "10mb",
    //             quantity: 1,
    //             unitPrice: 0,
    //             totalAmount: 0,
    //             action: "A"
    //           },
    //         },
    //         {
    //           data: {
    //             description: "mobile.app",
    //             amount: "5mb",
    //             quantity: 1,
    //             unitPrice: 0,
    //             totalAmount: 0,
    //             action: "A"
    //           },
    //         },
    //       ],
    //     },
        // {
        //   data: {
        //     description: "editor.app",
        //     amount: "25mb",
        //     quantity: "Application",
        //   },
        // },
        // {
        //   data: {
        //     description: "settings.app",
        //     amount: "50mb",
        //     quantity: "Application",
        //   },
        // },
    //   ],
    // },
    // {
    //   data: {
    //     description: "Cloud",
    //     amount: "20mb",
    //     quantity: "Folder",
    //   },
    //   expanded: true, children: [
    //     {
    //       data: {
    //         description: "backup-1.zip",
    //         amount: "10mb",
    //         quantity: "Zip",
    //       },
    //     },
    //     {
    //       data: {
    //         description: "backup-2.zip",
    //         amount: "10mb",
    //         quantity: "Zip",
    //       },
    //     },
    //   ],
    // },
    // {
    //   data: {
    //     description: "Desktop",
    //     amount: "150kb",
    //     quantity: "Folder",
    //   },
    //   expanded: true, children: [
    //     {
    //       data: {
    //         description: "note-meeting.txt",
    //         amount: "50kb",
    //         quantity: "Text",
    //       },
    //     },
    //     {
    //       data: {
    //         description: "note-todo.txt",
    //         amount: "100kb",
    //         quantity: "Text",
    //       },
    //     },
    //   ],
    // },
    // {
    //   data: {
    //     description: "Documents",
    //     amount: "75kb",
    //     quantity: "Folder",
    //   },
    //   expanded: true, children: [
    //     {
    //       data: {
    //         description: "Work",
    //         amount: "55kb",
    //         quantity: "Folder",
    //       },
    //       expanded: true, children: [
    //         {
    //           data: {
    //             description: "Expenses.doc",
    //             amount: "30kb",
    //             quantity: "Document",
    //           },
    //         },
    //         {
    //           data: {
    //             description: "Resume.doc",
    //             amount: "25kb",
    //             quantity: "Resume",
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       data: {
    //         description: "Home",
    //         amount: "20kb",
    //         quantity: "Folder",
    //       },
    //       expanded: true, children: [
    //         {
    //           data: {
    //             description: "Invoices",
    //             amount: "20kb",
    //             quantity: "Text",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   data: {
    //     description: "Downloads",
    //     amount: "25mb",
    //     quantity: "Folder",
    //   },
    //   expanded: true, children: [
    //     {
    //       data: {
    //         description: "Spanish",
    //         amount: "10mb",
    //         quantity: "Folder",
    //       },
    //       expanded: true, children: [
    //         {
    //           data: {
    //             description: "tutorial-a1.txt",
    //             amount: "5mb",
    //             quantity: "Text",
    //           },
    //         },
    //         {
    //           data: {
    //             description: "tutorial-a2.txt",
    //             amount: "5mb",
    //             quantity: "Text",
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       data: {
    //         description: "Travel",
    //         amount: "15mb",
    //         quantity: "Text",
    //       },
    //       expanded: true, children: [
    //         {
    //           data: {
    //             description: "Hotel.pdf",
    //             amount: "10mb",
    //             quantity: "PDF",
    //           },
    //         },
    //         {
    //           data: {
    //             description: "Flight.pdf",
    //             amount: "5mb",
    //             quantity: "PDF",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   data: {
    //     description: "Main",
    //     amount: "50mb",
    //     quantity: "Folder",
    //   },
    //   expanded: true, children: [
    //     {
    //       data: {
    //         description: "bin",
    //         amount: "50kb",
    //         quantity: "Link",
    //       },
    //     },
    //     {
    //       data: {
    //         description: "etc",
    //         amount: "100kb",
    //         quantity: "Link",
    //       },
    //     },
    //     {
    //       data: {
    //         description: "var",
    //         amount: "100kb",
    //         quantity: "Link",
    //       },
    //     },
    //   ],
    // },
    // {
    //   data: {
    //     description: "Other",
    //     amount: "5mb",
    //     quantity: "Folder",
    //   },
    //   expanded: true, children: [
    //     {
    //       data: {
    //         description: "todo.txt",
    //         amount: "3mb",
    //         quantity: "Text",
    //       },
    //     },
    //     {
    //       data: {
    //         description: "logo.png",
    //         amount: "2mb",
    //         quantity: "Picture",
    //       },
    //     },
    //   ],
    // },
    // {
    //   data: {
    //     description: "Pictures",
    //     amount: "150kb",
    //     quantity: "Folder",
    //   },
    //   expanded: true, children: [
    //     {
    //       data: {
    //         description: "barcelona.jpg",
    //         amount: "90kb",
    //         quantity: "Picture",
    //       },
    //     },
    //     {
    //       data: {
    //         description: "primeng.png",
    //         amount: "30kb",
    //         quantity: "Picture",
    //       },
    //     },
    //     {
    //       data: {
    //         description: "prime.jpg",
    //         amount: "30kb",
    //         quantity: "Picture",
    //       },
    //     },
    //   ],
    // },
    // {
    //   data: {
    //     description: "Videos",
    //     amount: "1500mb",
    //     quantity: "Folder",
    //   },
    //   expanded: true, children: [
    //     {
    //       data: {
    //         description: "primefaces.mkv",
    //         amount: "1000mb",
    //         quantity: "Video",
    //       },
    //     },
    //     {
    //       data: {
    //         description: "intro.avi",
    //         amount: "500mb",
    //         quantity: "Video",
    //       },
    //     },
    //   ],
    // },
  ];
  

