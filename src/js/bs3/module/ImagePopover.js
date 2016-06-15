define([
  'summernote/base/core/func',
  'summernote/base/core/list',
  'summernote/base/core/dom'
], function (func, list, dom) {
  var ImagePopover = function (context) {
    var ui = $.summernote.ui;

    var options = context.options;

    this.shouldInitialize = function () {
      console.log('image: shouldInitialize %o', options.popover.image);
      return !list.isEmpty(options.popover.image);
    };

    this.initialize = function () {
      console.log('image initialize');
      this.$popover = ui.popover({
        className: 'note-image-popover'
      }).render().appendTo('body');
      var $content = this.$popover.find('.popover-content');

      context.invoke('buttons.build', $content, options.popover.image);
    };

    this.destroy = function () {
      console.log('image destroy');
      this.$popover.remove();
    };

    this.update = function (target) {
      console.log('image update');
      if (dom.isImg(target)) {
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
      console.log('image hide');
      this.$popover.hide();
    };
  };

  return ImagePopover;
});
