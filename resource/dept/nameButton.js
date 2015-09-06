/**
* Created by WIN7 on 2015/8/11.
*/
define(['jquery','renderHtml'],function($,renderHtml) {
    return {
        init: function(){
            this.nameClick ();

        },
        nameClick : function (){
            //名称按钮操作
            $(".method").on("click", function () {
                $(".method-menu").fadeIn(0);
            }).on("mouseleave", function () {
                $(".method-menu").fadeOut(800);
            });
        }

    }




//    //创建比较函数
//    function compare(porpertyName) {
//        return function (object1, object2) {
//            var value1 = object1[porpertyName],
//                value2 = object2[porpertyName];
//            if (value1 < value2) {
//                return -1;
//            } else if (value1 > value2) {
//                return 1;
//            } else {
//                return 0;
//            }
//        }
//    }

//    //名称按钮更改内容
//    $(".method-menu").on("mouseenter", function () {
//        $(this).stop();
//    }).on("click", ".m-name", function (e) {
//        e.stopPropagation();
//        $(".m-change").text("名称");
//        data.sort(compare("name"));
//        importData(data);
//    }).on("click", ".m-time", function (e) {
//        e.stopPropagation();
//        $(".m-change").text("创建时间");
//        data.sort(compare("createDate"));
//        importData(data);
//    });
})
