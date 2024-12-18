  // Массив мотивационных цитат
  const quotes = [
    {
      text: "Muvaffaqiyat – oxiri emas, muvaffaqiyatsizlik esa o'lim emas; ahamiyatli narsa – davom ettirish jasoratidir.",
      author: 'Uinston Cherchill'
    },
    {
      text: "Muvaffaqiyat haqida orzu qilish o'rniga, unga intiling.",
      author: 'Este Lauder'
    },
    {
      text: "Imkoniyatlar o'z-o'zidan kelmaydi, ularni siz yaratishingiz kerak.",
      author: 'Kris Grosser'
    },
    { text: 'Muvaffaqiyatning siri – boshlash.', author: 'Mark Tven' },
    {
      text: "Siz rejalashtirayotgan narsalaringiz bilan obro' qozona olmaysiz.",
      author: 'Genri Ford'
    },
    {
      text: 'Buyuk ishlarni amalga oshirish uchun avvalo orzu qilish kerak.',
      author: 'Anatol Frans'
    },
    {
      text: 'Faqat harakat muvaffaqiyat keltiradi, orzu emas.',
      author: 'Mario Andretti'
    },
    {
      text: 'Har bir qiyinchilikda imkoniyat bor.',
      author: 'Albert Eynshteyn'
    },
    {
      text: "Biz har doim o'rganyapmiz va bu bizni yaxshilaydi.",
      author: 'Nikola Tesla'
    },
    {
      text: "Muhim narsa – cheksiz intilish va o'z ustingda ishlashdir.",
      author: 'Yohann Volfgang fon Gyote'
    },
    {
      text: 'Qiyinchilik – muvaffaqiyat uchun zarur.',
      author: 'Genri Ford'
    },
    { text: "Sabr qilgan odam g'alaba qozonadi.", author: 'Yapon maqoli' },
    {
      text: "Har doim yuqoriga intiling va yuksak maqsadlar qo'ying.",
      author: 'Konfutsiy'
    },
    {
      text: 'Agar yutishni xohlasangiz, har bir imkoniyatdan foydalaning.',
      author: 'Maykl Jordan'
    },
    {
      text: "Muvaffaqiyat – bu yo'l davomida duch keladigan muvaffaqiyatsizliklarga qaramay, yo'ldan chiqmaslikdir.",
      author: 'Vinston Cherchill'
    },
    { text: 'Haqiqiy kuch – ichingizda yashiringan.', author: 'Lao Tzu' },
    {
      text: 'Katta marralarga erishish uchun har kuni kichik qadamlar tashlang.',
      author: 'Ralph Valdo Emerson'
    },
    {
      text: "Eng katta jasorat – o'z orzularingizga ergashishdir.",
      author: 'Opra Uinfri'
    },
    {
      text: 'Sabr qilsangiz, barcha qiyinchiliklar ortda qoladi.',
      author: 'Viktor Hugo'
    },
    {
      text: 'Qiyinchiliklar – imkoniyatlarni yaratish uchun xizmat qiladi.',
      author: 'Albert Eynshteyn'
    },
    {
      text: 'Harakatlarsiz orzular – bu shunchaki orzular.',
      author: 'Daley Karnegi'
    },
    {
      text: "Yangi narsalarni o'rganishdan hech qachon to'xtamang.",
      author: 'Napoleon Xill'
    },
    {
      text: "Muvaffaqiyatli bo'lish uchun, uxlashni qisqartiring.",
      author: 'Leonardo da Vinchi'
    },
    {
      text: "Agar orzularingiz katta bo'lsa, harakatlar ham shunchalik kuchli bo'lishi kerak.",
      author: 'Napoleon Bonapart'
    },
    {
      text: "Muhim narsa – harakat qilish va hech qachon to'xtamaslikdir.",
      author: 'Tomas Jefferson'
    },
    {
      text: 'Qanchalik mehnat qilsangiz, shunchalik muvaffaqiyatga erishasiz.',
      author: 'Mikelangelo'
    },
    {
      text: 'Hech narsa qiyin emas, agar siz unga ishonch bilan yondashsangiz.',
      author: 'Muhammad Ali'
    },
    {
      text: 'Muvaffaqiyatli insonlar orzulariga ergashadi va ular uchun kurashadi.',
      author: 'Stiv Jobs'
    },
    {
      text: "Tashqi omillar emas, o'zingizdagi kuchlar muvaffaqiyat keltiradi.",
      author: 'Edmond Spencer'
    },
    {
      text: 'Har doim yangi marralar sari intiling.',
      author: 'Oskar Uayld'
    },
    {
      text: "Faqat hayotdan nimadir olishni emas, balki uni boyitishni o'rganing.",
      author: 'Albert Schweitzer'
    },
    {
      text: "Muhim bo'lgan yagona raqobat – bu o'zingiz bilan raqobat.",
      author: 'Denis Waitley'
    },
    {
      text: 'Kichik qadamlar bilan katta marralarga yetishish mumkin.',
      author: 'Jek Ma'
    },
    {
      text: 'Harakatlarsiz, hatto eng yaxshi rejalar ham amalga oshmaydi.',
      author: 'Peter Druker'
    },
    {
      text: "Siz qanday ish qilsangiz, dunyo sizga shunday munosabatda bo'ladi.",
      author: 'Gandhi'
    },
    { text: "O'rganishni hech qachon to'xtatmang.", author: 'Bruce Lee' },
    {
      text: "Boshqalarga yordam berish orqali o'zingizni boyitasiz.",
      author: 'Daley Lama'
    },
    {
      text: 'Hayotda harakat qilishga majbur qiladigan kuch toping.',
      author: 'Harri Trumen'
    },
    {
      text: "Agar siz o'zgarmasangiz, hech narsa o'zgarmaydi.",
      author: 'George Bernard Shaw'
    },
    {
      text: 'Nimaga loyiq ekaningizga ishonch hosil qiling va unga intiling.',
      author: 'Elenor Ruzvelt'
    }
  ]

  // Показывает случайную цитату
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const quote = quotes[randomIndex]
    document.getElementById('quote-text').textContent = `"${quote.text}"`
    document.getElementById(
      'quote-author'
    ).textContent = `- ${quote.author}`
  }

  displayRandomQuote() // Показывает цитату при загрузке

  // Логика для обработки QR кода
  document
    .getElementById('submit-btn')
    .addEventListener('click', function () {
      const qrCodeText = document.getElementById('qr_code_text').value

      if (!qrCodeText) {
        displayAlert('Пожалуйста, вставьте данные из QR кода.', 'red')
        return
      }

      const [workerId, qrText] = qrCodeText.split(',')

      if (!workerId || !qrText) {
        displayAlert('Неверный формат данных в QR коде.', 'red')
        return
      }

      const scanTime = new Date().toISOString()

      let workPlaceName = localStorage.getItem('work_place_name')

      if (!workPlaceName) {
        workPlaceName = prompt(
          'Пожалуйста, введите название рабочего места:'
        )

        if (!workPlaceName) {
          displayAlert('Название рабочего места обязательно.', 'red')
          return
        }

        localStorage.setItem('work_place_name', workPlaceName)
      }

      const historyData = {
        worker_id: workerId,
        work_place_name: workPlaceName,
        qr_code_text: qrText,
        scan_time: scanTime
      }

      fetch('https://rebo-work.uz/api/histories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(historyData)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.statusText}`)
          }
          return response.json()
        })
        .then((data) => {
          displayAlert(
            'Данные успешно отправлены! Вы можете проверить их по ссылке внизу.',
            'green'
          )
          clearInput()
          console.log('Ответ от сервера:', data)
        })
        .catch((error) => {
          displayAlert(`Произошла ошибка: ${error.message}`, 'red')
          console.error('Ошибка:', error)
        })
    })

  function displayAlert(message, color) {
    const alertDiv = document.getElementById('alert-message')
    alertDiv.textContent = message
    alertDiv.style.color = color
  }

  function clearInput() {
    document.getElementById('qr_code_text').value = ''
  }

  function openPopup(tasks) {
    const tableBody = document.getElementById('task-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Очистить таблицу перед добавлением новых данных

    if(!tasks.length) {
        tableBody.innerHTML = 'Vazifa yo\'q' 
    }

    tasks.forEach(task => {
      const row = tableBody.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      
      cell1.textContent = task.store_name;
      cell2.textContent = task.description;
      cell3.textContent = task.status;
      cell4.textContent = new Date(task.created_at).toLocaleDateString();
    });

    document.getElementById('task-popup').style.display = 'flex';
  }

  // Закрытие popup
  document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('task-popup').style.display = 'none';
  });

  // Функция для получения задач из API
  async function fetchTasks() {
    try {
      const response = await fetch('https://rebo-work.uz/api/tasks');
      const data = await response.json();


      // Открыть popup с задачами
      openPopup(data);
    } catch (error) {
      console.error('Ошибка при получении задач:', error);
    }
  }

  // Обработчик нажатия на кнопку "Показать задачи"
  document.getElementById('show-tasks-btn').addEventListener('click', () => {
    console.log('Кнопка нажата');
    fetchTasks();
  });