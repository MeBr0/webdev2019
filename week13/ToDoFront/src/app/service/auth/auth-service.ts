import { EventEmitter, Output, Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

}