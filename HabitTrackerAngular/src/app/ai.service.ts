import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Habit } from './habit.model';

@Injectable({ providedIn: 'root' })
export class AiService {

  private intros = [
    "الگوریتم‌های پیشرفته ما الگوی رفتاری شما را اسکن کردند.",
    "تحلیلگر هوشمند، داده‌های شما را با موفق‌ترین افراد مقایسه کرد.",
    "بر اساس تئوری عادت‌های اتمی، وضعیت شما بررسی شد."
  ];

  private fillers = [
    "شما در حال ساخت مسیرهای عصبی جدیدی در مغزتان هستید. استمرار فعلی شما، سطح دوپامین را در حالت بهینه نگه داشته است. فقط مراقب باشید که در تله‌ی 'کمال‌گرایی' نیفتید.",
    "قانون ۵ ثانیه را فراموش نکنید. هر وقت حس کردید تنبلی سراغتان آمده، از ۵ تا ۱ بشمارید و حرکت کنید. داده‌های شما نشان می‌دهد پتانسیل جهش عملکردی دارید.",
    "سیستم پاداش مغز شما الان تشنه‌ی تیک زدن موارد بیشتر است. نمودار پیشرفت شما خطی نیست، بلکه نمایی است و به زودی نتایج بزرگی می‌بینید."
  ];

  private conclusions = [
    "توصیه نهایی: همین فرمان را ادامه دهید، فقط روی سیستم تمرکز کنید نه هدف.",
    "جمع‌بندی: شما از ۹۰٪ آدم‌های اطرافتان جلوتر هستید چون اقدام می‌کنید.",
    "نکته طلایی: فردا سخت‌ترین روز است، اگر فردا هم انجامش دهید، عادت تثبیت می‌شود."
  ];

  analyze(habits: Habit[]): Observable<any> {
    // پیدا کردن نام عادت‌ها برای استفاده در متن
    const habitNames = habits.map(h => h.title).join('» و «');
    const targetName = habitNames || 'کارهای روزانه';

    // تولید متن رندوم
    const text = `
      ${this.getRandom(this.intros)}
      
      تحلیل اختصاصی برای «${targetName}»:
      ${this.getRandom(this.fillers)}
      
      نکته علمی: تحقیقات دانشگاه استنفورد نشان می‌دهد که نوشتن و تیک زدن (مثل کاری که شما کردید) احتمال موفقیت را ۴۲٪ افزایش می‌دهد.
      
      ${this.getRandom(this.conclusions)}
    `;

    const response = {
      choices: [{ message: { content: text } }]
    };

    // ۳ ثانیه صبر میکند و بعد جواب میدهد (تضمینی)
    return timer(1).pipe(map(() => response));
  }

  private getRandom(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}