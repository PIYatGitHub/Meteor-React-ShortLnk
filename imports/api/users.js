import {Accounts} from "meteor/accounts-base";
import {Meteor} from "meteor/meteor";
import SimpleSchema from "simpl-schema";

Accounts.validateNewUser((user)=>{
    const email = user.emails[0].address;

    new SimpleSchema({
        email: {
            type:String,
            regEx:SimpleSchema.RegEx.Email
        }
    }).validate({email});

    console.log("the user:...", user);
    return true;
});
