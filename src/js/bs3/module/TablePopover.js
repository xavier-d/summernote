define([
  'summernote/base/core/func',
  'summernote/base/core/list',
  'summernote/base/core/dom'
], function (func, list, dom) {
  var TablePopover = function (context) {
    var ui = $.summernote.ui;

    var options = context.options;

    this.shouldInitialize = function () {
      return !list.isEmpty(options.popover.table);
    };

    this.initialize = function () {
      this.$popover = ui.popover({
        className: 'note-table-popover'
      }).render().appendTo('body');
      var $content = this.$popover.find('.popover-content');

      context.invoke('buttons.build', $content, options.popover.table);
    };

    this.destroy = function () {
      this.$popover.remove();
    };

    this.update = function (target) {
      if (dom.isCell(target)) {
        // var pos = dom.posFromPlaceholder(target);
        // Display the popover
        // this.$popover.css({
        //   display: 'block',
        //   left: pos.left,
        //   top: pos.top
        // });
        // highlight col & row selected
        this.highlight(target);
      } else {
        this.hide();
      }
    };

    this.hide = function () {
      this.unhighlight();
      this.$popover.hide();
    };

    this.unhighlight = function () {
      $('.table-highlight').removeClass('table-highlight');
    };

    this.highlight = function (target) {
      this.unhighlight();
      var table = dom.ancestor(target, dom.isTable);
      var currentTr = $(target).closest('tr');
      var cellPos = currentTr.find('td').index($(target)) + 1;
      // var nbTr = $(table).find('tr').length;

      $(table).find('td:nth-child(' + cellPos + ')').addClass('table-highlight');
      currentTr.addClass('table-highlight');
    };
  };

  return TablePopover;
});
