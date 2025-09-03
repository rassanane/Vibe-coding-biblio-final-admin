import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { MaisonsEditionComponent } from './maisons-edition';

describe('MaisonsEditionComponent', () => {
  let component: MaisonsEditionComponent;
  let fixture: ComponentFixture<MaisonsEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaisonsEditionComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaisonsEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
