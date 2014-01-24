Rates = new Meteor.Collection('rates');
Rates.registerRate = function(name, modelName) {
    Meteor.subscribe(name);
    var model = new Meteor.Collection(name);
    return model;
};
Rate1 = Rates.registerRate('rate-1', 'Rate1');
Rate2 = Rates.registerRate('rate-2', 'Rate2');
Rate3 = Rates.registerRate('rate-3', 'Rate3');
Rate4 = Rates.registerRate('rate-4', 'Rate4');
Rate5 = Rates.registerRate('rate-5', 'Rate5');