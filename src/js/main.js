var ranking = (function ($) {
    return {
        init: function () {
            this.init_resume();
            this.init_drag_drop();
        },

        init_resume: function() {
            var name = $('#name'),
                sex = $('#sex'),
                school = $('#school'),
                logic = $('#logic'),
                wonderlic = $('#wonderlic'),
                total = $('#total'),
                comment = $('#comment');

            var fake_data = ['西北工业大学', '西安交通大学', '西安电子科技大学']    

            $('.rank').on('click', '.card', function(e) {
                var tg = $(e.target);
                name.val(tg[0].innerHTML.replace(/\(.*?\)/ig, ''));
                if (tg.hasClass('female')) sex.val('female');
                total.val(tg[0].innerHTML.replace(/.*?\(|\)/ig, ''));
                school.val(fake_data[Math.ceil(Math.random()*3 - 1)]);

            });
        },

        init_drag_drop: function() {
            var _this = this;
            $('.candidate').draggable({
                revert: 'invalid',
                helper: 'clone'
            });

            $('.undraggable').draggable('disable');
            

            $('.grade').droppable({
                accept: '.candidate',
                activeClass: 'ui-state-highlight',
                drop: function(e, ui) {
                    if (this.id == ui.draggable.parent()[0].id)
                        return;

                    var user_id = ui.draggable.data('user-id');
                    var origin_candidate = $(this).find('span[data-user-id="' + user_id + '"]');
                    if (origin_candidate.length > 0) {
                        origin_candidate.replaceWith(ui.draggable.clone().removeClass('reference'));
                        ui.draggable.remove();
                    } else {
                        var clone_node = ui.draggable.clone();
                        if ($(this).parents('#overall-rank').length == 0 || ui.draggable.hasClass('reference')) {
                            $(this).append(clone_node);
                            ui.draggable.remove();
                        } else {
                            $(this).append(clone_node.addClass('reference'));
                            ui.draggable.addClass('original undraggable');
                        }
                    }

                    _this.init_drag_drop();
                }
            });
        },

        
    }
})(jQuery);

ranking.init();