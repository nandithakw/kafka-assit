import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL, httpOptions } from '../app.constants'; import { fromEvent, concatMap, interval, take, Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-publish-to-topic',
  templateUrl: './publish-to-topic.component.html',
  styleUrls: ['./publish-to-topic.component.css']
})
export class PublishToTopicComponent implements OnInit {
  publishingFromGroup = new FormGroup({
    connectionName: new FormControl("perf"),
    topic: new FormControl(),
    message: new FormControl(),
  });
  topics: string[] = [];
  @ViewChild('message') message: CdkTextareaAutosize;
  filteredTopics: Observable<string[]>;
  constructor(private _ngZone: NgZone, private http: HttpClient) { }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.message.resizeToFitContent(true));
  }
  ngOnInit(): void {
    this.loadConnections().subscribe(result => { });
    this.filteredTopics = this.publishingFromGroup.controls["topic"].valueChanges.pipe(
      startWith(''),
      map(value => this.filterTopicName(value || '')),
    );
    this.loadTopics();
  }
  private filterTopicName(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.topics.filter(option => option.toLowerCase().includes(filterValue));
  }
  addNewConnection() {
    confirm("dddd");
  }
  onConnectionChange($event: any) {
    console.log($event);
    this.loadTopics();
  }
  loadConnections() {
    return this.http.get(`${SERVER_URL}api/getallconnections`);
  }
  loadTopics() {
    let body = this.publishingFromGroup.value;
    return this.http.post(`${SERVER_URL}api/topics`, body, httpOptions)
      .subscribe(result => { this.topics = result as any; });
  }
  publish() {
    let body = this.publishingFromGroup.value;
    ///if (this.isJsonString(body.message)) {
      this.http.post(`${SERVER_URL}api/publish`, body, httpOptions).subscribe(x => {

      });
   // } else { alert("invalid message") };
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
