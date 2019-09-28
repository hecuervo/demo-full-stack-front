import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements AfterViewInit {

  @Input() title: string;
  @Input() table: any;
  @Output() emitData = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngAfterViewInit() {
  }

}
