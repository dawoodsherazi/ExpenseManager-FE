import { Component, EventEmitter, Output, signal, ViewChild } from '@angular/core';
import { ApiService } from '../services/api-service';
import { CommonModule } from '@angular/common';
import { TransactionForm } from '../transaction-form/transaction-form';
import { DialogModel } from '../dialog-model/dialog-model';
import { CategoryForm } from '../category-form/category-form';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule,TransactionForm,DialogModel,CategoryForm],
  templateUrl: './transaction-list.html',
  styleUrls: ['./transaction-list.scss']
})
export class TransactionList {
  transactions = signal<any[]>([]);
  selectedTransaction: any = null;
  selectedCategory: any = null;
  isDialogOpen = signal <boolean>(false);
  isCategoryFormOpen = signal <boolean>(false);

  bookId :number = 0;


  @Output() formData = new EventEmitter<any>();
  @ViewChild('dialogRef') dialogRef! :DialogModel
  constructor(private apiService: ApiService,private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params =>{
      this.bookId = Number(params.get('id'));
    })

    this.getTransactions();
    
}

getTransactions() {
  this.apiService.getTransactionByBookId(this.bookId).subscribe({
      next: (data:any) => {
        this.transactions.set(data);
      },
      error: err => {
        console.error('Failed to load transactions', err);
      }
    });

}

onEditTransaction(transaction:any) {
  this.selectedTransaction = transaction;
  this.openDialog();
  
}

onDeleteTransaction(id:number) {
  this.apiService.deleteTransaction(id).subscribe({
    next: () => {
      console.log("deleted");
      
      this.getTransactions();
    },
    error: err => {
      console.error('Failed to delete transaction', err);
    }
  });
}

openDialog(location ?:string) {
  if(location === 'category'){
    this.isDialogOpen.set(true);
    this.isCategoryFormOpen.set(true);
  }else{
    this.isDialogOpen.set(true);
    this.isCategoryFormOpen.set(false);
  }

  setTimeout(() => {
    this.dialogRef.open();
  }, 100);
}

closeDialog() {
  this.dialogRef.close();
  this.isDialogOpen.set(false);
  }

  isFormSubmitted() {
    this.closeDialog();
    this.getTransactions();
  }

  isCategoryFormSubmitted() {
    this.closeDialog();
    this.getTransactions();
  }

  dialogClosed() {
    this.isDialogOpen.set(false);
  }
}
