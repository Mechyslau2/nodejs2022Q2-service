# Установка

`yarn install` or `npm install`

## Запуск приложения

`yarn start:dev` or `npm run start:dev`

## Тестирование

***Важно!*** Запустить приложение, затем запустить тесты

`yarn test` or `npm run test`

## Использование

Импортировать коллекцию _restService.postman_collection.json_ в postman. Находиться в папке readme. Для удобства сначала запусть приложение, затем тесты. Прорастут некоторые данные.

Все API, которые с id, ненужно добавлять в тело запроса. Пример ***PUT*** для ***user***

`
{
    "oldPassword": "111222",
    "newPassword": "123456"
}
`
Для удаления/добавления ***id*** в поисковую строку. Пример ниже (***Delete user***):


`localhost:4000/user/89e6dfd8-46ce-4b73-8dd3-634944371ce8`


Для эндпоинта ***Artist*** и там где есть ***Boolean*** убидиться что передаеться именно ***boolean*** (Есть с типом строка в тестах). Работать будет так(Artist):

`
{
    "name": "Some Artist",
    "grammy": false
}
`

# Запуск через Docker

***Переименовать .env.example в .env***

Добавить свои креды postgresql в переменные (user, password, db), а также вписать их в DATABASE_URL если будете запускать локально.

***Тестировать API через postman, swagger еще не работает. Файл коллекции можно найти в папке readme***

***Если Вы меняли порт при установке postgresql***

Порт можно поменять в .env. Переменная - POSTGRES_PORT

***Важно!*** 
Убедиться что запущен docker-desktop)

## Запуск без наблюдения изменений 

`yarn docker:start` or `npm run docker:start`

## Остановка docker

`yarn docker:stop` or `npm run docker:stop`

## Перезапись docker и запуск с изминениями в src

Проверить можно через postman. Например именить код ответа.

`yarn docker:restart` or `npm run docker:restart`

## Создание образа для пуша в dockerHub

Пушить ничего не нужно)

`yarn docker:build` or `npm run docker:build`

## Сканирование на уязвимости

Отсканировать можно после команды ***docker:build***

`yarn docker:check` or `npm run docker:check`

## Удаление всех неактивных образов

`yarn docker:di` or `npm run docker:di`
