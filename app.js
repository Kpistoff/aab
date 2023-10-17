'use strict';

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
  }
  
  const express = require('express');
  const session = require('express-session');
  const path = require('path');
  const parser = require('body-parser');
  const fs = require('fs');
  const bcrypt = require('bcrypt');
  const axios = require('axios');
  const TelegramBot = require('node-telegram-bot-api');
  
  
  const app = express();
  
  
  // Подключение EJS
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  
  // Подключение Public
  app.use(express.static(path.join(__dirname, 'public')));
  
  
  // Подключение MiddleWare
  app.use(parser.urlencoded({ extended: true }));
  
  
  app.use(session({
    secret: 'Nike4bike101$',
    resave: false,
    saveUninitialized: false
  }))
  
  // СОЗДАДИМ БД
  const data = []
  
  
  // Ваш токен бота
  const botToken = '6430332984:AAGBQ9NTH2goE1yD8CRCeeh8zD_cLgY5yUM';
  const bot = new TelegramBot(botToken, { polling: true });
  
  // отправка уведомлений в телеграм
  function sendTelegramNotification(message) {
    // Ваш ID чата или ID пользователя, которому нужно отправить уведомление
    const chatId = '-1001653206122';
  
    // Отправляем сообщение
    bot.sendMessage(chatId, message);
  }
  
  // GET_HOME
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });
  
  // GET_luna-1
  app.get('/shop/Welkin-Moon-1', (req, res) => {
    req.session.origin = 'Луна 1 месяц';
    // Передайте isActive в шаблон EJS
    res.render('Welkin-Moon-1', { isActive: 1 });
  });
  
  // POST_luna-1
  app.post('/shop/Welkin-Moon-1', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_luna-2
  app.get('/shop/Welkin-Moon-2', (req, res) => {
    req.session.origin = 'Луна 2 месяца';
    // Передайте isActive в шаблон EJS
    res.render('Welkin-Moon-2', { isActive: 1 });
  });
  // POST_luna-2
  app.post('/shop/Welkin-Moon-2', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_luna-3
  app.get('/shop/Welkin-Moon-3', (req, res) => {
    req.session.origin = 'Луна 3 месяца';
    // Передайте isActive в шаблон EJS
    res.render('Welkin-Moon-3', { isActive: 1 });
  });
  // POST_luna-3
  app.post('/shop/Welkin-Moon-3', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_luna-6
  app.get('/shop/Welkin-Moon-6', (req, res) => {
    req.session.origin = 'Луна 6 месяцев';
    // Передайте isActive в шаблон EJS
    res.render('Welkin-Moon-6', { isActive: 1 });
  });
  // POST_luna-6
  app.post('/shop/Welkin-Moon-6', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_crys300
  app.get('/shop/Genesis-crystals-300', (req, res) => {
    req.session.origin = 'Кристаллы 300 штук';
    // Передайте isActive в шаблон EJS
    res.render('Genesis-crystals-300', { isActive: 1 });
  });
  // POST_crys300
  app.post('/shop/Genesis-crystals-300', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_crys980
  app.get('/shop/Genesis-crystals-980', (req, res) => {
    req.session.origin = 'Кристаллы 980 штук';
    // Передайте isActive в шаблон EJS
    res.render('Genesis-crystals-980', { isActive: 1 });
  });
  // POST_crys980
  app.post('/shop/Genesis-crystals-980', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_crys1980
  app.get('/shop/Genesis-crystals-1980', (req, res) => {
    req.session.origin = 'Кристаллы 1980 штук';
    // Передайте isActive в шаблон EJS
    res.render('Genesis-crystals-1980', { isActive: 1 });
  });
  // POST_crys1980
  app.post('/shop/Genesis-crystals-1980', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_crys3280
  app.get('/shop/Genesis-crystals-3280', (req, res) => {
    req.session.origin = 'Кристаллы 3280 штук';
    // Передайте isActive в шаблон EJS
    res.render('Genesis-crystals-3280', { isActive: 1 });
  });
  // POST_crys3280
  app.post('/shop/Genesis-crystals-3280', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_crys6480
  app.get('/shop/Genesis-crystals-6480', (req, res) => {
    req.session.origin = 'Кристаллы 6480 штук';
    // Передайте isActive в шаблон EJS
    res.render('Genesis-crystals-6480', { isActive: 1 });
  });
  // POST_luna-6
  app.post('/shop/Genesis-crystals-6480', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_300-kri
  app.get('/shop/Genshin-gems-300', (req, res) => {
    req.session.origin = 'Кристаллы 300 штук';
    // Передайте isActive в шаблон EJS
    res.render('Genshin-gems-300', { isActive: 1 });
  });
  // POST_300-kri
  app.post('/shop/Genshin-gems-300', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_980-kri
  app.get('/shop/Genshin-gems-980', (req, res) => {
    req.session.origin = 'Кристаллы 980 штук';
    // Передайте isActive в шаблон EJS
    res.render('Genshin-gems-980', { isActive: 1 });
  });
  // POST_980-kri
  app.post('/shop/Genshin-gems-980', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_1980-kri
  app.get('/shop/Genshin-gems-1980', (req, res) => {
    req.session.origin = 'Кристаллы 1980 штук';
    // Передайте isActive в шаблон EJS
    res.render('Genshin-gems-1980', { isActive: 1 });
  });
  // POST_1980-kri
  app.post('/shop/Genshin-gems-1980', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_3280-kri
  app.get('/shop/Genshin-gems-3280', (req, res) => {
    req.session.origin = 'Кристаллы 3280 штук';
    // Передайте isActive в шаблон EJS
    res.render('Genshin-gems-3280', { isActive: 1 });
  });
  // POST_3280-kri
  app.post('/shop/Genshin-gems-3280', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_6480-kri
  app.get('/shop/Genshin-gems-6480', (req, res) => {
    req.session.origin = 'Кристаллы 6480 штук';
    res.render('Genshin-gems-6480', { isActive: 1 });
  });
  // POST_6480-kri
  app.post('/shop/Genshin-gems-6480', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  // GET_special
  app.get('/shop/Genesis-crystals-30960', (req, res) => {
    req.session.origin = 'Кристаллы 30960 штук';
    res.render('Genesis-crystals-30960', { isActive: 1 });
  });
  // POST_special
  app.post('/shop/Genesis-crystals-30960', async (req, res) => {
    const isActive = req.body.isActive;
    const uid = req.body.uid; // Получаем UID пользователя
    const promo = req.body.promo; // Получаем UID пользователя
  
    try {
      const timeZoneOffset = 3 * 60; // GMT+3 (в минутах)
      const currentDate = new Date(Date.now() + timeZoneOffset * 60 * 1000);
      const formattedDate = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const origin = req.body.origin; // Получаем информацию о странице отправки
  
      // Получаем IP-адрес пользователя из req.ip
      const userIp = req.ip;
  
      const newItem = {
        uid: uid,
        method: isActive,
        datetime: formattedDate,
        page: origin,
        userIp: userIp, // Добавляем IP-адрес пользователя
        promo: promo,
      };
  
      data.unshift(newItem);
  
      // Отправляем уведомление в Telegram
      const notificationMessage = 'У вас новый заказ:\n' +
      `UID: ${newItem.uid}\n` +
      `Promo: ${newItem.promo}\n` +
      `Метод оплаты: ${newItem.method}\n` +
      `Дата и время: ${newItem.datetime}\n` +
      `Товар: ${newItem.page}\n` +
      `IP-адрес пользователя: ${newItem.userIp}`;
  
      sendTelegramNotification(notificationMessage);
  
      console.log(data); //new users in console
  
      // В зависимости от выбранной карточки, выполняем редирект
      switch (isActive) {
        case 'card1':
          res.redirect("/top-up/ltc-crypto");
          break;
        case 'card2':
          res.redirect("/top-up/xrp-crypto");
          break;
        case 'card3':
          res.redirect("/top-up/usdt-crypto");
          break;
        default:
          res.redirect("/default-page"); // Если isActive не соответствует ни одному из вариантов
          break;
      }
    } catch (e) {
      console.log(e);
      res.redirect("/error-page"); // Редирект в случае ошибки
    }
  });
  
  
  
  
  const dirname = path.dirname(__filename);
  
  function getFileContent(fileName) {
    try {
      const filePath = path.join(dirname, fileName);
      return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
      console.error(`Ошибка чтения файла ${fileName}:`, err);
      return '';
    }
  }
  
  function getFilesInFolder(folderName) {
    try {
      const folderPath = path.join(dirname, folderName);
      return fs.readdirSync(folderPath)
        .filter(file => fs.statSync(path.join(folderPath, file)).isFile());
    } catch (err) {
      console.error(`Ошибка при получении списка файлов в папке ${folderName}:`, err);
      return [];
    }
  }
  
  
  app.get('/admin12', requireAuth, async (req, res) => {
    fs.readdir(__dirname, (err, files) => {
      if (err) {
        console.error('Ошибка чтения директории:', err);
        res.status(500).send('Ошибка чтения директории');
      } else {
        const filesList = files
          .filter(file => fs.statSync(path.join(__dirname, file)).isFile())
          .map(file => `<option value="${file}">${file}</option>`)
          .join('');
  
        const foldersList = files
          .filter(file => fs.statSync(path.join(__dirname, file)).isDirectory())
          .map(folder => `<option value="${folder}">${folder}</option>`)
          .join('');
  
        const adminPage = `
          <html>
            <head>
              <link rel="stylesheet" href="/styles.css">
              <script>
                function displayFolderContent(select) {
                  const selectedFolderName = select.value;
                  const fileSelect = document.getElementById('fileSelect');
                  fetch('/getFilesInFolder?folderName=' + selectedFolderName)
                    .then(response => {
                      if (response.status === 200) {
                        return response.json();
                      } else {
                        return [];
                      }
                    })
                    .then(files => {
                      fileSelect.innerHTML = files.map(file => \`<option value="\${file}">\${file}</option>\`).join('');
                      displayFileContent(fileSelect);
                    });
                }
  
                function displayFileContent(select) {
                  const selectedFileName = select.value;
                  const selectedFolderName = document.getElementById('folderSelect').value;
                  fetch('/getFileContent?folderName=' + selectedFolderName + '&fileName=' + selectedFileName)
                    .then(response => {
                      if (response.status === 200) {
                        return response.text();
                      } else {
                        return 'Файл не найден';
                      }
                    })
                    .then(data => {
                      const textarea = document.getElementById('fileContent');
                      textarea.value = data;
                    });
                }
              </script>
            </head>
            <body>
              <h1>Страница администратора</h1>
              <h2>Файлы</h2>          
              <form action="/update" method="POST">
                <select name="fileName" onchange="displayFileContent(this);" id="fileSelect">
                  ${filesList}
                </select>
                <h2>Папки</h2>
                <select name="folderName" onchange="displayFolderContent(this);" id="folderSelect">
                  ${foldersList}
                </select>
                <textarea id="fileContent" name="htmlCode" rows="10" cols="40"></textarea><br>
                <input type="submit" value="Сохранить">
              </form>
            </body>
          </html>
        `;
        res.send(adminPage);
      }
    });
  });
  
  app.get('/getFilesInFolder', (req, res) => {
    const folderName = req.query.folderName;
    if (folderName) {
      const filesInFolder = getFilesInFolder(folderName);
      res.json(filesInFolder);
    } else {
      res.status(400).send('Неверный запрос');
    }
  });
  
  app.get('/getFileContent', (req, res) => {
    const folderName = req.query.folderName;
    const fileName = req.query.fileName;
    if (folderName && fileName) {
      const fileContent = getFileContent(path.join(folderName, fileName));
      if (fileContent) {
        res.send(fileContent);
      } else {
        res.status(404).send('Файл не найден');
      }
    } else if (fileName) {
      const fileContent = getFileContent(fileName);
      if (fileContent) {
        res.send(fileContent);
      } else {
        res.status(404).send('Файл не найден');
      }
    } else {
      res.status(400).send('Неверный запрос');
    }
  });
  
  app.post('/update', (req, res) => {
    const folderName = req.body.folderName; // Получаем папку, если есть
    const fileName = req.body.fileName;
    const newFileContent = req.body.htmlCode;
    // нужно получить <select name="fileWithoutFolder"
  
    let filePath;
  
    if (folderName) {
      filePath = path.join(__dirname, folderName, fileName);
    } else {
      filePath = path.join(__dirname, fileName);
    }
  
    fs.writeFile(filePath, newFileContent, (err) => {
      if (err) {
        console.error(`Ошибка записи файла ${filePath}:`, err);
        res.status(500).send(`Ошибка записи файла ${filePath}`);
      } else {
        res.redirect('/user/private/admin');
      }
    });
  });
  
  /*  ------------ АДМИНКА ------------ */
  
  // GET_admin
  app.get('/user/private/admin', requireAuth, async (req, res) => {
    try {
      // Используем ipinfo.io для получения информации о реальном IP-адресе клиента
      const response = await axios.get('https://ipinfo.io', {
        headers: {
          'Accept': 'application/json'
        }
      });
  
      // Получаем IP-адрес из ответа
      const realIpAddress = response.data.ip;
  
      // Получаем информацию о пользователе, user-agent браузера и IP-адресе
      const userInfo = `Пользователь: ${req.session.username || 'неизвестно'}`;
      const userAgent = `User-Agent: ${req.headers['user-agent']}`;
      const ipAddress = `Реальный IP-адрес: ${realIpAddress || 'неизвестно'}`;
  
      const page = req.query.page || 1; // Получаем номер текущей страницы из запроса
      const startIndex = (page - 1) * itemsPerPage; // Вычисляем индекс начала отзывов для текущей страницы
      const endIndex = startIndex + itemsPerPage; // Вычисляем индекс конца отзывов для текущей страницы
      const totalPages = Math.ceil(reviews.length / itemsPerPage); // Общее количество страниц
  
      const displayedReviews = reviews.slice(startIndex, endIndex); // Отзывы для текущей страницы
  
      console.log(`Вы успешно вошли в админ-панель!\n${userInfo}\n${userAgent}\n${ipAddress}`);
  
      res.render('admin.ejs', {
        data: data,
        reviews: displayedReviews,
        totalPages: totalPages,
        currentPage: page,
      });
  
    } catch (error) {
      console.error(error);
      res.redirect('/error-page'); // Редирект в случае ошибки
    }
  });
  
  // страница авторизации
  app.get('/login/admin', (req, res) => {
    res.render('admin_login'); // Рендерим шаблон login.ejs
  });
  
  // Данные для входа 
  const validUsername = 'RobinMood';
  const validPasswordHash = '$2b$10$IDbmNkWzyQ8DcmNMzesbV.KYzi7zrfvOsIuQHoaFrxrnks2eQgRpC'; // Замените на новый хеш
  
  
  // Middleware для проверки авторизации
  function requireAuth(req, res, next) {
    if (req.session && req.session.isAuthenticated) {
      // Если пользователь авторизован, продолжаем выполнение следующих middleware или маршрутов
      next();
    } else {
      // Если пользователь не авторизован, перенаправляем на /login/admin
      res.redirect('/login/admin');
    }
  }
  
  // Middleware для обработки POST-запроса входа
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Проверяем имя пользователя
    if (username !== validUsername) {
      res.redirect('/login/admin');
      return;
    }
  
    try {
      // Сравниваем хеш пароля с введенным паролем
      const match = await bcrypt.compare(password, validPasswordHash);
  
      if (match) {
        // Если хеши совпадают, устанавливаем флаг аутентификации
        req.session.isAuthenticated = true;
        
        // Сохраняем имя пользователя в сессии
        req.session.username = username;
  
        res.redirect('/user/private/admin');
      } else {
        res.redirect('/login/admin');
      }
    } catch (error) {
      console.error(error);
      res.redirect('/error-page'); // Редирект в случае ошибки
    }
  });
  
  // Маршрут для разлогинивания
  app.get('/logout', (req, res) => {
    // Сбрасываем флаг аутентификации
    req.session.isAuthenticated = false;
    res.redirect('/login/admin');
  });
  
  
  
  
  // GET_revies
  app.get('/reviews', (req, res) => {
    res.render('reviews'); 
  });
  
  
  // Создаем массив для хранения отзывов
  const itemsPerPage = 30;
  const reviews = [];
  // Количество отзывов можно определить по длине массива
  let totalReviews = () => reviews.length;
  
  
  // Обработка отправки формы
  app.post('/reviews/reviews-show', (req, res) => {
    const userReview = req.body.review;
    const isActive = req.body.isActive; // Получаем выбор пользователя
  
    const currentDate = new Date();
  
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  
    // Добавляем отзыв и выбор пользователя в массив
    reviews.unshift({
      text: userReview,
      date: formattedDate,
      method: isActive,
      isPublished: false, // Добавляем флаг для определения опубликован ли отзыв
    });
  
    res.redirect('/reviews/reviews-show');
  });
  
  // Переместите этот маршрут после маршрута POST
  app.get('/reviews/reviews-show', (req, res) => {
    res.render('reviews-show', { reviews: reviews, new_reviews: new_reviews, isActive: req.query.isActive || '' }); // Передаем isActive из запроса или пустую строку
  });
  
  const new_reviews = [];
  app.post('/reviews/publish', (req, res) => {
    const userReview1 = req.body.review1;
    const userDate1 = req.body.date1;
    const userRating1 = req.body.rating1;
    const reviewIndex = req.body.reviewIndex;
  
    if (reviewIndex >= 0 && reviewIndex < reviews.length) {
      // Устанавливаем флаг isPublished для выбранного отзыва
      reviews[reviewIndex].isPublished = true;
    }
    
    new_reviews.unshift({
      text: userReview1,
      date: userDate1,
      method: userRating1,
    });
  
    res.redirect('/user/private/admin'); // Перенаправляем обратно на страницу админ-панели
  });
  
  
  app.post('/reviews/reject', (req, res) => {
    const reviewIndex = req.body.reviewIndex;
    
    // Устанавливаем флаг isRejected для отзыва по индексу
    if (reviewIndex >= 0 && reviewIndex < reviews.length) {
      reviews[reviewIndex].isRejected = true;
    }
  
    res.redirect('/user/private/admin'); // Перенаправляем обратно на страницу админ-панели
  });
  
  app.get('/reviews/get-more-reviews', (req, res) => {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const endIndex = startIndex + 10;
    const moreReviews = new_reviews.slice(startIndex, endIndex);
    res.json(moreReviews);
  });
  
  
  
  
  
  
  // GET_UST-CRYPTO (ОПЛАТА)
  app.get('/top-up/usdt-crypto', (req, res) => {
    const origin = req.session.origin;
    res.render('usdt_crypto', { origin });
  });
  
  app.get('/top-up/ltc-crypto', (req, res) => {
    const origin = req.session.origin;
    res.render('ltc_crypto', { origin }); 
  });
  
  app.get('/top-up/xrp-crypto', (req, res) => {
    const origin = req.session.origin;
    res.render('xrp_crypto', { origin }); 
  });
  
  // Обработка GET запросов 
  app.get('/reviews', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reviews.html'));
  });
  
  app.get('/guarantee', (req, res) => {
    res.render('guarantee');
  });
  
  app.get('/support', (req, res) => {
    res.render('support');
  });
  
  app.get('/faq', (req, res) => {
    res.render('faq'); 
  });
  
  app.get('/rules', (req, res) => {
    res.render('rules');
  });
  app.get('/terms-of-service', (req, res) => {
    res.render('tos');
  });
  app.get('/politcs-service', (req, res) => {
    res.render('polcon');
  });

module.exports = app;
