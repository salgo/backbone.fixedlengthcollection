
TestModel = Backbone.Model.extend({});

FixedLength = Backbone.FixedLengthCollection.extend({
    fixedLength: 15,
    model: TestModel
});

var fixed = false;

var PHILOSOPHERS = [
    {'id': 1, 'name': 'David Hume'},
    {'id': 2, 'name': 'Jeremy Bentham'},
    {'id': 3, 'name': 'William Godwin'},
    {'id': 4, 'name': 'James Mill'},
    {'id': 5, 'name': 'John Stuart Mill'},
    {'id': 6, 'name': 'Henry Sidgwick'},
    {'id': 7, 'name': 'R. M. Hare'},
    {'id': 8, 'name': 'Peter Singer'},
    {'id': 9, 'name': 'Gracchus Babeuf'},
    {'id': 10, 'name': 'Karl Marx'},
    {'id': 11, 'name': 'Friedrich Engels'},
    {'id': 12, 'name': 'Peter Kropotkin'},
    {'id': 13, 'name': 'Rosa Luxemburg'},
    {'id': 14, 'name': 'Karl Liebknecht'},
    {'id': 15, 'name': 'Antonio Gramsci'}
];

describe('Backbone.FixedLengthDummyModel', function() {
    var dummy;

    beforeEach(function() {
        dummy = new Backbone.FixedLengthDummyModel();
    });

    it("identifies itself as a dummy model", function() {
        expect(dummy.isDummyModel).toEqual(true);
    });
});

describe("Backbone.FixedLengthCollection", function() {

    beforeEach(function() {
        fixed = new FixedLength();
    });

    it("has the correct length", function() {
        expect(fixed.length).toBe(15);
    });

    it("length remains unchanged when we add an item", function() {
        var test = new TestModel({'id': 1, 'name': 'Steve'});
        fixed.add(test);
        expect(fixed.length).toBe(15);
    });

    it("length remains unchanged when we add two items", function() {
        var test = new TestModel({'id': 1, 'name': 'Steve'}),
            test2 = new TestModel({'id': 2, 'name': 'Rob'});

        fixed.add([test, test2]);
        expect(fixed.length).toBe(15);
    });

    it("the first item we add to a collection full of dummy models " +
       "goes into position 0", function() {
        var test = new TestModel({'id': 1, 'name': 'Steve'});
        fixed.add(test);
        expect(fixed.length).toBe(15);
        var result = fixed.at(0);
        expect(result).toBe(test);
    });


    it("the two items we add to a collection full of dummy models " +
       "go into position 0 and 1", function() {

        var test = new TestModel({'id': 1, 'name': 'Steve'}),
            test2 = new TestModel({'id': 2, 'name': 'Rob'});

        fixed.add([test, test2]);
        expect(fixed.length).toBe(15);
        var result = fixed.at(0);
        expect(result).toBe(test);
        result = fixed.at(1);
        expect(result).toBe(test2);
    });

    it("when a position to insert at is specified, the item is inserted in " +
       "the correct position", function() {

        var test = new TestModel({'id': 1, 'name': 'Steve'});
        fixed.add(test, {'at': 10});
        expect(fixed.length).toBe(15);
        var result = fixed.at(10);
        expect(result).toBe(test);
    });

    it("when a position to insert at is specified, the item is inserted in " +
       "the correct position", function() {

        var test = new TestModel({'id': 1, 'name': 'Steve'});
        fixed.add(test, {'at': 10});
        expect(fixed.length).toBe(15);
        var result = fixed.at(10);
        expect(result).toBe(test);
    });

    it("does not reduce in size when we remove an item", function() {
        fixed.remove(fixed.at(0));
        expect(fixed.length).toBe(15);
    });

    it("can be populated with 15 models", function() {
        fixed.add(PHILOSOPHERS);

        expect(fixed.length).toBe(15);
        expect(fixed.dummies()).toBe(0);

        expect(fixed.at(0).get('name')).toBe('David Hume');
        expect(fixed.at(1).get('name')).toBe('Jeremy Bentham');
        expect(fixed.at(2).get('name')).toBe('William Godwin');
        expect(fixed.at(3).get('name')).toBe('James Mill');
        expect(fixed.at(4).get('name')).toBe('John Stuart Mill');
        expect(fixed.at(5).get('name')).toBe('Henry Sidgwick');
        expect(fixed.at(6).get('name')).toBe('R. M. Hare');
        expect(fixed.at(7).get('name')).toBe('Peter Singer');
        expect(fixed.at(8).get('name')).toBe('Gracchus Babeuf');
        expect(fixed.at(9).get('name')).toBe('Karl Marx');
        expect(fixed.at(10).get('name')).toBe('Friedrich Engels');
        expect(fixed.at(11).get('name')).toBe('Peter Kropotkin');
        expect(fixed.at(12).get('name')).toBe('Rosa Luxemburg');
        expect(fixed.at(13).get('name')).toBe('Karl Liebknecht');
        expect(fixed.at(14).get('name')).toBe('Antonio Gramsci');
    });

    it("removing element results in a dummy model being added in that place",
        function()
    {
        fixed.add(PHILOSOPHERS);

        fixed.remove(fixed.get(10));

        expect(fixed.length).toBe(15);
        expect(fixed.dummies()).toBe(1);

        expect(fixed.at(0).get('name')).toBe('David Hume');
        expect(fixed.at(1).get('name')).toBe('Jeremy Bentham');
        expect(fixed.at(2).get('name')).toBe('William Godwin');
        expect(fixed.at(3).get('name')).toBe('James Mill');
        expect(fixed.at(4).get('name')).toBe('John Stuart Mill');
        expect(fixed.at(5).get('name')).toBe('Henry Sidgwick');
        expect(fixed.at(6).get('name')).toBe('R. M. Hare');
        expect(fixed.at(7).get('name')).toBe('Peter Singer');
        expect(fixed.at(8).get('name')).toBe('Gracchus Babeuf');
        expect(fixed.at(9).get('name')).toBe(undefined);
        expect(fixed.at(10).get('name')).toBe('Friedrich Engels');
        expect(fixed.at(11).get('name')).toBe('Peter Kropotkin');
        expect(fixed.at(12).get('name')).toBe('Rosa Luxemburg');
        expect(fixed.at(13).get('name')).toBe('Karl Liebknecht');
        expect(fixed.at(14).get('name')).toBe('Antonio Gramsci');
    });


    it("adding item in a position where there is already an item", function() {

        fixed.add(PHILOSOPHERS);

        var che = new TestModel({'id': 16, 'name': 'Che Guevara'});

        fixed.add(che, {'at': 9});

        expect(fixed.length).toBe(15);
        expect(fixed.dummies()).toBe(0);

        expect(fixed.at(0).get('name')).toBe('David Hume');
        expect(fixed.at(1).get('name')).toBe('Jeremy Bentham');
        expect(fixed.at(2).get('name')).toBe('William Godwin');
        expect(fixed.at(3).get('name')).toBe('James Mill');
        expect(fixed.at(4).get('name')).toBe('John Stuart Mill');
        expect(fixed.at(5).get('name')).toBe('Henry Sidgwick');
        expect(fixed.at(6).get('name')).toBe('R. M. Hare');
        expect(fixed.at(7).get('name')).toBe('Peter Singer');
        expect(fixed.at(8).get('name')).toBe('Gracchus Babeuf');
        expect(fixed.at(9).get('name')).toBe('Che Guevara');
        expect(fixed.at(10).get('name')).toBe('Friedrich Engels');
        expect(fixed.at(11).get('name')).toBe('Peter Kropotkin');
        expect(fixed.at(12).get('name')).toBe('Rosa Luxemburg');
        expect(fixed.at(13).get('name')).toBe('Karl Liebknecht');

    });

    it("adding 2 items when there are already 14 should fail", function() {

        fixed.add(PHILOSOPHERS);
        fixed.pop();

        expect(fixed.dummies()).toBe(1);
        expect(fixed.length).toBe(15);

        var NEWCOMMIES = [new TestModel({'id': 16, 'name': 'Che Guevara'}),
                          new TestModel({'id': 17, 'name': 'Ho Chi Minh'})];

        expect(function() {
            fixed.add(NEWCOMMIES);
        }).toThrow(
            new RangeError('FixedLengthCollection too small')
        );
    });

    it("adding 1 items at the final position should work", function() {
        var che = new TestModel({'id': 16, 'name': 'Che Guevara'});
        fixed.add(che, {'at': 14});
    });

    it("popping has no effect when we're full of dummies", function() {
        fixed.pop();
        expect(fixed.length).toBe(15);
        expect(fixed.dummies()).toBe(15);
    });

    it("popping removes one element when we're full of items", function() {
        fixed.add(PHILOSOPHERS);
        expect(fixed.dummies()).toBe(0);
        expect(fixed.length).toBe(15);
        fixed.pop();
        expect(fixed.length).toBe(15);
        expect(fixed.dummies()).toBe(1);
    });

    it("pushing adds element onto end of collection", function() {
        var che = new TestModel({'id': 16, 'name': 'Che Guevara'});

        fixed.push(che);
        expect(fixed.length).toBe(15);
        expect(fixed.dummies()).toBe(14);
        expect(fixed.at(0)).toBe(che);
    });

    it("shifting removes first item", function() {
        var item = null;

        fixed.add(PHILOSOPHERS);
        item = fixed.shift();
        expect(item.get('name')).toBe('David Hume');
    });

    it("unshift adds item", function() {
        var che = new TestModel({'id': 16, 'name': 'Che Guevara'});

        fixed.unshift(che);
        expect(fixed.at(0)).toBe(che);
        expect(fixed.dummies()).toBe(14);
        expect(fixed.length).toBe(15);
        expect(fixed.at(0)).toBe(che);
    });

    it("add, remove some items and then readd them", function() {

        fixed.add(PHILOSOPHERS[0]);
        fixed.add(PHILOSOPHERS[1]);
        fixed.add(PHILOSOPHERS[14]);
        fixed.add(PHILOSOPHERS[8]);
        fixed.add(PHILOSOPHERS[10]);
        fixed.add(PHILOSOPHERS[12]);
        fixed.add(PHILOSOPHERS[2]);
        fixed.add(PHILOSOPHERS[5]);
        fixed.add(PHILOSOPHERS[6]);
        fixed.add(PHILOSOPHERS[4]);
        fixed.add(PHILOSOPHERS[3]);
        fixed.add(PHILOSOPHERS[13]);
        fixed.add(PHILOSOPHERS[7]);
        fixed.add(PHILOSOPHERS[9]);
        fixed.add(PHILOSOPHERS[11]);

        expect(fixed.dummies()).toBe(0);

        fixed.remove(PHILOSOPHERS[11]);
        fixed.remove(PHILOSOPHERS[9]);
        fixed.remove(PHILOSOPHERS[7]);
        fixed.remove(PHILOSOPHERS[13]);
        fixed.remove(PHILOSOPHERS[3]);
        fixed.remove(PHILOSOPHERS[4]);
        fixed.remove(PHILOSOPHERS[6]);
        fixed.remove(PHILOSOPHERS[5]);
        fixed.remove(PHILOSOPHERS[2]);
        fixed.remove(PHILOSOPHERS[12]);
        fixed.remove(PHILOSOPHERS[10]);
        fixed.remove(PHILOSOPHERS[8]);
        fixed.remove(PHILOSOPHERS[14]);
        fixed.remove(PHILOSOPHERS[1]);
        fixed.remove(PHILOSOPHERS[0]);

        expect(fixed.dummies()).toBe(15);
        expect(fixed.dummyModels).toEqual(_.range(15));

        fixed.add(PHILOSOPHERS[3]);

        var item = fixed.at(0);

        expect(item.get('name')).toBe('James Mill');
    });

    it("removing items does not reposition other items", function() {

        var item = null, i = 0;

        fixed.add(PHILOSOPHERS);

        item = fixed.at(10);
        fixed.remove(item);
        expect(fixed.length).toBe(15);

        item = fixed.at(10);
        expect(item.get('name')).toBe(undefined);
        expect(fixed.dummyModels).toEqual([10]);

        item = fixed.at(0);
        fixed.remove(item);
        item = fixed.at(0);
        expect(item.get('name')).toBe(undefined);
        expect(fixed.dummyModels).toEqual([0, 10]);

        item = fixed.at(14);
        fixed.remove(item);
        item = fixed.at(14);
        expect(item.get('name')).toBe(undefined);
        expect(fixed.dummyModels).toEqual([0, 10, 14]);

        for (i = 0; i < fixed.length; i++) {
            if (_.indexOf(fixed.dummyModels, i) != -1) {
                continue;
            }
            expect(fixed.at(i).get('name')).toEqual(PHILOSOPHERS[i].name);
        }
    });

});



