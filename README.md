## Тестовое задание:

### В ТЗ использовались такие библиотеки как:

React
Redux / Redux Toolkit
md5
react-toastify
Styled Components
Formik
Axios
MUI (Material UI)

### Все пункты по ТЗ выполнены. Сверх этого были сделаны следующие пункты (плюсы):

1. Добавлены тесты для всех редьюсеров (Для AppSlice и ProductSlice)
2. Использовался TypeScript, строгая типизация (Для API тоже)
3. Проект был мемоизирован, что помогло оптимизировать веб-приложение
4. Использовался подход Чистых функций и Функционального программирования
5. Использовалась правильная Архитектура проекта (UI ←→ BLL ←→ DAL)
6. Проект использует понятную и простую Архитектуру Папок
7. Однообразный стиль написания кода
8. Адаптация веб-приложения в том числе и на мобильные телефоны
9. Красивый и понятный пользовательский интерфейс (UI)
10. Использовались кастомные хуки, для разделения UI логики (рендеринга) и BLL логики (бизнес / данные)

### Результат:
Сайт ( Использовал gitHub Pages): https://artlevel.github.io/task/
Исходный код (Использовал git): https://github.com/ArtLevel/task

### ПРОБЛЕМЫ КОТОРЫЕ МОГУТ ВОЗНИКНУТЬ ИЗ-ЗА ПРОТОКОЛА HTTP:

API, которое предоставлено в ТЗ использует протокол HTTP, этот протокол является незащищённым. Из-за этого возникает ошибка в браузере, которая гласит - ‘Blocked loading mixed active content “http://api.valantis.store:40000/”’. Эта ошибка возникает в браузере при попытке загрузить незащищенный (HTTP) контент на защищенной (HTTPS) странице (Использую gitHub pages). Это происходит из-за того, что современные браузеры ограничивают такие запросы из соображений безопасности.

### КАК ИСПРАВИТЬ ?

1. **Google Chrome**:
- В адресной строке введите: `chrome://flags`.
- Ищите опцию "Allow invalid certificates for resources loaded from localhost" и включите ее.

2. **Mozilla Firefox**:
- В адресной строке введите: `about:config`.
- Нажмите "Принять риск и перейти."
- Найдите параметр `security.mixed_content.block_active_content` и установите его значение в `false`.

3. **Microsoft Edge**:
- В адресной строке введите: `edge://flags`.
- Используйте поиск, чтобы найти опции, связанные с Mixed Content.

4. **Осмотрите настройки вашей серверной стороны**:
- Проверьте, доступен ли контент через HTTPS. Убедитесь, что все ресурсы, которые вы загружаете, такие как изображения, стили и скрипты, также доступны через HTTPS.
- Убедитесь, что ваш сервер настроен правильно для обслуживания защищенного (HTTPS) контента.
