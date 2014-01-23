var insertRate = Meteor.bindEnvironment(function(model, item) {
    console.log(item);
    model.insert(item);
});
var generateRate = function(model, time) {
    crypto.randomBytes(1, function(error, buffer) {
        if (error) {
            throw error;
        }
        var item = {
            time: time,
            value: buffer[0]
        };
        insertRate(model, item);
    });
};
Meteor.setInterval(function() {
    console.log('Generated rates:');
    var timeStamp = new Date().getTime();
    generateRate(Rate1, timeStamp);
    generateRate(Rate2, timeStamp);
    generateRate(Rate3, timeStamp);
    generateRate(Rate4, timeStamp);
    generateRate(Rate5, timeStamp);
}, 2000);