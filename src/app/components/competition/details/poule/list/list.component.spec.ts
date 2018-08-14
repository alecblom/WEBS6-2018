import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PouleListComponent } from './list.component';

describe('ListComponent', () => {
  let component: PouleListComponent;
  let fixture: ComponentFixture<PouleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PouleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PouleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
