import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, UploadService } from '@/_services';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-modal-upload-file',
  templateUrl: './modal-upload-file.component.html',
  styles: []
})
export class ModalUploadFileComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  file: any;

  @Input() title: string;
  @Input() type: string;
  @Input() action: string;
  @Input() id: string;
  @Output() emitData = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private _upload: UploadService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('name', this.file);
    this._upload.upload(formData, this.type, this.action, this.id)
      .pipe(first())
      .subscribe(
        (data: any) => {
          console.log(data);
          this.alertService.success(data.message, true);
          this.emitData.next(data);
          this.loading = false;
          this.activeModal.close();
        },
        (error: any) => {
          this.alertService.error(error.message);
          this.loading = false;
        });
  }
}
