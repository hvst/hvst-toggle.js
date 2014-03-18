(function($) {
    var publicInterface = ['destroy', 'refresh'],
        Utils;

    Utils = {
        supportsTransforms : function() {
            var $el = $('<p>'),
                transforms = [
                    '-webkit-transform',
                    '-o-transform',
                    '-ms-transform',
                    '-moz-transform',
                    'transform'
                ],
                translate = 'translated3d(1px,1px,1px)',
                hasTransforms;

            $el.appendTo($('body'));

            $.each(transforms, function(index, transform) {
                if($el.css(transform) !== null) {
                    $el.css(transform, translate);
                    hasTransforms = $el.css(transform) !== 'none';
                }
            });

            return hasTransforms;
        }
    };

    function HvstToggle($el, settings) {
        var defaults = {
                height: '30',
                seekerPadding: '10',
                activeClass: 'hvst-toggle-active',
                optionSlugField : 'slug'
            };

        this.settings = $.extend(defaults, settings);
        this.$el = $el;
        this.init();
    }

    HvstToggle.prototype.init = function() {
        this.hideInitialContainerList();
        this.buildToggleContainer();
        this.createToggleOptions();
    };

    HvstToggle.prototype.isInitialized = function() {
        return this.$el.data('hvstToggleInitialized');
    };

    HvstToggle.prototype.hideInitialContainerList = function() {
        this.$el.css({
            'position': 'absolute',
            'z-index': '-9999',
            'left': '-9999px'
        });
    };

    HvstToggle.prototype.buildToggleContainer = function() {
        var settings = this.settings,
            $el = this.$el,
            height = settings.height,
            lineHeight = settings.height - 10,
            seekerHeight = settings.height - 2,
            $optionsContainer;

        $el.after('<div class="hvst-toggle">' +
        '<div class="hvst-toggle-bg"><span class="hvst-seeker"></span>' +
        '</div></div>');

        $optionsContainer = this.getOptionsContainer();

        $optionsContainer.css({
            height : height,
            lineHeight : lineHeight + "px"
        });

        $optionsContainer.find('.hvst-seeker').css('height', seekerHeight);
    };

    HvstToggle.prototype.createToggleOptions = function() {
        var hvstToggle = this,
            $toggleOptions = this.$el.find('a'),
            $activeOption;

        this.getOptionsContainer().append($toggleOptions);
        $activeOption = this.getActiveOption();

        $toggleOptions
        .on('click', function() {
            hvstToggle.setActiveOption($(this));
        })
        .on('hover', function() {
            $(this).addClass('hvst-toggle-hover');
        })
        .on('mouseout mouseleave', function() {
            $(this).removeClass('hvst-toggle-hover');
        });

        if(!$activeOption.length) {
            this.setActiveOption($toggleOptions.eq(0));
        } else {
            this.moveSeekerTo($activeOption);
        }
    };

    HvstToggle.prototype.getActiveOption = function() {
        return this.getOptionsContainer()
        .find('a.' + this.settings.activeClass);
    };

    HvstToggle.prototype.setActiveOption = function($option) {
        var $optionsContainer = this.getOptionsContainer(),
            activeClass = this.settings.activeClass;

       $optionsContainer.find('.' + activeClass).removeClass(activeClass);
       $option.addClass(activeClass);

       this.moveSeekerTo($option);
    };

    HvstToggle.prototype.getOptionsContainer = function() {
        this.$optionsContainer = (this.$optionsContainer ||
            this.$el.next('.hvst-toggle').find('.hvst-toggle-bg'));

        return this.$optionsContainer;
    };

    HvstToggle.prototype.moveSeekerTo = function($option) {
        var seekerStyle = this.seekerStyle($option);
        this.getOptionsContainer().find('.hvst-seeker').css(seekerStyle);
    };

    HvstToggle.prototype.seekerStyle = function(obj) {
        var settings = this.settings,
            pos = $(obj).position(),
            left = pos.left - settings.seekerPadding - 11,
            // left = pos.left - ((settings.seekerPadding + 1) * 2),
            style = (Utils.supportsTransforms()) ? {
                        'width': $(obj).outerWidth() + 'px',
                        'left': left + 11
                    } : {
                        'width': $(obj).outerWidth() + 'px',
                        '-webkit-transform': 'translate3d(' + left + 'px,0,0)',
                        '-moz-transform': 'translate3d(' + left + 'px,0,0)',
                        'transform': 'translate3d(' + left + 'px,0,0)'
                    };
        return style;
    };

    HvstToggle.prototype.refresh = function() {
        this.moveSeekerTo(this.getActiveOption());
    };

    HvstToggle.prototype.destroy = function() {
        this.$el.data('hvstToggle', null);
        this.getOptionsContainer().find('a').off();
    };

    $.fn.hvstToggle = function(method, settings) {
        // Allow chaining and to handle multiple
        return this.each(function() {
            var $this = $(this),
                hvstToggle = $this.data('hvstToggle');

            if(!hvstToggle) {
                hvstToggle = new HvstToggle($this, settings);
                $this.data('hvstToggle', hvstToggle);
            }

            if($.inArray(method, publicInterface) > -1) {
                hvstToggle[method]();
            }
        });
    };
}(jQuery));
