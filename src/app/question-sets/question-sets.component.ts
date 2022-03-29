import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {QsApiManagerService} from './qs-api-manager.service';
import {number} from 'ngx-custom-validators/src/app/number/validator';
import {AlertService} from '../dashboards/_alert';

@Component({
  selector: 'app-question-sets',
  templateUrl: './question-sets.component.html',
  styleUrls: ['./question-sets.component.css']
})
export class QuestionSetsComponent implements OnInit {
  closeResult = '';
  questionSets: any;
  questionSetsById: any;
  showMsg = false;
  questionSetData: FormGroup;
  submitted = false;
  questionSetDataUpdate: FormGroup;

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private apiService: QsApiManagerService,
              private alertService: AlertService) {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  ngOnInit(): void {
    this.getQuestionSet();
    this.questionSetsById = null;

    this.questionSetData = this.formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.questionSetDataUpdate = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  get fields() {
    return this.questionSetData.controls;
  }

  getQuestionSet() {
    this.spinner.show();
    this.apiService.getQuestionSet().subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.questionSets = response;
      },
      error => {
        this.spinner.hide();
      }
    );
  }


  saveQuestionSet() {
    this.spinner.show();
    this.submitted = true;

    if (this.questionSetData.invalid) {
      this.spinner.hide();
      return;
    }

    this.apiService.create(this.questionSetData.value).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.alertService.success(response.message, {autoClose: true});
        this.questionSetData.reset({name: ''});
        this.submitted = false;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  editQuestionSet(questionSetId: number) {
    this.spinner.show();
    this.apiService.getQuSetById(questionSetId).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.questionSetsById = response;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  updateQuestionSet(quesId: string) {
    this.spinner.show();
    this.submitted = true;

    if (this.questionSetDataUpdate.invalid) {
      this.spinner.hide();
      return;
    }

    this.apiService.updateQuestionSet(this.questionSetDataUpdate.value, quesId).subscribe((response: any) => {
        this.spinner.hide();
        this.alertService.success(response.message, {autoClose: true});
        console.log(response);
        this.getQuestionSet();
        this.questionSetDataUpdate.reset({name: ''});
        this.submitted = false;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  deleteQuestionSet(quesId: string) {
    this.spinner.show();
    this.apiService.deleteQuestionSet(quesId).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
      },
      error => {
        this.spinner.hide();
      }
    );
  }
}
