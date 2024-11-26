import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Signal } from '@angular/core';
import { AuthService } from './services/authService';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  public userEmail: Signal<string | null>;
  public userName: Signal<string | null>;

  title = 'aspangularapp1.client';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userEmail = this.authService.userEmail;
    this.userName = this.authService.userName;
  }

  ngOnInit() {
    this.authService.init();
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/api/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onCreateConsultant() {
    this.http.post('/api/consultants', {
      Name: 'Martin Freeman',
      Description: 'Developer'
    }).subscribe();
  }

  async onLogIn() {
    await this.authService.logIn();
  }

  async onLogOut() {
    await this.authService.logOut();
  }
}
