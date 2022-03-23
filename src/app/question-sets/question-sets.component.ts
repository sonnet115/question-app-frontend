import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import {QsApiManagerService} from './qs-api-manager.service';

@Component({
  selector: 'app-question-sets',
  templateUrl: './question-sets.component.html',
  styleUrls: ['./question-sets.component.css']
})
export class QuestionSetsComponent implements OnInit {
  closeResult = '';
  questionSets: any;

  constructor(private modalService: NgbModal,
              private spinner: NgxSpinnerService,
              private apiService: QsApiManagerService) {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  ngOnInit(): void {
    this.getQuestionSet();
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


  saveQuestionSet(questionSetName: string) {
    this.spinner.show();
    const data = {
      'name': questionSetName
    };
    this.apiService.create(data).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
      },
      error => {
        this.spinner.hide();
      }
    );
  }
}
