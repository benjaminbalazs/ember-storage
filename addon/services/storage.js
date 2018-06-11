import Ember from 'ember';
import Service, { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

var storage = {};

export default Ember.Service.extend({

    fastboot: service(),

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
              'local': window.localStorage,
              'session': window.sessionStorage,
            };

            window.addEventListener('storage', this._notify, false);

        } else {

        }

    }),

    willDestroy() {

        this._super();

        if ( this.get('fastboot.isFastBoot') !== true ) {
            window.removeEventListener('storage', this._notify, false);
        }

    },

    unknownProperty(k) {

        var key = this._prefix(k),
        type = this.get('type');

        return storage[type][key] && JSON.parse(storage[type][key]);

    },

    setUnknownProperty(k, value) {

        let key = this._prefix(k),
        type = this.get('type');

        if ( Ember.isNone(value) ) {
            delete storage[type][key];
        } else {
            storage[type][key] = JSON.stringify(value);
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

    }

});
