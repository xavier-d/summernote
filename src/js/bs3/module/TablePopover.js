define([
  'summernote/base/core/func',
  'summernote/base/core/list',
  'summernote/base/core/dom'
], function (func, list, dom) {
  var TablePopover = function (context) {
    var ui = $.summernote.ui;

    var options = context.options;

    this.shouldInitialize = function () {
      console.log('Table: shouldInitialize %o', options.popover.table);
      return !list.isEmpty(options.popover.table);
    };

    this.initialize = function () {
      console.log('table popover: initialize');
      this.$popover = ui.popover({
        className: 'note-table-popover'
      }).render().appendTo('body');
      var $content = this.$popover.find('.popover-content');

      context.invoke('buttons.build', $content, options.popover.table);
    };

    this.destroy = function () {
      console.log('table destroy');
      this.$popover.remove();
    };

    this.update = function (target) {
      console.log('table update');
      if (dom.isCell(target)) {
        var pos = dom.posFromPlaceholder(target);
        this.$popover.css({
          display: 'block',
          left: pos.left,
          top: pos.top
        });
      } else {
        this.hide();
      }
    };

    this.hide = function () {
      console.log('table hide');
      this.$popover.hide();
    };
  };

  return TablePopover;
});
