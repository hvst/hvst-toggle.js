describe('Hvst.Toggle', function() {
    var $toggle,
        $ = jQuery;

    jasmine.getFixtures().fixturesPath = '/base/test/fixtures';

    beforeEach(function() {
        loadFixtures('toggle_template.html');
        $toggle = $('#toggle');
    });

    it('initializes once per element', function() {
        var instance;

        $toggle.hvstToggle();
        instance = $toggle.data('hvstToggle');
        $toggle.hvstToggle();

        expect(instance).toEqual($toggle.data('hvstToggle'));
    });

    it('creates hvst toggle custom markup', function() {
        $toggle.hvstToggle();

        expect($('body'))
        .toContainElement('.hvst-google, .hvst-toggle-bg, .hvst-seeker');
        expect($('body'))
        .toContainElement('.hvst-toggle-bg a');

    });
});
