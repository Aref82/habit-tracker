import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Habit } from './habit.model';

@Injectable({ providedIn: 'root' })
export class HabitService {
  private key = 'habit_vip_data';
  private habits$ = new BehaviorSubject<Habit[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.habits$.next(this.loadFromStorage());
    }
  }

  get habitsObs() { return this.habits$.asObservable(); }

  private loadFromStorage(): Habit[] {
    if (!isPlatformBrowser(this.platformId)) return [];
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(habits: Habit[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.key, JSON.stringify(habits));
    }
  }

  // تغییر: ورودی‌های جدید برای تاریخ و رنگ
  add(title: string, deadline: string, color: string) {
    const current = this.habits$.value;
    const newItem: Habit = { 
      id: Date.now(), 
      title, 
      completed: false, 
      streak: 0,
      deadline, // ذخیره تاریخ
      color     // ذخیره رنگ
    };
    const updated = [newItem, ...current];
    this.updateState(updated);
  }

  delete(id: number) {
    const updated = this.habits$.value.filter(h => h.id !== id);
    this.updateState(updated);
  }

  updateTitle(id: number, newTitle: string) {
    const updated = this.habits$.value.map(h => 
      h.id === id ? { ...h, title: newTitle } : h
    );
    this.updateState(updated);
  }

  toggle(id: number) {
    const updated = this.habits$.value.map(h => {
      if (h.id === id) {
        const isCompleting = !h.completed;
        return { 
          ...h, 
          completed: isCompleting,
          streak: isCompleting ? h.streak + 1 : (h.streak > 0 ? h.streak - 1 : 0)
        };
      }
      return h;
    });
    this.updateState(updated);
  }

  getAll() { return this.habits$.value; }

  private updateState(habits: Habit[]) {
    this.saveToStorage(habits);
    this.habits$.next(habits);
  }
}