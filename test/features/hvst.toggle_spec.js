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

    it('set the item as active when clicked', function() {
        var $link = $toggle.find('a').eq(1),
            $hvstSeeker,
            transformValue,
            hvstToggle;

        $toggle.hvstToggle();

        $hvstSeeker = $('.hvst-seeker');
        transformValue = getTransformValue($hvstSeeker);

        $link.triggerHandler('click');

        hvstToggle = $toggle.data('hvstToggle');


        expect($link).toHaveClass(hvstToggle.settings.activeClass);

        //the seeker was translated
        expect(transformValue).not.toEqual(getTransformValue($hvstSeeker));
    });

    function getTransformValue($element) {
        return $element.css('-webkit-transform') ||
        $element.css('-moz-transform') || $element.css('transform') ||
        $element.css('left');
    }
});
