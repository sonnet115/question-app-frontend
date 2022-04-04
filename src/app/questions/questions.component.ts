import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import {QsApiManagerService} from '../question-sets/qs-api-manager.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../dashboards/_alert';
import {QApiManagerService} from './q-api-manager.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  qType: any;
  showMultipleOptions: boolean;
  questionForm: FormGroup;
  qOptionForm: FormGroup;
  optionLabelArray: Array<any>;
  questionSets: any;
  optionsArray: Array<any>;
  ansArray: Array<any>;

  constructor(private fb: FormBuilder,
              private qSApiManager: QsApiManagerService,
              private spinner: NgxSpinnerService,
              private alertService: AlertService,
              private apiService: QApiManagerService) {

    this.questionForm = this.fb.group({
      question_text: new FormControl('', [Validators.required]),
      qType: new FormControl('', [Validators.required]),
      booleanAns: '',
      qOptions: this.fb.array([]),
      queSetID: new FormControl('', [Validators.required])
    });
    this.optionLabelArray = ['A', 'B', 'C', 'D', 'E'];
    this.optionsArray = [];
    this.ansArray = [];
  }


  getQuestionSet() {
    this.spinner.show();
    this.qSApiManager.getQuestionSet().subscribe((response: any) => {
        this.spinner.hide();
        this.questionSets = response;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  newOption(): FormGroup {
    return this.qOptionForm = this.fb.group({
      optionLabel: new FormControl(false, [Validators.required]),
      optionText: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.showMultipleOptions = true;
    this.getQuestionSet();
  }

  get qOptions() {
    return this.questionForm.controls['qOptions'] as FormArray;
  }

  addOption() {
    if (this.qOptions.length < 5) {
      this.qOptions.push(this.newOption());
    }
  }

  removeQuantity(i: number) {
    this.qOptions.removeAt(i);
  }

  submit() {
    const options = this.questionForm.controls['qOptions'].value;
    for (let i = 0; i < options.length; i++) {
      console.log(options[i].optionLabel);
      const op = {
        'optionName': options[i].optionText,
        'optionValue': this.optionLabelArray[i],
      };
      this.optionsArray.push(op);

      if (options[i].optionLabel) {
        this.ansArray.push(this.optionLabelArray[i]);
      }
    }

    console.log(this.questionForm.value);
    const data = {
      'questionText': this.questionForm.controls['question_text'].value,
      'type': this.questionForm.controls['qType'].value,
      'queSetID': this.questionForm.controls['queSetID'].value,
      'questionOptions': this.optionsArray,
      'answers': this.ansArray,
    };
    console.log(this.questionForm.value);
    console.log(data);

    this.apiService.create(data).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  questionTypeChanged($event) {
    if ($event.target.value === 'multiple') {
      this.showMultipleOptions = true;
      this.qOptions.clear();
      this.addOption();
    } else {
      console.log($event.target.value);
      this.showMultipleOptions = false;
      this.qOptions.clear();
    }
  }
}
