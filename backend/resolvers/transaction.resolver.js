import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query:{
    transactions:async (_, args, context) =>{
      try{
        if(!context.getUser())throw new Error("unauthorized");
        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({userId:userId})

        return transactions
      }catch(err){
        console.error("Error getting transactions", err);
        throw new Error(err.message || "Internal Server Error");
      }
    },
    transaction: async(_, args) =>{
        try{
         const transaction = await Transaction.findById(args.transactionId);

         return transaction
        }catch(err){
           console.error("Error getting transactions", err);
           throw new Error(err.message || "Internal Server Error");
        }
    },
  },
  Mutation:{
    createTransaction: async(_, {input}, context) =>{
        try{
          const newTransaction = new Transaction({
                ...input,
                userId:context.getUser()._id
          })
          await newTransaction.save();
          return newTransaction;
        }catch(err){
           console.error("Error creating transactions", err);
           throw new Error(err.message || "Internal Server Error");
        }
    },
    updateTransaction: async(_, {input}) =>{
        try{
          const updateTransaction = await Transaction.findByIdAndUpdate(input.transactionId,input,{new:true});
          return updateTransaction;
        }catch(err){
          console.error("Error updating transactions", err);
          throw new Error(err.message || "Internal Server Error");
        }
    },
    deleteTransaction: async(_, args) =>{
        try{
          const deleteTransaction = await Transaction.findByIdAndDelete(args.transactionId);
          return deleteTransaction;
        }catch(err){
        console.error("Error deleting transactions", err);
        throw new Error(err.message || "Internal Server Error");
        }
    },
  }
}

export default transactionResolver;