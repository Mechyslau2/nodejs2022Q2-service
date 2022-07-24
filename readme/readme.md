## Установка

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

***Если Вы меняли порт при установке postgresql***

Порт можно поменять в .env. Переменная - POSTGRES_PORT

***Важно!*** 
Убедиться что запущен docker-desktop)

## Запуск без наблюдения изменений 

`yarn docker:start` or `npm run docker:start`

## Запуск с наблюдениями

`yarn docker:build` or `npm run docker:build`

