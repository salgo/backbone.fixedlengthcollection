


Backbone.FixedLengthDummyModel = Backbone.Model.extend({});

Backbone.FixedLengthCollection = (function(Backbone, _) {

    var FixedLengthCollection = function(models, options) {
        options || (options = {});
        if (options.model) this.model = options.model;
        if (options.comparator) this.comparator = options.comparator;
        if (options.fixedLength) this.fixedLength = options.fixedLength;
        this._reset();
        this.initialize.apply(this, arguments);
        this.dummyModels = [];
        if (models) this.reset(models, {silent: true, parse: options.parse});
        this.pad();
    };

    _.extend(FixedLengthCollection.prototype, Backbone.Collection.prototype, {
        reset: function(models, options) {
            /* Do the reset */
            Backbone.Collection.prototype.reset.call(this, models, options);
            /* Reset our array of dummy models */
            this.dummyModels = [];
            this.pad();
            return this;
        },

        pad: function() {
            if (this.length < this.fixedLength) {
                for (var i = this.length; i < this.fixedLength; i++) {

                    /*
                     * bypass our add at position changes when adding the
                     * padding models to our collection
                     *
                     */

                    Backbone.Collection.prototype.add.call(
                        this, new Backbone.FixedLengthDummyModel()
                    );
                    this.dummyModels.push(i);
                }
            }
        },

        add: function(models, options) {
            var i, index, length, model, cid, id,
                cids = {}, ids = {}, dups = [];

            options || (options = {});

            models = _.isArray(models) ? models.slice() : [models];

            /* Prepare models for addition */

            for (i = 0, length = models.length; i < length; i++) {
                if (!(model = models[i] =
                      this._prepareModel(models[i], options))) {
                    throw new Error("Can't add an invalid model to a " +
                                    "collection");
                }
                cid = model.cid;
                id = model.id;
                if (cids[cid] || this._byCid[cid] ||
                    ((id !== null) && (ids[id] || this._byId[id]))) {
                    dups.push(i);
                    continue;
                }
                cids[cid] = ids[id] = model;
            }

            // Remove duplicates.
            i = dups.length;
            while (i--) {
                models.splice(dups[i], 1);
            }

            if (options.at) {
                if (options.at + models.length > this.fixedLength) {
                    throw new Error("Can't add " + models.length + " items " +
                                    "at position " + options.at + " " +
                                    "collection is too small");
                } else {

                    for (i = options.at, j = 0; j < models.length; i++, j++) {

                        /*
                         * Remove whatever is at position i (dummy model or
                         * otherwise) and don't fire an event as this is
                         * house keeping.
                         *
                         */

                        Backbone.Collection.prototype.remove.call(
                            this, this.models[i], { 'silent': true }
                        );

                        // Remove reference in dummyModels

                        this.dummyModels = _.without(this.dummyModels, i);

                        // Add new model.

                        opts = {'at': i};
                        if (options.silent) {
                            opts.silent = true;
                        }

                        Backbone.Collection.prototype.add.call(
                            this, models[j], opts
                        );
                    }
                }
            } else {

                // Are there enough dummy models to support this?

                if (this.dummyModels.length < models.length) {
                    throw new RangeError('FixedLengthCollection too small');
                }

                /*
                 * Now add each model, remove the first available dummy
                 * model and put each new model in it's place.
                 *
                 */

                for (i = 0; i < models.length; i++) {
                    var dummy = this.dummyModels.shift();

                    Backbone.Collection.prototype.remove.call(
                        this, this.models[dummy], { 'silent': true }
                    );

                    this.dummyModels = _.without(this.dummyModels, dummy);

                    opts = {'at': dummy};
                    if (options.silent) {
                        opts.silent = true;
                    }

                    Backbone.Collection.prototype.add.call(
                        this, models[i], opts
                    );
                }
            }

            return this;
        },

        remove: function(models, options) {
            var i, l, index, model;
            options || (options = {});
            models = _.isArray(models) ? models.slice() : [models];

            for (i = 0, l = models.length; i < l; i++) {
                model = this.getByCid(models[i]) || this.get(models[i]);
                if (!model) continue;
                index = this.indexOf(model);

                opts = {};
                if (options.silent) {
                    opts.silent = true;
                }

                Backbone.Collection.prototype.remove.call(
                    this, model, opts
                );

                Backbone.Collection.prototype.add.call(
                    this, new Backbone.FixedLengthDummyModel(),
                    {'at': index, 'silent': false}
                );

                if (this.dummyModels.indexOf(index) === -1) {
                    this.dummyModels.push(index);
                }
            }

            // Perform numeric sort
            this.dummyModels.sort(function(a,b){return a-b;});

            return this;
        },

        // Exposed for tests

        dummies: function() {
            return this.dummyModels.length;
        }
    });

    FixedLengthCollection.extend = Backbone.Collection.extend;

    return FixedLengthCollection;

})(Backbone, _);
