/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /resumes              ->  index
 * POST    /resumes              ->  create
 * GET     /resumes/:id          ->  show
 * PUT     /resumes/:id          ->  update
 * DELETE  /resumes/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Resume = require('../models/resume');

// Get list of resumes
exports.index = function(req, res) {

  var query = Resume.find();
  var countQuery = Resume.count();

  // if(req.query.name) query.where('personalInfo.name').equals(req.query.name);
  if(req.query.name) {
    query.regex('personalInfo.name',new RegExp(req.query.name, 'i'));
    countQuery.regex('personalInfo.name',new RegExp(req.query.name, 'i'));
  }
  // if(req.query.department) query.where('department').equals(req.query.department);
  if(req.query.department) {
    query.regex('department',new RegExp(req.query.department, 'i'));
    countQuery.regex('department',new RegExp(req.query.department, 'i'));
  }

  query.limit(parseInt(req.query.limit));
  query.skip(req.query.limit*req.query.page-req.query.limit);

  query.exec(function (err, resumes) {
    if(err) { return handleError(res, err); }
    // return res.json(200, resumes);
    countQuery.exec(function(err, count) {
      res.set('itemCount', count);
      return res.json(200, resumes);
    });
  });
  // Resume.find({'personalInfo.name': req.query.name, 'department': req.query.department}, function (err, resumes) {
  //   console.log(req.query)
  //   if(err) { return handleError(res, err); }
  //   return res.json(200, resumes);
  // });
};

exports.findByDepartment = function(req, res) {
  console.log(req.params.id);
  /*var conditions = {
    'department':req.params.department,
  };*/
  Resume.find({'department':req.params.department},function (err, resumes) {
    if(err) { return handleError(res, err); }
    return res.json(200, resumes);
  });
};

// Get a single resume
exports.show = function(req, res) {
  console.log(req.params.id);
  Resume.findById(req.params.id, function (err, resume) {
    if(err) { return handleError(res, err); }
    if(!resume) { return res.send(404); }
    return res.json(resume);
  });
};

// Creates a new resume in the DB.
exports.create = function(req, res) {
  console.log(req.body);
  Resume.create(req.body, function(err, resume) {
    if(err) { return handleError(res, err); }
    return res.json(201, resume);
  });
};

// Updates an existing resume in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Resume.findById(req.params.id, function (err, resume) {
    if (err) { return handleError(res, err); }
    if(!resume) { return res.send(404); }
    var updated = _.merge(resume, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, resume);
    });
  });
};

// Deletes a resume from the DB.
exports.destroy = function(req, res) {
  Resume.findById(req.params.id, function (err, resume) {
    if(err) { return handleError(res, err); }
    if(!resume) { return res.send(404); }
    resume.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
