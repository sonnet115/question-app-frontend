import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../dashboards/_alert';
import {QApiManagerService} from '../questions/q-api-manager.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: any;
  totalPage: any;
  totalRecords: any;
  limit: any;
  offset: any;
  currentPage: any;


  constructor(private spinner: NgxSpinnerService,
              private alertService: AlertService,
              private apiService: QApiManagerService) {
  }

  ngOnInit(): void {
    this.getQuestionSet(2, 0);
    this.currentPage = 0;
  }

  getQuestionSet(limit, offset) {
    this.offset = 0;
    const pagination = {
      'limit': limit,
      'offset': offset
    };
    this.spinner.show();
    this.apiService.getQuestionByQS(localStorage.getItem('qs_id'), pagination).subscribe((response: any) => {
        this.spinner.hide();
        this.questions = response.questions;
        this.totalPage = response.totalPages;
        this.totalRecords = response.totalRecords;
        this.limit = response.limit;
        this.offset = response.offset;
        console.log(this.totalPage);
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  gotoPage(limit, offset, currentPage) {
    this.currentPage = currentPage;
    this.getQuestionSet(limit, offset);
  }
}
