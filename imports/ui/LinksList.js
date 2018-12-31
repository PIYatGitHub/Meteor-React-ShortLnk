import React from 'react';
import {linksCollection} from "../api/links";
import {Tracker} from "meteor/tracker";
import {Meteor} from 'meteor/meteor';
import LinksListItem from "./LinksListItem";
import {Session} from "meteor/session";
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            links:[]
        }
    }
    componentDidMount() {
        // gets called right after the component is shown to the screen
        // this is how we will get the data because now we have routes and we cannot
        // use Tracker.autorun()...
        console.log('Component did fire --- Link list');
        this.linksTracker = Tracker.autorun(() =>{
            Meteor.subscribe('linksCollection');
            const links = linksCollection.find({visible:Session.get('showVisible')}).fetch();
            this.setState({links});
        });
    }

    componentWillUnmount () {
        //only fires when we are about to remove the item...
        console.log('Component did unmount @@@ Link list');
        this.linksTracker.stop();
    }

    renderLinkListItems() {
        if(this.state.links.length ===0) {
            return (
                <div className="item">
                    <p className="item__status-message"> No links found... </p>
                </div>
            );

        }


        return this.state.links.map ((link)=>{
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key = {link._id} {...link} shortUrl = {shortUrl}/>
        });
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight = {true}>
                    {this.renderLinkListItems()}
                </FlipMove>
            </div>
        );
    }
}