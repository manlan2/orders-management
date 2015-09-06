define(['jquery','renderHtml'],function($,renderHtml) {
    return {
        init: function(){
            this.show_name();
            this.sort();

        },
         /*点击新增按钮弹出新增窗口以及关闭*/
         show_name : function(){
            $("#menu .name").hover(function(){
                    $(this).find(".name_div").stop(true).delay(100).fadeIn("fast");
                    
                },function(){
                    $(this).find(".name_div").stop(true).delay(100).fadeOut("fast");
                });
         }
           
         /*点击新增按钮弹出新增窗口以及关闭*/   
        sort : function (){
          /*按名称升序排序*/
            var asc=function(a,b){
                return $(a).find(".name_sort").text()>$(b).find(".name_sort").text() ? 1:-1;
            }
            /*按名称降序排序*/
            /*var desc=function(a,b){
                return $(a).find(".name_sort").text()>$(b).find(".name_sort").text() ? -1:1;
            }*/
            var sortByName=function(asc){
                var sortEle=$(".addItem .showInfo").sort(asc);
                $(".addItem").empty().append(sortEle);
            }

            $("#menu").on("click",".name_btn1",function(){
                sortByName(asc);
            }).on("click",".name_btn1",function(){
                $("#menu .name_btn").val("名称");
            });

            /*按创建日期降序排序*/
            var desc=function(a,b){
                var str1,str2,date1,date2;
                str1=$(a).find(".date_sort").text();
                //console.log(str1);
                str2=$(b).find(".date_sort").text();
                //console.log(str2);
                // date1=new Date(str1);
                // console.log(date1);
                // date2=new Date(str2);
                // console.log(date1);
                return str1>str2 ? -1:1;
            }
            var sortByDate=function(desc){
                var sortEle1=$(".addItem .showInfo").sort(desc);
                $(".addItem").empty().append(sortEle1);
            }
            $("#menu").on("click",".time_btn",function(){           
                sortByDate(desc);
            }).on("click",".time_btn",function(){
                $("#menu .name_btn").val("时间");
            });
        }

    }
}