import { AfterViewInit, Component, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL, httpOptions } from '../app.constants'; import { fromEvent, concatMap, interval, take, Observable, startWith, map, Subscription } from 'rxjs';
import { ActionDirective } from '../action-components/action.directive';
import { DescribeClusterConfigComponent } from '../action-components/describe-cluster-config/describe-cluster-config.component';
import { ActionComponent } from '../action-components/action.component';
import { DescribeConfigComponent } from '../action-components/describe-config/describe-config.component';

@Component({
  selector: 'app-cluster-admin',
  templateUrl: './cluster-admin.component.html',
  styleUrls: ['./cluster-admin.component.css']
})
export class ClusterAdminComponent implements OnInit, AfterViewInit {
  headerFromGroup = new FormGroup({
    connectionName: new FormControl("perf"),
    action: new FormControl(),
  });


  displayFromGroup = new FormGroup({

    message: new FormControl(),
  });
  actions: any[] = [];
  @ViewChild('message') message: CdkTextareaAutosize;
  filteredActions: Observable<any[]>;
  @ViewChild(ActionDirective, { static: true }) actionHost!: ActionDirective;

  constructor(private _ngZone: NgZone, private http: HttpClient) { }
  ngAfterViewInit(): void {

  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.message.resizeToFitContent(true));
  }
  ngOnInit(): void {
    this.loadConnections().subscribe(result => { });
    this.filteredActions = this.headerFromGroup.controls["action"].valueChanges.pipe(
      startWith(''),
      map(value => this.filterActionName(value || '')),
    );
    this.loadActions();
    // this.loadActionComponent();
  }
  private filterActionName(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.actions.filter(option => option.displayName.toLowerCase().includes(filterValue));
  }
  addNewConnection() {
    confirm("dddd");
  }
  onConnectionChange($event: any) {
    console.log($event);
    this.loadActions();
  }
  loadConnections() {
    return this.http.get(`${SERVER_URL}api/getallconnections`);
  }
  loadActions() {
    this.actions = [{ name: "describe-config", displayName: "Describe configs" }, { name: "describe-cluster", displayName: "Describe cluster" }]
  }

  addcommandReponse(ev: any) {
    this.displayFromGroup.patchValue({ "message": ev });
  }
  loadActionComponent(selectedAction: any) {
    debugger; console.log(selectedAction);
    const viewContainerRef = this.actionHost.viewContainerRef;
    if (this.actionResultSubscription) { this.actionResultSubscription.unsubscribe(); }
    viewContainerRef.clear();
    let componentType: Type<ActionComponent> = DescribeClusterConfigComponent;
    if (selectedAction.name === "describe-config") { componentType = DescribeConfigComponent; }

    const componentRef = viewContainerRef.createComponent<ActionComponent>(componentType);
    let body = this.headerFromGroup.value;
    componentRef.instance.connectionName = this.headerFromGroup.value.connectionName;
    this.actionResultSubscription = componentRef.instance.commandReponse
      .subscribe(x => this.addcommandReponse(JSON.stringify(x, null, 4)));
  }
  actionResultSubscription: Subscription;

  displayFnForActionAutoComplete(action: any): string {
    return action && action.displayName ? action.displayName : '';
  }

  isJsonString(jsonValue: any) {
    try {
      JSON.parse(jsonValue);
    } catch (e) {
      return false;
    }
    return true;
  }
}
