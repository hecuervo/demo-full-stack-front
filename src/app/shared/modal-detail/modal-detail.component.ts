import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styles: []
})
export class ModalDetailComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  @Input() data: any;
  @Input() columns: any;

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.columns);
  }

}
