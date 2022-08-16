import { TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoadingComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoadingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
