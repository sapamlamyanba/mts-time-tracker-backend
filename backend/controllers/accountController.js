const accountModal = require("../models/accountModels");


const createAccountController = async (req, res) => {
    try {
        const { accountName, accountDomain } = req.body;
        const createAccount = new accountModal({
            accountName,
            accountDomain
        })
        const savedAccount = await createAccount.save();
        res.status(201).send({
            message: 'Successful Create Account',
            success: true,
            account: savedAccount
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while applying',
        });
    }
}

const getAccountController = async(req, res) => {
    try {
        const accounts = await accountModal.find();
        res.status(200).send({
            success:true,
            accounts: accounts
        })
    } catch (error) {
        console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while fetching projects',
    });
    }
}

const getAccountDetatilsController = async (req,res)=> {
    try{
        const {accountId} = req.params;
        if(!accountId){
            console.error('Project ID is required');
            return res.status(400).json({
                success: false,
                message:'Account ID is required'
            })
        }
        const accountDetails = await accountModal.findById(accountId);
        if(!accountDetails){
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            })
        }
        res.status(200).json({
            success: true,
            data:accountDetails
        })
    }catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).json({ success: false, error, message: 'Error fetching project details' });
      }
}

const deleteAccountController = async(req, res) => {
    try {
        const {accountId} = req.params;
        const existingAccount = await accountModal.findById(accountId);
        if(!existingAccount){
            return res.status(404).send({
                success: false,
                message:'Account not found',
            })
        }

        await accountModal.findByIdAndDelete(accountId);
        res.status(200).send({
            success: true,
            message: 'Account deleted successfully',
        })
    } catch (error) {
        console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while deleting project',
    });
    }
}

module.exports = {
    getAccountController, createAccountController,deleteAccountController,
    getAccountDetatilsController
}