import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListing } from './book-listing';

describe('BookListing', () => {
  let component: BookListing;
  let fixture: ComponentFixture<BookListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
