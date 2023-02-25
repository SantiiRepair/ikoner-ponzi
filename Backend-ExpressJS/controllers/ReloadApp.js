import nodeCron from 'node-cron';
import Users from "../models/UserModel.js";
import ora from 'ora';

const reloadData = async () => {
   
    const load = ora({
       color: 'green',
       hideCursor: true
    }).start();
   
  try {
    await Users.update({ daily: null }, {
       where: { 
        daily: [1, 2]
    }
    });
    load.succeed('Tasks has been restart!');
    await Users.update({ vip: null, levelTime: null}, {
      where: { 
       levelTime: 1
     }
    });
    load.succeed('Delete who expire level!');
    await Users.decrement({ levelTime: 1}, {
      where: { 
       levelTime: [2, 3, 4, 5, 6, 7]
     }    
    });
    load.succeed('Substract level today!');
   } catch(error) {
      console.log(error);
  }
}

 const reloadApp = async () => {

    const load = ora({
       color: 'green',
       hideCursor: true
    }).start();

 try {
  load.succeed('Running cronjob...');
   await nodeCron.schedule("0 59 19  * * *", reloadData, {
    schedule: true,
    timezone: 'America/Caracas'
   }).start();
   } catch(error) {
      console.log(error);
  }
}

export default reloadApp;
