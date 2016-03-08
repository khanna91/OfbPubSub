/************************************************

This script is simply used for DOM Manipulation.
It is depended on OfbPubSub library.

************************************************/

;(function($) {

	// this action is used to create new subscriber channel
	$('#createChannelBtn').on('click', function(e) {
		e.preventDefault();
		var channelName = $('#createChannel').val();
		channelName = $.trim(channelName);

		// check whether channel name is not empty or undefined
		if(channelName == undefined || channelName.length == 0) {
			throw "Channel Name is required";
			return false;
		}

		if(channelName.length > 30) {
			alert('Channel Name cannot be more than 30 characters');
			throw "Channel length exceeded";
			return false;
		}

		// else subscribe for a channel
		var subscriber = function( channel, messageObj ){
			var newHtml = '<div class="alert alert-warning"><strong><em>'+channel+'</em></strong> : <span class="wrap">'+messageObj+'</span></div>';
			$('#alerts').append(newHtml);
		    console.log( channel, messageObj );
		};

		// getting subscription ID, so that later on new operations can be performed over this channel
		var subscriptionID = OfbPubSub.subscribe(channelName, subscriber);

		// resetting of form
		document.getElementById("subscriber").reset();

		if(subscriptionID) {
			// displaying list of subscribed channels
			var newHtml = '<li>'+channelName+' <a href="#" class="unsubscribe" data-subscription="'+subscriptionID+'" data-channel="'+channelName+'">&times;</a></li>';

			$('#channelList #none').hide();

			$('#channelList').append(newHtml);

			newHtml = '<option value="'+channelName+'" data-channel="'+channelName+'">'+channelName+'</option>';
			$('#publishChannel').append(newHtml);
		}
	});

	// this action is used to unsubscribe the channel with subscriptionID
	$(document).on('click', '.unsubscribe', function(e) {
		e.preventDefault();
		var that = $(this);
		var subscriptionID = that.attr('data-subscription');
		var channel = that.attr('data-channel');
		if(!subscriptionID) {
			throw 'Invalid Subscription';
		}
		OfbPubSub.unsubscribe(subscriptionID);
		that.parent().remove();
		$('#publishChannel').find('option[data-channel="'+channel+'"]').remove();
	});

	// this action is used to unsubscribe all the channels
	$('#unsubscribeAll').on('click', function(e) {
		e.preventDefault();
		OfbPubSub.unsubscribeAll();
		$('#channelList li').not(':first-child').remove();
		$('#channelList li#none').show();
		$('#publishChannel').empty();
	});

	// this action is used to publish message into particular channel
	$('#publishBtn').on('click', function(e) {
		e.preventDefault();
		var channel = $('#publishChannel').val();
		var message = $.trim($('#data').val());
		if(!channel) {
			throw "Invalid Channel";
		}
		if(message == undefined || message.length == 0) {
			throw "Message is required";
		}
		OfbPubSub.publish(channel, message);
		document.getElementById("publisher").reset();
	});

}(jQuery));