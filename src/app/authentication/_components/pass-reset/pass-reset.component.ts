import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from '../../_alert';
import {ApiManagerService} from '../../_services/api-manager.service';
import {ActivatedRoute} from '@angular/router';
import { LoggerService } from 'src/app/shared/logger.service';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.css']
})
export class PassResetComponent implements OnInit {

  constructor(private apiManagerService: ApiManagerService,
              private spinner: NgxSpinnerService,
              private alertService: AlertService,
              public translate: TranslateService,
              private route: ActivatedRoute,
              private loggerService: LoggerService) {
  }

  ngOnInit(): void {
  }

  updatePassword(new_password, confirm_password) {
    this.spinner.show();
    const passwords = {
      'token': this.route.snapshot.queryParams['token'],
      'new_password': new_password,
    };

    if (new_password !== '') {
      if (new_password === confirm_password) {
        this.apiManagerService.updatePassword(passwords).subscribe((response: any) => {
            this.spinner.hide();
            this.alertService.success(response.message, {autoClose: true});
          },
          error => {
            this.spinner.hide();
            this.loggerService.log('error', error);
            this.alertService.error(error.error.message, {autoClose: true});
          });
      } else {
        this.spinner.hide();
        this.alertService.error('pass_not_matched');
      }
    } else {
      this.spinner.hide();
      this.alertService.error('pass_required');
    }

  }
}
