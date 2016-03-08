OfbPubSub is a javascript library to implement better publishing subscriber technology. This library is constructed using plain Javascript, so there is no other dependency for using this library.

Public End Api's

1. To subscribe for a channel
-  var subscriptionId = OfbPubSub.subscribe('channel1', subscriber);

where,
	channel1 - is name of channel which you want to subscribe for
	subscriber - is a function, which will execute when some message publish on the channel

//example of subscriber function

var subscriber = function(channel, messageObj) {
	console.log(channel, messageObj);
};

---------------------------------------------------------

2. To publish some message in particular channel
-  OfbPubSub.publish('channel1', messageObj);

where,
	channel1 - is a name of channel where you want to broadcast your message
	messageObj - is a message, it can be text or simple object

---------------------------------------------------------

3. To unsubscribe from channel using subscriptionID
- OfbPubSub.unsubscribe(subscriptionId);

where,
	subscriptionId - is the channel unique ID, which your get while subscribing for that channe (refer to API 1)

---------------------------------------------------------

4. To unsubscribe from channel using channel name
- OfbPubSub.unsubscribe('channel1');

where,
	channel1 - is the name of a particular channel

--------------------------------------------------------

5. To unsubscribe all subscription of a subscriber method
- OfbPubSub.unsubscribe(subscriber);

where,
	subscriber - is a subscriber function

--------------------------------------------------------

6. To unsubscribe all subscriptions
- OfbPubSub.unsubscribeAll();

It will remove all the channels you subscribed for


/*******************************************************************************************************************

********************** A small UI is generated for showing the use case of this library ****************************

********************************************************************************************************************/

You will see the screen is divided into two segments, subscriber and publisher.

1. How to create subscriber?
- Enter the channel name for which you want to subscribe for, and hit submit it will create a channel into the system if its not already there.

2. Where can I see all the current channels I subscribed for?
- On your left hand side, there will be a list of all the channels you subscribed for

3. How to unsubscribe for particular channel?
- There will be (X) sign on the right hand side of each channel in the list, press that and it will unsubscribe you for that channel.

4. How can I unsubscribe from all the channels?
- There is a red colour button namely, 'UnsubscribeaAll', press that and it will unsubscribe you from all the current channels you are listening for.

5. How can I publish message on particular channel?
- On publisher screen, enter your messgae/data in input field, select the channel in which you want to broadcast your message/data from the drop down list of available channels and press publish. It will broadcast your message into that channel.