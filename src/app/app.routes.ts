import { Routes } from '@angular/router';
import { BookListing } from './book-listing/book-listing';
import { TransactionList } from './transaction-list/transaction-list';

export const routes: Routes = [

    {

         path : "",
         component: BookListing
    // loadComponent: () => import('./book-listing/book-listing.component').then(m => m.BookListingComponent)
    },
    {
        path:"transactions/:id",
        // loadComponent: () => import('./transaction-list/transaction-list.component').then(m => m.TransactionListComponent)
        component: TransactionList
    }
   
 
];
