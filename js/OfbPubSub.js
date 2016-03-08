;(function(global) {
	'use strict';

	var OfbPubSub = {};

	var channels = {};

	var lastID = -1;

	function hasChannel(obj) {
		var key;

		for (key in obj) {
			if ( obj.hasOwnProperty(key) ) {
				return true;
			}
		}
		return false;
	}

	function throwException(ex) {
		return function throwErrorException() {
			throw ex;
		};
	}

	function pushToSubscriber(subscriber, channel, data) {
		try {
			subscriber(channel, data);
		} catch( ex ){
			setTimeout(throwException(ex), 0);
		}
	}

	function publishMessage(channel, data) {
		return function postPublishedMessage() {
			
			var subscribers = channels[channel];

			if ( !channels.hasOwnProperty( channel ) ) {
				return;
			}

			for (var s in subscribers) {
				if (subscribers.hasOwnProperty(s)) {
					pushToSubscriber(subscribers[s], channel, data);
				}
			}

		};
	}

	function channelHasSubscribers(channel) {
		var channel = String(channel);
		var found = Boolean(channels.hasOwnProperty(channel) && hasChannel(channels[channel]));

		return found;
	}

	/*********************************************************************************************
		OfbPubSub.publish( channelName, dataObj )
		- channelName (String): The channel to subscribe to
		- dataObj: The data object that is to be published
	*********************************************************************************************/

	OfbPubSub.publish = function(channel, data) {
		if(!channel) {
			throw 'Invalid Channel';
		}
		if(!data) {
			throw 'Invalid Message';
		}
		var post = publishMessage( channel, data );

		var	hasSubscribers = channelHasSubscribers( channel );

		if (!hasSubscribers) {
			return false;
		}

		post();

		return true;
	};

	/*********************************************************************************************
		OfbPubSub.subscribe( channelName, func )
		- channelName (String): The channel to subscribe to
		- func (Function): The function to call when a new data is published for this channel
	*********************************************************************************************/
	OfbPubSub.subscribe = function(channel, func) {
		if(!channel) {
			throw 'Invalid Channel Name';
		}

		if ( typeof func !== 'function'){
			return false;
		}

		// if channel is not registered
		if (!channels.hasOwnProperty(channel)) {
			channels[channel] = {};
		} else {
			return false;
		}

		var ID = 'cid_' + String(++lastID);
		channels[channel][ID] = func;

		// return subscriber ID for unsubscribing particular channel
		return ID;
	};


	/************************************************
		OfbPubSub.unsubscribeAll()
		Clears all channel subscriptions		
	************************************************/
	OfbPubSub.unsubscribeAll = function() {
		channels = {};
	};


	/***************************************************************************
		OfbPubSub.unsubscribe() : removes channel subscriptions.
		When passed a subscription ID, removes a specific subscription.
		When passed a function, removes all subscriptions for that function
		When passed a channel, removes all subscriptions for that channel
		
		value - A subscription ID, function or channel to unsubscribe.
	**************************************************************************/
	OfbPubSub.unsubscribe = function(value) {
		var isTopic    = typeof value === 'string' && channels.hasOwnProperty(value);
		var isID    = !isTopic && typeof value === 'string';
		var isFunction = typeof value === 'function';
		var	result = false;
		var channel;

		if(isTopic){
			delete channels[value];
			return;
		}

		for(var c in channels){
			if ( channels.hasOwnProperty( c ) ) {
				channel = channels[c];

				if(isID && channel[value]) {
					delete channel[value];
					result = value;
					break;
				}

				if(isFunction) {
					for ( var f in channel ){
						if (channel.hasOwnProperty(f) && channel[f] === value){
							delete channel[f];
							result = true;
						}
					}
				}
			}
		}

		return result;
	};

	// attach our OfbPubSub object to global (outside) world to use
	global.OfbPubSub = OfbPubSub;
}(window));