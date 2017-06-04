import { Injectable } from '@angular/core';
import { ToasterService } from "angular2-toaster";

@Injectable()
export class ToasterServiceService {

  constructor(
    private toasterService: ToasterService 
  ) { }

  showToaster = (messageType, title, message) => {
    this.toasterService.clear();
    this.toasterService.pop(messageType, title, message);
  }
}
