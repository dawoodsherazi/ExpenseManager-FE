import { Component, ElementRef, EventEmitter, Output, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog-model',
  imports: [],
  templateUrl: './dialog-model.html',
  styleUrl: './dialog-model.scss'
})
export class DialogModel {

  isOpen = signal(false);
  @Output() dialogClosed = new EventEmitter<boolean>();

   @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  open() {
    this.isOpen.set(true);
    this.dialogRef.nativeElement.showModal();
  }

  close() {
    this.dialogClosed.emit(true);
    this.dialogRef.nativeElement.close();
    this.isOpen.set(false);
  }
}
