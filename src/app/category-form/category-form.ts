import { Component, EventEmitter, Input, OnInit, Output, output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm implements OnInit {

  categoryForm!: FormGroup
  bookId: number = 0;
  categoryId: number = 0;
  @Input() categoryData: any ;
  @Output() formSubmitted = new EventEmitter<boolean>();
  isEditMode = signal<boolean>(false);

  categories = signal<any[]>([]);

  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute) {
    this.categoryForm = this.fb.group({
      name: ['']
    });
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // this.transactionId = +id;
        // this.isEditMode.set(true);
        this.bookId = +id;
        console.log('Updated ID:', id);
      }
    });

    // get categories
    this.getCategories();

  }

  ngOnChanges(changes: SimpleChanges) {
    if ( this.categoryData && changes['categoryData']) {
      this.categoryForm.patchValue({
        name: changes['categoryData']?.currentValue?.name
      });
    }
  }


  getCategories() {
        this.apiService.getCategories().subscribe({
      next: (data: any) => {
        this.categories.set(data);
      },
      error: (error: any) => {
        console.error('Error fetching categories', error);
      }
    });

  }

  onSubmitCategory() {
    if (this.isEditMode()) {
      // Update existing category logic here

      this.apiService.editCategory(this.categoryId, this.categoryForm.value).subscribe({
      next: (response) => {
        console.log('Category updated successfully', response);
        this.categoryForm.reset();
        this.getCategories();
      },
      error: (error) => {
        console.error('Error updating category', error);
      }
    });
    // this.formSubmitted.emit(true);
    

    } else {
      // Create new category logic here 
      let data = {
        name: this.categoryForm.value.name,
        bookId: this.bookId
      }
      this.apiService.addCategory(data).subscribe({
        next: (response) => {
          console.log('Category added successfully', response);
          this.getCategories();
        },
        error: (error) => {
          console.error('Error adding category', error);
        }
      });

      // this.formSubmitted.emit(true);
      this.getCategories();
    }

  }

  onEditCategory(category: any) {
    debugger;
    this.categoryForm.patchValue({
      name: category.name
    });
    this.categoryId = category.id;
    this.isEditMode.set(true);

    
  }

  onDeleteCategory(categoryId: number) {
    this.apiService.deleteCategory(categoryId).subscribe({
      next: (response) => {
        console.log('Category deleted successfully', response);
        this.getCategories();
      },
      error: (error) => {
        console.error('Error deleting category', error);
      }
    });
  }

}
