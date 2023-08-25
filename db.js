import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await sqlite.open({
    filename: './data_plan.db',
    driver: sqlite3.Database
});


// await db.migrate();

// add greetng to the table
export async function addPricePlans(plan_name, sms_price, call_price) {

    //sql statement type - insert
    await db.run(`insert into price_plan (plan_name, sms_price, call_price) values (?, ?, ?)`, [plan_name, sms_price, call_price]);

}

export async function getPricePlans() {
    const result = await db.all(`select * from price_plan`);
    return result
}

const result = await getPricePlans()
console.log(result)


//delete by id
export async function deletePricePlans(id) {
    const sql = `delete from price_plan where id = ?`
    await db.run(sql, [id])
}



export async function updatePricePlans(plan_name, sms_price, call_price, id) {
    const sql = `update price_plan set plan_name= ?, sms_price=?, call_price=? where id= ?`
    await db.run(sql, [plan_name, sms_price, call_price, id])
}


export async function totalPhoneBill(actions, plan_name) {
    const sql = 'select sms_price, call_price from price_plan where plan_name = ?';
    const result = await db.all(sql, [plan_name]);
   
  
    let l = actions.split(",");
    var cost = 0;
    const callCost = result[0].call_price;
    const smsCost = result[0].sms_price;
    
    for (var name of l) {
      if (name.includes("call")) {
        cost += callCost;
      } else {
        cost += smsCost;
      }
    }
  
     return cost.toFixed(2);
}
