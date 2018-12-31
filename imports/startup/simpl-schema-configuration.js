import SimpleSchema from 'simpl-schema';
import {Meteor} from 'meteor/meteor';

SimpleSchema.defineValidationErrorTransform(e => {
    return  new Meteor.Error(400, e.message);;
});