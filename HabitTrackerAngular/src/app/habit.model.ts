export interface Habit {
  id: number;
  title: string;
  completed: boolean;
  streak: number;
  deadline?: string;
  color?: string;
  // فیلد جدید برای انتخاب چندتایی هوش مصنوعی
  selectedForAi?: boolean; 
}