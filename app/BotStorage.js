angular.module('app').service('BotStorage', function ($q) {
    var _this = this;
    this.data = [];

    this.findAll = function(callback) {
        chrome.storage.sync.get('Bot', function(keys) {
            if (keys.Bot != null) {
                _this.data = keys.Bot;
                for (var i=0; i<_this.data.length; i++) {
                    _this.data[i]['id'] = i + 1;
                }
                console.log(_this.data);
                callback(_this.data);
            }
        });
    }

    this.sync = function() {
        chrome.storage.sync.set({Bot: this.data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    }

    this.add = function (newContent,alignment) {
        var id = this.data.length + 1;
        var Bot = {
            id: id,
            content: newContent,
            class: alignment,
            completed: false,
            createdAt: new Date()
        };
        this.data.push(Bot);
        this.sync();
    }

    this.remove = function(Bot) {
        this.data.splice(this.data.indexOf(Bot), 1);
        this.sync();
    }

    this.removeAll = function() {
        this.data = [];
        this.sync();
    }

});