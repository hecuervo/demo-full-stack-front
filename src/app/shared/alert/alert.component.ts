import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import swal from 'sweetalert';

import { AlertService } from '@/_services';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: []
})
export class AlertComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe((message: any) => {
      this.message = message;
      if (this.message) {
        swal(this.toTitleCase(this.message.type), this.message.text, this.message.type);
      }

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}
