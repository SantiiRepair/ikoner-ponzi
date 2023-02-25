import TronWeb from 'tronweb';
import ora from 'ora';
import Users from "../models/UserModel.js";
import Rechge from "../models/RechargeModel.js";

// Recharges -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Hash: 861b46977e18caa7700b7b99c0de825d8943c9ce0c08f4e04680259b1512922d
// Hash: 94f7eeea182b28a7e62f322a7c6bb71ad50e7ee3222229849731274594d09903

export const Recharge = async (req, res) => {
 
   
   const load = ora({
     color: 'green',
     hideCursor: true
   }).start();
   const { username, balance, userId, hash, amount } = req.body;
   const txid = hash.length;
   const status = "Success";
   const minimun = 6;
   const amountAll = req.body.amount * 1000000;
   const receiver = process.env.RECEIVER;
   const network = "shasta";
   let url = null 
    if (network === "shasta") {
      url = "https://api.shasta.trongrid.io";
    } else if (network === "nile") {
      url = "https://nile.trongrid.io";
    } else if(network === "mainnet") {
      url = "https://api.trongrid.io";
    }
    
    const can = await ( minimun <= amount );
      if(!can) return res.status(400).json({msg: "Very Low Amount"});
       if(Math.round(amount) != amount) {
       return res.status(403).json({msg: "Only Number Integer"});
    }
    const verifyHash = await ( 64 <= txid );
      if(!verifyHash) {
      return res.status(404).json({msg: "The Hash Is Invalid"});
    }
    const validateHash = await Rechge.findOne({ where: { hash: hash } });
      if(validateHash) {
       return res.status(401).json({msg: "The Hash In System"});
    } else {
  

   try {
      
    console.log("Checking Recharge...");   
       const tronWeb = new TronWeb({
       fullHost: url
       });

       const verifyTx = await tronWeb.getEventByTransactionID(hash); 
       const addressBs58 = tronWeb.address.fromHex(verifyTx[0].result.to);
        
       if(receiver != addressBs58) {
        return res.status(403).json({msg:"Transfer Be Invalid"});
     } if(amountAll != verifyTx[0].result.value) {
        return res.status(401).json({msg:"Amount Be Invalid"});
             
      }

  
    await Rechge.create(
      {
         username: username,  
         hash: hash,
         amount: amount,
         status: status
      });
    load.succeed("Has been checked!");

    const updateBalance = await( balance + parseInt(amount) );
    await Users.update(
       {
         balance: updateBalance
       },
       {
        where:{
         id: userId
       }
    });
       load.succeed("Success Operation!");
       return res.status(200).json({msg: "Success Operation"});
  
    } catch (error) {
      console.log(error);
      res.status(400).json({msg:"Operation Failed"});
      };      
   }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
