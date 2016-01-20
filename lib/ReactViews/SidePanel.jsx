'use strict';
var React = require('react');
var SearchBox = require('./SearchBox.jsx');
var ModalTriggerButton = require('./ModalTriggerButton.jsx');
var Legend = require('./Legend.jsx');
var renderAndSubscribe = require('./renderAndSubscribe');

var btnAdd = 'Add Data';
var btnRemove = 'Remove All';

// the sidepanel
// TO DO:  rename this into workbench
// This get re-rendered when nowViewingItem changes
var SidePanel = React.createClass({
    propTypes: {
        terria: React.PropTypes.object
    },

    getInitialState: function() {
        return {
            notSearching: true
        };
    },

    removeAll: function() {
        this.props.terria.nowViewing.removeAll();
    },

    searchStart: function(_notSearching){
        this.setState({
            notSearching: _notSearching
        });
    },

    render: function() {
        return renderAndSubscribe(this, function() {
            var terria = this.props.terria;
            var nowViewing = this.props.terria.nowViewing.items;
            var content = null;

            if ((nowViewing && nowViewing.length > 0) && this.state.notSearching === true) {
                content = (
                <div className="now-viewing hide-if-searching">
                    <ul className="now-viewing__header list-reset clearfix">
                        <li className='col col-5'><label className='label'> Data Sets </label></li>
                        <li className='col col-5'><button onClick={this.removeAll} className='btn'>{btnRemove}</button></li>
                        <li className='col col-2'><label className='label-badge label'> {nowViewing.length} </label></li>
                    </ul>
                    <ul className="now-viewing__content list-reset">
                        {nowViewing.map((item, i)=>(<Legend nowViewingItem={item} key={i} />))}
                    </ul>
                </div>);
            }
            return (
                <div>
                <div className='workbench__header'>
                <SearchBox terria={terria} dataSearch={false} callback={this.searchStart}/>
                <div><ModalTriggerButton btnHtml={btnAdd} classNames = 'now-viewing__add' activeTab={1} /></div>
                </div>
                {content}
            </div>);
        });
    }
});
module.exports = SidePanel;
