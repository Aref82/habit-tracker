import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { HabitService } from './habit.service';
import { Habit } from './habit.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, FormsModule, HttpClientModule,
    NzLayoutModule, NzButtonModule, NzInputModule, 
    NzListModule, NzCheckboxModule, NzCardModule, 
    NzIconModule, NzTagModule, NzSpinModule, NzModalModule,NzDatePickerModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  newHabit = '';
  newDate: Date | null = null;
  newColor = '#3b82f6';
  
  habits$: Observable<Habit[]>; 
  aiResult = '';
  loading = false;

  isEditModalVisible = false;
  editingId: number | null = null;
  editingTitle = '';

  constructor(
    private habitService: HabitService,
    private message: NzMessageService
  ) {
    this.habits$ = this.habitService.habitsObs;
  }

  add() {
   if (!this.newHabit.trim()) {
      this.message.error('لطفا عنوان را وارد کنید');
      return;
    }
    

    const dateString = this.newDate ? new Date(this.newDate).toISOString() : '';

    this.habitService.add(this.newHabit, dateString, this.newColor);
    
    this.newHabit = '';
    this.newDate = null;
    this.message.success('ثبت شد');
  }

  getDaysRemaining(deadline: string | undefined): string {
    if (!deadline) return '';
    const diff = new Date(deadline).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    if (days < 0) return 'منقضی';
    if (days === 0) return 'امروز';
    return `${days} روز مانده`;
  }

  toggle(id: number) { this.habitService.toggle(id); }
  delete(id: number) { this.habitService.delete(id); }

  startEdit(habit: Habit) {
    this.editingId = habit.id;
    this.editingTitle = habit.title;
    this.isEditModalVisible = true;
  }

  saveEdit() {
    if (this.editingId && this.editingTitle.trim()) {
      this.habitService.updateTitle(this.editingId, this.editingTitle);
      this.isEditModalVisible = false;
    }
  }

  cancelEdit() { this.isEditModalVisible = false; }

  // --- هوش مصنوعی (اصلاح شده و تضمینی) ---
  askAi() {
    const allHabits = this.habitService.getAll();
    const selected = allHabits.filter(h => h.selectedForAi);

    if (selected.length === 0) {
      this.message.error('لطفا حداقل یک مورد را تیک بزنید (مربع کوچک)');
      return;
    }

    this.loading = true;
    this.aiResult = ''; // پاک کردن نتیجه قبلی

    // شبیه‌سازی تاخیر ۳ ثانیه‌ای با setTimeout (امن‌ترین روش)
    setTimeout(() => {
      this.generateFakeResponse(selected);
      this.loading = false;
    }, 1);
  }

  generateFakeResponse(selectedHabits: Habit[]) {
    const names = selectedHabits.map(h => h.title).join('» و «');
    
    const responses = [
      `بررسی الگوریتمیک عادت‌های «${names}» نشان می‌دهد که شما در مسیر درستی هستید.`,
      `تحلیلگر عصبی ما متوجه شد که تمرکز بر «${names}» می‌تواند بهره‌وری شما را ۳۰٪ افزایش دهد.`,
      `داده‌های رفتاری شما در مورد «${names}» بسیار امیدوارکننده است. فقط نیاز به استمرار دارید.`
    ];
    
    const randomIntro = responses[Math.floor(Math.random() * responses.length)];
    
    this.aiResult = `
      ${randomIntro}
      
      نکات تکمیلی:
      ۱. سیستم پاداش مغز شما با تکمیل این موارد فعال شده است.
      ۲. طبق قانون ۲۰/۸۰، این عادت‌ها بیشترین تاثیر را در زندگی شما دارند.
      ۳. پیشنهاد می‌کنم محیط خود را برای انجام راحت‌تر این کارها بهینه کنید.
      
      نتیجه‌گیری: عالی پیش می‌روید!
    `;
  }
}