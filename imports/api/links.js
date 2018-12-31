import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from "simpl-schema";
import shortid from "shortid";

export const linksCollection = new Mongo.Collection('links');
if(Meteor.isServer) {
    Meteor.publish('linksCollection', function () {
        const userId = this.userId;
        return linksCollection.find({userId});
    });
}

Meteor.methods({
    'links.insert'(url) {
        if(!this.userId) {
            //not logged in
            //throw the error
            throw new Meteor.Error('not-authorised');
        }


        new SimpleSchema({
            url: {
                type:String,
                label:"Your link",
                regEx:SimpleSchema.RegEx.Url
            }
        }).validate({url});

        linksCollection.insert({
            _id: shortid.generate(),
            url,
            userId:this.userId,
            visible:true,
            visitedCount:0,
            lastVisitedAt:null
        })
    },
    'links.setVisibility'(_id, visible) {
        if(!this.userId) {
            throw new Meteor.Error('not-authorised');
        }

        new SimpleSchema({
            _id: {
                type:String,
                min:1,
                label:"Your link _id"
            },
            visible: {
                type:Boolean,
                label: "The visible flag"
            }
        }).validate({_id, visible});

        linksCollection.update({_id, userId:this.userId}, {$set:{visible}})
    },
    'links.trackVisit'(_id) {

        new SimpleSchema({
            _id: {
                type:String,
                min:1,
                label:"Your link _id"
            }
        }).validate({_id});

        linksCollection.update({_id}, {
            $set:{
            lastVisitedAt:new Date().getTime()
            },
            $inc:{
            visitedCount:1
            }
        })
    }

});

