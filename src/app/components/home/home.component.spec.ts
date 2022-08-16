import { TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/services/http.service';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        HttpService
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
