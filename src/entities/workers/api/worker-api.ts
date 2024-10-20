import { instance } from '~shared/api/base-api'
import { IWorker } from '../types/worker'

class WorkerApi {
  private instance = instance

  // Получение конкретного работника по ID
  async getWorker(id: string) {
    const response = await this.instance.get<IWorker>(`workers/${id}`)
    return response.data
  }

  // Получение всех работников
  async getWorkers() {
    const response = await this.instance.get<IWorker[]>('workers')
    return response.data
  }

  // Создание нового работника
  async createWorker(worker: IWorker) {
    const response = await this.instance.post<IWorker>('workers', worker)
    return response.data
  }

  // Обновление работника (включая обновление истории работы)
  async updateWorker(id: string) {
    const worker = await this.getWorker(id)
    worker.work_histories = worker.work_histories || []

    const today = new Date()
    const currentTime = new Date().toISOString()
    const currentDateString = today.toISOString().split('T')[0]

    console.log(
      'До изменения work_histories:',
      JSON.stringify(worker.work_histories, null, 2)
    )

    const currentMonthLog = worker.work_histories.find(
      (log) => log.date === currentDateString
    )

    // Проверяем, если работник сканирует код, чтобы войти
    if (currentMonthLog) {
      const lastSession =
        currentMonthLog.sessions[currentMonthLog.sessions.length - 1]

      // Если последняя сессия не закрыта, фиксируем время выхода
      if (lastSession && !lastSession.check_out) {
        lastSession.check_out = currentTime
        const checkInTime = new Date(lastSession.check_in).getTime()
        const checkOutTime = new Date(lastSession.check_out).getTime()
        const workedMinutes = Math.floor((checkOutTime - checkInTime) / 60000)

        // Обновляем общее количество отработанных минут
        currentMonthLog.work_minutes += workedMinutes
        worker.monthly_worked_minutes += workedMinutes

        // Рассчитываем заработок за текущий месяц
        const hourlyRate = worker.hourly_rate || 0
        worker.monthly_earnings =
          (worker.monthly_worked_minutes / 60) * hourlyRate
        worker.is_working = false // Устанавливаем, что работник вышел
      } else {
        // Если последняя сессия закрыта, фиксируем время прихода
        currentMonthLog.sessions.push({
          check_in: currentTime,
          check_out: null
        })
        worker.is_working = true // Устанавливаем, что работник пришел
      }
    } else {
      // Если нет записи для текущего дня/месяца, создаём новую запись
      const newLog = {
        date: currentDateString,
        sessions: [{ check_in: currentTime, check_out: null }],
        work_minutes: 0
      }

      // Добавляем новый лог в work_histories
      worker.work_histories.push(newLog)
      worker.is_working = true // Устанавливаем, что работник пришел
    }

    // Отправляем обновленные данные на сервер
    const response = await this.instance.put<IWorker>(`workers/${id}`, worker)
    return response.data
  }
  // Удаление работника по ID
  async deleteWorker(id: string) {
    const response = await this.instance.delete(`workers/${id}`)
    return response.data
  }
}

export const workerCrudApi = new WorkerApi()
