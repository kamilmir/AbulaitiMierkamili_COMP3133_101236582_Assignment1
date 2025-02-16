var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const { graphql, buildSchema } = require('graphql');

var indexRouter = require('./routes/index');
const { schema: graphqlSchema, resolvers } = require('./schemas/index');

var app = express();

require('dotenv').config()
require('./common/connection')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors( {
  origin: '*',
}))

// Construct a schema, using GraphQL schema language
const schema = buildSchema(graphqlSchema);

// The root provides a resolver function for each API endpoint
const root = {
  hello: ({name}) => {
    return {
      message: 'Hello ' + name,
      timestamp: new Date().toISOString()
    };
  },
  signup: () => {
    return {
      username: 'test',
      email: 'test'
    }
  }
};

app.post('/graphql', async (req, res, next) => {
  try {
    const { query, variables } = req.body;
    const result = await graphql({
      schema,
      source: query,
      rootValue: resolvers,
      variableValues: variables,
    });
    if (result.errors) {
      return res.status(400).json({
        message: result.errors[0].message
      });
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
});

app.get('/', (req, res) => {
  res.json({
    status: 'true',
    message: 'Welcome to 101236582-comp3123-assignment1'
  })
})
app.use('/api/v1', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 400);
  res.json({
    status: 'false',
    message: err.message
  });
});

module.exports = app;
