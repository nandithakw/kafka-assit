import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectedActionDetails } from 'src/app/models/simple-autocomplet-item';
import { ActionComponent } from '../action.component';
import { SERVER_URL, httpOptions } from '../../app.constants'; import { fromEvent, concatMap, interval, take, Observable, startWith, map } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
    //selector: 'app-describe-cluster',
    templateUrl: './describe-config.component.html',
    // styleUrls: ['./cluster-admin.component.css']
})
export class DescribeConfigComponent implements ActionComponent {
    @Input() connectionName: string;
    @Output() commandReponse = new EventEmitter<any>();
    actionFromGroup = new FormGroup({
        selectedResourceType: new FormControl("broker"),
        selectedResource: new FormControl(),
    });
    constructor(private http: HttpClient) { }
    onResourceTypeChanged(resTypeChangeEvt: any) {
        let rtype = resTypeChangeEvt;
        if (rtype == 'broker') {
            this.http.post(`${SERVER_URL}api/brokers`, { "connectionName": this.connectionName }, httpOptions).subscribe(x => {

            });
        } else if (rtype == 'topic') {
            this.http.post(`${SERVER_URL}api/brokers`, { "connectionName": this.connectionName }, httpOptions).subscribe(x => {

            });
        } else if (rtype == 'broker-logger') {
            confirm("Not supported");
        }

    }

    describe() {
        this.http.post(`${SERVER_URL}api/describe-cluster`,
            {
                "connectionName": this.connectionName,
                "selectedResourceType": this.actionFromGroup,

                "selectedResource": this.actionFromGroup,

            }, httpOptions).subscribe(x => {
                this.commandReponse.emit(x);
            });
    }
}



