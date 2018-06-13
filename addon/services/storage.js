import Ember from 'ember';
import { computed } from '@ember/object';

var storage = {
    local: {},
    session: {},
};

export default Ember.Service.extend({

    prefix: 'es',
    type: 'local',

    _prefix(key) {
        return this.get('prefix')+'__'+key;
    },

    setUpEventListener: Ember.on('init', function() {

        let self = this,
        regexp = new RegExp('^('+this.get('prefix')+'__)');

        this._notify = function(evnt) {
            self.notifyPropertyChange(evnt.key.replace(regexp, ''));
        };

        if ( this.get('fastboot.isFastBoot') !== true ) {

            storage = {
                local: window.localStorage,
                session: window.sessionStorage,
            };

            window.addEventListener('storage', this._notify, false);

        }

    }),

    unknownProperty(k) {

        var key = this._prefix(k),
        type = this.get('type');

        let value = storage[type][key];
        if ( value && typeof(value) === "string" ) {
            value = value.split('"').join("");
        }

        return value;

    },

    setUnknownProperty(k, value) {

        let key = this._prefix(k),
        type = this.get('type');

        if ( Ember.isNone(value) ) {
            delete storage[type][key];
        } else if ( key.indexOf("fastboot") === -1 ) {
            storage[type][key] = value;
        }

        this.notifyPropertyChange(k);
        return value;

    },

    clear(keyPrefix) {

        this.beginPropertyChanges();
        let prefix = keyPrefix || this.get('prefix'),
        regexp = new RegExp('^('+prefix+'__)'),
        type = this.get('type'),
        toDelete = [];

        for (var i=0; i < storage[type].length; i++){
            let key = storage[type].key(i);
            if (key.match(regexp)) {
                toDelete.push(key);
            }
        }

        toDelete.forEach(function(key) {
            delete storage[type][key];
            key = key.replace(regexp, '');
            this.set(key);
        }, this);

        this.endPropertyChanges();

    },

    willDestroy() {

        this._super();

        if ( this.get('fastboot.isFastBoot') !== true ) {
            window.removeEventListener('storage', this._notify, false);
        }

    },

});
