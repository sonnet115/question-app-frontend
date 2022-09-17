import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSentencesComponent } from './manage-sentences.component';

describe('ManageSentencesComponent', () => {
  let component: ManageSentencesComponent;
  let fixture: ComponentFixture<ManageSentencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSentencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSentencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
