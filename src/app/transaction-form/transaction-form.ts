import { Component, EventEmitter, Input, Output, output, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule,FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.scss'
})
export class TransactionForm {

  transactionForm! : FormGroup
  categories = signal<any[]>([]);
  isEditMode = signal<boolean>(false);
  

  @Input() transactionData:any = null;
  @Output() formSubmitted = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.transactionForm = this.fb.group({
      title: [''],
      amount: [''],
      categoryId: [''],
      type: [''],
    });
  }

ngOnInit() {

  // get categories
  this.apiService.getCategories().subscribe({
    next: (data:any) => {
      this.categories.set(data);
    },
    error: (error:any) => {
      console.error('Error fetching categories', error);
    }
  });
}

ngOnChanges(changes: SimpleChanges) {
  console.log('changes:', changes);

  if (changes['transactionData'] && this.transactionData) {
    this.isEditMode.set(true);
    this.transactionForm.patchValue({
      title: this.transactionData.title,
      amount: this.transactionData.amount,
      categoryId: this.transactionData.categoryId,
      type: this.transactionData.type
    });
  }else{
    this.isEditMode.set(false);
  }
}

  onSubmitTransaction() {
    if (this.isEditMode()) {
      this.onEditTransaction();
    } else {
    this.apiService.createTransaction(this.transactionForm.value).subscribe({
      next: (response:any) => {
        console.log('Transaction created successfully', response);
        this.transactionForm.reset();
        this.formSubmitted.emit(true);
      },
      error: (error:any) => {
        console.error('Error creating transaction', error);
      }
    });
  }
  } 

  onEditTransaction() {
    if (this.transactionData) {
      this.apiService.updateTransaction(this.transactionData.id, this.transactionForm.value).subscribe({
        next: (response:any) => {
          console.log('Transaction updated successfully', response);
          this.transactionForm.reset();
          this.formSubmitted.emit(true);
        },
        error: (error:any) => {
          console.error('Error updating transaction', error);
        }
      });
    }
  }

  onAddCategory() {

  }

}
