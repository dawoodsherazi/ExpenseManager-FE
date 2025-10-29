import { Component, ElementRef, signal, ViewChild, viewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api-service';
import { DialogModel } from '../dialog-model/dialog-model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-listing',
  imports: [ReactiveFormsModule,DialogModel,RouterModule],
  templateUrl: './book-listing.html',
  styleUrl: './book-listing.scss'
})
export class BookListing {

  books = signal<any[]>([]);
  showMenu = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  openMenuId = signal<number | null>(null);
  bookForm: FormGroup;
  bookIdToUpdate: number = 0;

@ViewChild('dialogRef') dialogRef! :DialogModel


  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: [''],
      userId: ['']
    });
  }

  ngOnInit() {

    this.getBook();

  }

  getBook() {
    this.apiService.getBooks().subscribe(data => {
      this.books.set(data);
      console.log(this.books);
    });


  }

  onClickMenu(id: number) {
    this.openMenuId.set(this.openMenuId() === id ? null : id);
  }

  createBook() {
    const newBook = {
      title: this.bookForm.value.title,
      userId: 2
    };
    this.apiService.createBook(newBook).subscribe(
      response => {
        console.log('Book created successfully', response);
        this.bookForm.reset();
        this.getBook();
      },
      error => {
        console.error('Error creating book', error);
      }
    );
  }

  updateBook(book: any) {

    this.isEditMode.set(true);
    this.bookForm.setValue({ title: book.title, userId: book.userId });
    const updatedData = { title: this.bookForm.value.title, userId: 2 };
    this.apiService.updateBook(this.bookIdToUpdate, updatedData).subscribe(
      response => {
        console.log('Book updated successfully', response);
        this.openMenuId.set(null);
        this.getBook();
        this.bookForm.reset();
        this.closeDialog();
        // Optionally, refresh the book list or update the local state
      }, error => {
        console.error('Error updating book', error);
      });
  }

  onRenameBook(book:any){
    this.isEditMode.set(true);
     this.bookForm.setValue({ title: book.title, userId: book.userId });
    const updatedData = { title: this.bookForm.value.title, userId: 2 };
      this.bookIdToUpdate = book?.id;
     this.openDialog();

  }

  deleteBook(id: number) {
    console.log('Delete book with id:', id);
    this.apiService.deleteBook(id).subscribe(response => {
      console.log('Book deleted successfully', response);
      this.openMenuId.set(null);
      this.getBook();
      // Optionally, refresh the book list or update the local state
    }, error => {
      console.error('Error deleting book', error);
    });
  }

  openDialog() {
      this.dialogRef.open();
  }

  closeDialog() {
      this.dialogRef.close();
  }

}
