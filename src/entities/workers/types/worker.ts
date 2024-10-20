export interface IWorker {
  id: string;
  name: string;
  firstName: string;
  age: number;
  work_hours: string;
  is_working: boolean;
  position: string;
  hourly_rate: number; // Ставка оплаты за час
  work_histories: WorkHistory[];
  start_of_working: string;
  end_of_working: string;
  monthly_worked_minutes: number; // Количество отработанных минут за месяц
  monthly_earnings: number; // Заработок за месяц
}

// История работы за каждый день
interface WorkHistory {
  date: string; // Дата в формате "YYYY-MM-DD"
  sessions: WorkSession[]; // Сессии (приходы и уходы) за день
  work_minutes: number; // Количество отработанных минут за день
}

// Сессия: отметка прихода и ухода
interface WorkSession {
  check_in: string; // Время прихода
  check_out: string | null; // Время ухода (null, если еще не ушел)
}
