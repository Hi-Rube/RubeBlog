import fs from 'fs';
import {getDailyFromGithub} from './script';
var markdown = require( "markdown" ).markdown;

export default (router)=>{
    router.get('/timeline', function *(){
        yield this.render('./index');
    });
    
    router.get('/daily/full', function *(){
        let time = this.query.time;

        try{
            let p = `${__dirname}/../store/doc/daily/${time}`,
                stats = fs.statSync(p);

            if (stats.isDirectory()){
                this.body = markdown.toHTML(fs.readFileSync(`${p}/r.md`).toString());
            } 

        } catch (e){
            this.status =500;
        }
    });

    router.get('/getDailyFromGithub', function *(){
        try{
            script.getDailyFromGithub();
            this.body = 'ok';
        } catch(e){
            this.bodu = 'error';
        }
    });

    return router;
}