import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // <--- اینجا باید App باشد

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));