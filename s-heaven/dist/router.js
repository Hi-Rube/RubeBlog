'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _script = require('./script');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var markdown = require("markdown").markdown;

exports.default = router => {
    router.get('/timeline', function* () {
        yield this.render('./index');
    });

    router.get('/daily/full', function* () {
        let time = this.query.time;

        try {
            let p = `${ __dirname }/../store/doc/daily/${ time }`,
                stats = _fs2.default.statSync(p);

            if (stats.isDirectory()) {
                this.body = markdown.toHTML(_fs2.default.readFileSync(`${ p }/r.md`).toString());
            }
        } catch (e) {
            this.status = 500;
        }
    });

    router.get('/getDailyFromGithub', function* () {
        try {
            (0, _script.getDailyFromGithub)();
            this.body = 'ok';
        } catch (e) {
            this.body = 'error';
        }
    });

    return router;
};

module.exports = exports['default'];