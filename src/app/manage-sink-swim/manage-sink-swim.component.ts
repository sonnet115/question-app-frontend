import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {CommonService} from '../shared/common.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../dashboards/_alert';
import {QApiManagerService} from '../questions/q-api-manager.service';
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
  selector: 'app-manage-sink-swim',
  templateUrl: './manage-sink-swim.component.html',
  styleUrls: ['./manage-sink-swim.component.css']
})
export class ManageSinkSwimComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  objects: any;
  fileName: any;
  base64textString: any;
  objectId: any;
  objectName: any;
  objectType: any;
  objectStatus: any;
  objectImage: any;

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
    this.base64textString = '';
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
        that.http.post<DataTablesResponse>(this.endpoints.getObject,
          dataTablesParameters, {}
        ).subscribe(resp => {
          that.objects = resp.data;

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
        {data: 'name'},
        {data: 'answer'},
        {data: 'active'},
      ]
    };
  }

  open(content, id, name) {
    if (id !== '') {
      this.getByID(id);
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  create(name, type) {
    this.spinner.show();
    const data = {
      'name': name,
      'answer': type,
      'image': this.base64textString,
      'active': 1
    };
    this.commonApiService.post(data, this.endpoints.createObject).subscribe((response: any) => {
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
        this.base64textString = '';
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  update(name, type, status, id) {
    this.spinner.show();
    console.log(type);
    const data = {
      'name': name,
      'answer': type,
      'active': status,
      'image':  this.base64textString === '' ? this.objectImage : this.base64textString
    };
    this.commonApiService.put(data, this.endpoints.updateObject, id).subscribe((response: any) => {
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
    this.commonApiService.get(id, this.endpoints.getObjectById).subscribe((response: any) => {
        this.spinner.hide();
        console.log(response);
        this.objectId = response.id;
        this.objectName = response.name;
        this.objectStatus = response.active;
        this.objectType = response.answer;
        this.objectImage = response.image;
      },
      error => {
        setTimeout(() => {
          this.dialogService.open(error.message, environment.info_message, 'success', environment.info);
        }, 100);
        this.spinner.hide();
      }
    );
  }

  onUploadChange(file: any): any {
    if (file) {
      const reader = new FileReader();
      this.fileName = file.name;
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e: any): any {
    this.base64textString = btoa(e.target.result);
  }
}
