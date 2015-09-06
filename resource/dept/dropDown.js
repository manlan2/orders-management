/**
 * Created by WIN7 on 2015/8/11.
 */
define(['juqery'], function ( $ ) {

    function DropDown( param ) {
        this.data = param.data || [];
        this.init();
        this.direction  = param.direction;
        this.$container = parma.$container;
    }
    DropDown.prototype = {
        constuctor : DropDown,
        init : function () {

            this.formatData();
            this.renderHtml();
        },
        formatData : function () {

        },
        renderHtml : function () {
            var  hml = '<slection></slection>'

            this.$container.html( hml )
        },
        bindEvent : function () {
            this.$container.on( "" , ".click" , function (e ) {
                e.preventDefault();
            })
        }
    }
    return DropDown;
});