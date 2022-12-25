import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectedActionDetails } from 'src/app/models/simple-autocomplet-item';
import { ActionComponent } from '../action.component';
import { SERVER_URL, httpOptions } from '../../app.constants'; import { fromEvent, concatMap, interval, take, Observable, startWith, map } from 'rxjs';


@Component({
    //selector: 'app-describe-cluster',
    templateUrl: './describe-cluster-config.component.html',
    // styleUrls: ['./cluster-admin.component.css']
})
export class DescribeClusterConfigComponent implements ActionComponent {
    @Input() connectionName: string;
    @Output() commandReponse = new EventEmitter<any>();

    constructor(private http: HttpClient) { }
    describe() {
        this.http.post(`${SERVER_URL}api/describe-cluster`, { "connectionName": this.connectionName }, httpOptions).subscribe(x => {
            this.commandReponse.emit(x);
        });
    }
}



