import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishToTopicComponent } from './publish-to-topic.component';

describe('PublishToTopicComponent', () => {
  let component: PublishToTopicComponent;
  let fixture: ComponentFixture<PublishToTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishToTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishToTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
