import { Meteor } from 'meteor/meteor';
import '../imports/api/users';
import {linksCollection} from "../imports/api/links";
import '../imports/startup/simpl-schema-configuration';
import {WebApp} from "meteor/webapp";


Meteor.startup(() => {

    WebApp.connectHandlers.use((req,res,next)=> {
        const _id = req.url.slice(1);
        const linkMatch = linksCollection.findOne({_id});
        if(linkMatch) {
            res.statusCode = 302;
            res.setHeader('Location', linkMatch.url);
            res.end();
            Meteor.call('links.trackVisit', _id);
        } else {
            next();
        }
    });

});
