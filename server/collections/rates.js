Rates = new Meteor.Collection('rates');
Rates.registerRate = function(name, modelName) {
    var model = new Meteor.Collection(name);
    if (0 === this.find({name: name}).count()) {
        console.log('Registering the ' + name + ' rate');
        this.insert({
            name: name,
            model: modelName
        });
    }
    return model;
};
Rate1 = Rates.registerRate('rate-1', 'Rate1');
Rate2 = Rates.registerRate('rate-2', 'Rate2');
Rate3 = Rates.registerRate('rate-3', 'Rate3');
Rate4 = Rates.registerRate('rate-4', 'Rate4');
Rate5 = Rates.registerRate('rate-5', 'Rate5');