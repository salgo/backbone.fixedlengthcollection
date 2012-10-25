
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

        var FOURTEEN = PHILOSOPHERS.splice(0, 14);
        expect(FOURTEEN.length).toBe(14);

        fixed.add(FOURTEEN);
        expect(fixed.length).toBe(15);

        var NEWCOMMIES = [new TestModel({'id': 16, 'name': 'Che Guevara'}),
                    new TestModel({'id': 17, 'name': 'Ho Chi Minh'})];

        expect(function() {
            fixed.add(NEWCOMMIES);
        }).toThrow(
            new RangeError('FixedLengthCollection too small')
        );
    });

});
