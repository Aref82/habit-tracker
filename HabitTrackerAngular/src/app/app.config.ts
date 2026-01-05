import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { en_US, fa_IR, NZ_I18N, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon'; 
import { registerLocaleData } from '@angular/common'; // <--- رجیستر کردن لوکال
import fa from '@angular/common/locales/fa';


import { 
  PlusOutline, 
  EditOutline, 
  DeleteOutline, 
  RobotOutline, 
  CalendarOutline,
  CheckOutline,
  SmileOutline,
  UserOutline,
  InboxOutline,
 
} from '@ant-design/icons-angular/icons';
registerLocaleData(fa);
// لیست آیکون‌هایی که استفاده کردیم
const icons = [
  PlusOutline, 
  EditOutline, 
  DeleteOutline, 
  RobotOutline, 
  CalendarOutline,
  CheckOutline,
  SmileOutline,
  UserOutline,
  InboxOutline
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideNzI18n(en_US),
    provideNzIcons(icons),
    { provide: NZ_I18N, useValue: fa_IR }
  ]
};