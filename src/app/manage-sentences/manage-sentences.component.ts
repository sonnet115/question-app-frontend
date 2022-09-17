import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QuestionsComponent} from '../questions/questions.component';
import {FormBuilder} from '@angular/forms';
import {QsApiManagerService} from '../question-sets/qs-api-manager.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../dashboards/_alert';
import {QApiManagerService} from '../questions/q-api-manager.service';
import {CommonService} from '../shared/common.service';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommonEndPoints} from '../shared/CommonEndPoints';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DialogService} from '../shared/_modal/dialog.service';
import {environment} from '../../environments/environment';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-manage-sentences',
  templateUrl: './manage-sentences.component.html',
  styleUrls: ['./manage-sentences.component.css']
})

export class ManageSentencesComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  sentences: any;
  sentenceId: any;
  sentenceText: any;
  sentenceStatus: any;

  constructor(private fb: FormBuilder,
              private commonApiService: CommonService,
              private spinner: NgxSpinnerService,
              private alertService: AlertService,
              private apiService: QApiManagerService,
              private http: HttpClient,
              private endpoints: CommonEndPoints,
              private modalService: NgbModal,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.loadDatatables();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(void 0);
  }

  loadDatatables() {
    const that = this;
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http.post<DataTablesResponse>(this.endpoints.getSentence,
          dataTablesParameters, {}
        ).subscribe(resp => {
          that.sentences = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: [],
          });
        });
      },
      searching: true,
      info: true,
      columns: [
        {data: 'sentence'},
        {data: 'active'},
      ]
    };
  }

  open(content, id, sentence_text) {
    if (id !== '') {
      this.getByID(id);
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  create(text) {
    this.spinner.show();
    const data = {
      'sentence': text,
      'active': 1
    };
    this.commonApiService.post(data, this.endpoints.createSentence).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.modalService.dismissAll();
        setTimeout(() => {
          this.dialogService.open(response.message, environment.info_message, 'success', environment.info);
        }, 100);
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.loadDatatables();
          setTimeout(() => {
            this.dtTrigger.next(void 0);
            // this.spinner.hide();
          }, 200);
        });

      },
      error => {
        this.spinner.hide();
      }
    );
  }

  update(text, status, id) {
    this.spinner.show();
    const data = {
      'sentence': text,
      'active': status
    };
    this.commonApiService.put(data, this.endpoints.updateSentence, id).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.modalService.dismissAll();
        setTimeout(() => {
          this.dialogService.open(response.message, environment.info_message, 'success', environment.info);
        }, 100);
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.loadDatatables();
          setTimeout(() => {
            this.dtTrigger.next(void 0);
            // this.spinner.hide();
          }, 200);
        });

      },
      error => {
        this.spinner.hide();
      }
    );
  }

  getByID(id) {
    this.spinner.show();
    this.commonApiService.get(id, this.endpoints.getSentenceById).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.sentenceId = response.id;
        this.sentenceText = response.sentence;
        this.sentenceStatus = response.active;
      },
      error => {
        setTimeout(() => {
          this.dialogService.open(error.message, environment.info_message, 'success', environment.info);
        }, 100);
        this.spinner.hide();
      }
    );
  }

}
