import child_process from 'child_process';

export const getDailyFromGithub = ()=>{
    child_process.execSync(`cd ${__dirname}/../store/doc && git pull origin master`);
}

export const updateDailyToGithub = (time)=>{
    child_process.execSync(`cd ${__dirname}/../store/doc && git commit -a "${time}" | git push origin master`);
}
