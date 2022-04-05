import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  /*qType: any;
  questionForm: FormGroup;
  showMultipleOptions: boolean;
  questionOptions: any;
  optionForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.questionOptions = 1;

    this.questionForm = this.fb.group({
      question_text: ['', Validators.required],
      qType: ['', Validators.required],
      qOptions: this.fb.array([]),
    });
  }

  get formControls() {
    return this.questionForm.controls;
  }

  get qOptions(): FormArray {
    return this.questionForm.get('qOptions') as FormArray;
  }

  newOption(): FormGroup {
    this.optionForm = this.fb.group({
      optionLabel: ['', Validators.required],
      optionText: ['', Validators.required]
    });
    return this.optionForm;
  }

  addQuantity() {
    this.qOptions.push(this.newOption());
  }

  removeQuantity(i: number) {
    this.qOptions.removeAt(i);
  }

  submit() {
    console.log(this.questionForm.value);
  }

  questionTypeChanged($event) {
    console.log($event.target.value);
    if ($event.target.value === 'multiple') {
      this.showMultipleOptions = true;
    } else {
      this.showMultipleOptions = false;
    }
  }
*/
  qType: any;
  showMultipleOptions: boolean;
  questionForm: FormGroup;
  qOptionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      question_text: new FormControl('', [Validators.required]),
      qType: new FormControl('', [Validators.required]),
      qOptions: this.fb.array([])
    });
  }

  newOption(): FormGroup {
    return this.qOptionForm = this.fb.group({
      optionLabel: new FormControl(false, [Validators.required]),
      optionText: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  get qOptions() {
    return this.questionForm.controls['qOptions'] as FormArray;
  }

  addOption() {
    this.qOptions.push(this.newOption());
  }

  removeQuantity(i: number) {
    this.qOptions.removeAt(i);
  }

  submit() {
    console.log(this.questionForm.value);
  }

  questionTypeChanged($event) {
    console.log('hello question');
    console.log($event.target);
    console.log($event.target.value);
    if ($event.target.value === 'multiple') {
      this.showMultipleOptions = true;
      this.qOptions.clear();
      this.addOption();
    } else {
      this.showMultipleOptions = false;
    }

    if ($event.target.value === 'boolean') {
    }
  }
}
