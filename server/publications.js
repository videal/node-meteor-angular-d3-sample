Meteor.publish('rates', function() {
   return Rates.find(); 
});
// Will publish only rates for last 24 hours
var timeStamp = new Date().getTime();
var interval = (24 * 60 * 60 * 1000); // Hours * minutes * seconds * milliseconds
timeStamp -= interval;
var criterion = {
    time: {
        $gt: timeStamp
    }
};
Meteor.publish('rate-1', function() {
    return Rate1.find(criterion);
});
Meteor.publish('rate-2', function() {
    return Rate2.find(criterion);
});
Meteor.publish('rate-3', function() {
    return Rate3.find(criterion);
});
Meteor.publish('rate-4', function() {
    return Rate4.find(criterion);
});
Meteor.publish('rate-5', function() {
    return Rate5.find(criterion);
});
