define(['jquery','core/log','core/str'], function($,log,str) {
    "use strict"; // jshint ;_;

    log.debug('submission helper: initialising');

    return {

        uploadstate: false,
        togglestate: 0,
        strings: {},


        init:  function(opts) {
            this.component = opts['component'];
            this.filecontrolid = opts['filecontrolid'];

            this.register_controls();
            this.register_events();
        },

        register_controls: function(){
          var that=this;
          this.controls={};
          this.controls.deletebutton = $('.' + this.component + '_deletesubmissionbutton');
          this.controls.updatecontrol =  $('#' + this.filecontrolid);
          this.controls.currentcontainer =  $('.' + this.component + '_currentsubmission');
          this.controls.togglecontainer =  $('.' + this.component + '_togglecontainer');
          this.controls.togglebutton =  $('.' + this.component + '_togglecontainer .togglebutton');
          this.controls.toggletext =  $('.' + this.component + '_togglecontainer .toggletext');
            str.get_string('clicktohide',that.component).done(function(s) {
                that.strings['clicktohide']=s;
            });
            str.get_string('clicktoshow',that.component).done(function(s) {
                that.strings['clicktoshow']=s;
            });
        },

        register_events: function(){
            var that =this;
            this.controls.deletebutton.click(function(){
                if(that.controls.updatecontrol){
                    if(confirm(M.util.get_string('reallydeletesubmission',that.component))){
                        that.controls.updatecontrol.val(-1);
                        that.controls.currentcontainer.html('');
                    }
                }
            });
            this.controls.togglebutton.click(function(){that.toggle_currentsubmission(that);});
            this.controls.toggletext.click(function(){that.toggle_currentsubmission(that);});
        },

        toggle_currentsubmission: function(that){
            var doToggleState = function(){
                if(that.togglestate===0){
                    that.controls.togglebutton.removeClass('fa-toggle-off');
                    that.controls.togglebutton.addClass('fa-toggle-on');
                    that.controls.toggletext.text(that.strings['clicktohide']);
                    that.togglestate=1;
                }else{
                    that.controls.togglebutton.removeClass('fa-toggle-on');
                    that.controls.togglebutton.addClass('fa-toggle-off');
                    that.controls.toggletext.text(that.strings['clicktoshow']);
                    that.togglestate=0;
                }
            };
            that.controls.currentcontainer.toggle(
                {duration: 300, complete: doToggleState}
            );
            return false;
        }
    };//end of return object
});