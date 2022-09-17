import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSinkSwimComponent } from './manage-sink-swim.component';

describe('ManageSinkSwimComponent', () => {
  let component: ManageSinkSwimComponent;
  let fixture: ComponentFixture<ManageSinkSwimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSinkSwimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSinkSwimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
