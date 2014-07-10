var ranking = (function ($) {
    return {
        init: function () {
            $('.candidate').draggable({
                revert: 'invalid',
                helper: 'clone'
            });

            $('.undraggable').draggable('disable');

            $('.grade').droppable({
                accept: '.candidate',
                activeClass: 'ui-state-highlight',
                drop: function(e, ui) {
                    $(this).append(ui.draggable.clone());
                    
                    // TODO should not drag after drop
                    ui.draggable.addClass('ui-state-highlight');

                }
            });
        }
    }
})(jQuery);

ranking.init();