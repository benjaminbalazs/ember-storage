<<<<<<< HEAD
# Ember Storage

A simple but powerful way for managing data that you wish to last through
a page reload. This add-on synchronizes data between browser tabs when using
localStorage and it is
observable.

[Live Demo](http://storage.jerel.co/)

[![Build Status](https://travis-ci.org/jerel/ember-storage.svg?branch=master)](https://travis-ci.org/jerel/ember-storage)
=======
my-addon
==============================================================================

[Short description of the addon.]
>>>>>>> 7858988... message

Installation
------------------------------------------------------------------------------

<<<<<<< HEAD
* `ember install:addon ember-storage`

## Usage

This service is injected into all routes and components as `storage`. You
may get, set, and observe data on `storage` just like a regular Ember Object:

````js
export default Ember.Component.extend({
  fullWidth: function() {
    return !this.get('storage.sideBarOpen');
  }.property('storage.sideBarOpen'),
  actions: {
    toggleMenu: function() {
      this.toggleProperty('storage.sideBarOpen');
    },
  },
});
````
````html
  <!-- some component template -->
  <div id="sidebar" class="{{if storage.sideBarOpen 'open' ''}}">
    sidebar contents
  </div>

  <button {{action 'toggleMenu'}}>Toggle Sidebar</button>
````
## API

* `prefix` (property). Set a key prefix. Handy for saving user specific device config. Defaults to 'es'.
* `type` (property). Either 'session' or 'local'. Defaults to 'local'. Due to the way `sessionStorage` works tab sync does not work if type is set to 'session'.
* `clear` (function). Clear all data for the specified key. Defaults to the key currently set in `prefix`.

Examples:
````js
// application route
export default Ember.Route.extend({
  afterModel: function(model) {
    this.currentUserID = model.id;
    // now multiple users could use this device without sharing data
    this.storage.set('prefix', this.currentUserID);
  },
  actions: {
    resetUserPreferences: function() {
      this.storage.clear(this.currentUserID);
    },
  },
});
````
To create an additional instance (maybe one for sessionStorage) add an initializer to your app:
````js
// app/initializers/session-service.js
import Session from '../services/storage';

var session = Session.create({
  type: 'session',
});

export function initialize(container, application) {
  container.register('service:session', session, {instantiate: false});
  application.inject('route', 'session', 'service:session');
  application.inject('component', 'session', 'service:session');
}

export default {
  name: 'session-service',
  initialize: initialize
};
````
## Running Tests
=======
```
ember install my-addon
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application
>>>>>>> 7858988... message

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

<<<<<<< HEAD
For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
=======
For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
>>>>>>> 7858988... message
