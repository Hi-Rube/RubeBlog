'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateDailyToGithub = exports.getDailyFromGithub = undefined;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getDailyFromGithub = exports.getDailyFromGithub = () => {
    _child_process2.default.execSync(`cd ${ __dirname }/../store/doc && git pull origin master`);
};

const updateDailyToGithub = exports.updateDailyToGithub = time => {
    _child_process2.default.execSync(`cd ${ __dirname }/../store/doc && git commit -a "${ time }" | git push origin master`);
};