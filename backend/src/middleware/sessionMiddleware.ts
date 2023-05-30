import expressSession from 'express-session';

const session = () => expressSession({
  secret: 'rockai nema penaze na boty',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

export default session;
