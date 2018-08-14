import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPouleComponent } from './detailsPoule.component';

describe('PouleComponent', () => {
  let component: DetailsPouleComponent;
  let fixture: ComponentFixture<DetailsPouleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPouleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPouleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
