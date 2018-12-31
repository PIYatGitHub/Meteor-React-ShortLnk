import React from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from "clipboard";
import moment from "moment";

export default class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied:false
        }
    }
    componentDidMount() {
     this.clipboard = new Clipboard(this.refs.copy);

     this.clipboard.on('success', () => {
         this.setState({justCopied:true});
         setTimeout( () => {
             this.setState({justCopied:false});
         },1000);
         console.log('It worked!!!')
     }).on('error', () => {
         this.state.justCopied = false;
         console.log('unable to copy... please copy manually')
     })

    }

    componentWillUnmount () {
     this.clipboard.destroy();
    }
    renderStats() {
        const visitMsg = this.props.visitedCount ===1? "visit": "visits";
        let visitedMsg = null;

        if(typeof this.props.lastVisitedAt === 'number') {

            visitedMsg = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
        }

        return(
            <p className="item__message"> {this.props.visitedCount} {visitMsg} {visitedMsg}</p>
        );
    }

    render() {


        return (
            <div className="item">
                <h2> {this.props.url}</h2>
                <p className="item__message"> {this.props.shortUrl}</p>
                {this.renderStats()}
                <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit </a>
                <button className="button button--pill" ref="copy" data-clipboard-text = {this.props.shortUrl}> {this.state.justCopied? "Copied" : "Copy"} </button>
                <button className="button button--pill" ref="hide" onClick={() => {
                    Meteor.call('links.setVisibility',
                        this.props._id, !this.props.visible)
                }}> {this.props.visible? "Hide" : "Unhide"} </button>
                {/*<div> {this.renderLinkListItems()}</div>*/}
            </div>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
};
