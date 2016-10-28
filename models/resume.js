'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//enums
// var departments = 'dev hr op admin'.split(' ');
var genders = '男 女'.split(' ');
var activeStates = '在职 离职'.split(' ');
var maritalStatus = '未婚 已婚未育 已婚已育'.split(' ');
var insuranceName = '医疗 养老 失业 工伤 生育 住房 其他'.split(' ');
var categorys = '统招 自考 成考 民办 函授 其他'.split(' ');
var positions = 'client server android ios'.split(' ');
var resumeStates = 'new hired leaved'.split(' ');

//valications
var maxSalary = [30000, 'The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).'];

/**
 * [personalInfoSchema description]
 * authoe
 * @type {Schema}
 */
/**
 * [personalInfoSchema description]
 * @type {Schema}
 */
var personalInfoSchema = new Schema({
  name: {type: String},
  sex: {type: String, enum: genders},
  birthday: {type: Date},
  nationality: String,
  nativePlace: String,
  domicilePlace: String,
  marital: {type: String, enum: maritalStatus},
  email: {type: String},
  mobile: {type: String, minlength: 11, maxlength: 11},
  constellation: String,
  bloodType: String,
  englishBand: String,
  address: {type: String},
  availableDate: Date,
  friendInCompany: {
    name: String,
    relationShip: String
  }
});

var ResumeSchema = new Schema({
  department: {type: String},
  position: {type: String},
  date: { type: Date, default: Date.now },
  activeState: {type: String, enum: activeStates},
  personalInfo: personalInfoSchema,
  /*profile:{
    name: String,
    sex: String,
    birthday: Date,
    nationality: String,
    nativePlace: String,
    domicilePlace: String,
    maritalStatus: String,
    email: String,
    mobile: String,
    constellation: String,
    bloodType: String,
    englishBand: String,
    address: String,
    availableDate: Date,
    friendsOrRelativesEmployed: {
      name: String,
      relationShip: String
    }
  },*/
  education: [{
    duration:{
      start: Date,
      end: Date
    },
    organization: {type: String},
    major: {type: String},
    degree: {type: String},
    category: {type: String, enum: categorys}
  }],
  experience: [{
    duration:{
      start: Date,
      end: Date
    },
    company: {type: String},
    department: {type: String},
    title: {type: String},
    salary: String,
    reason: String,
    reference: {
      name: String,
      position: String,
      phone: String
    }
  }],
  salary:{
    base: {type: Number},
    welfare: Number,
    bonus: Number,
    accepted: {type: Number, max: maxSalary}
  },
  performance: [
    String
  ],
  family:[{
    name: String,
    relationship: String,
    company: String,
    title: String,
    phone: String
  }],
  insurance: [
    {type: String, enum: insuranceName}
  ],
  confirmed: {type: Boolean},
  resumeState: {type: String, enum: resumeStates},
  other: {
    feature: String,
    comment: String
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);
