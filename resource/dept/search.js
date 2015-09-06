/**
* Created by WIN7 on 2015/8/11.
*/
define(['jquery','renderHtml'],function($,renderHtml) {
    return {
        init: function(){
            this.show_search();
            this.search();

        },
        /*鼠标置于过滤查询按钮显示查询div*/
        show_search : function(){
            $("#menu .find").hover(function(){
                    $(this).find(".search_div").stop(true).delay(100).fadeIn();
                },function(){
                    $(this).find(".search_div").stop(true).delay(100).fadeOut();
                });
        },
        
        /*输入关键字进行模糊查询*/    
        search : function (){
           $(".search_btn").on("click",function(){
            var $search_name=$(".search_name").val(); //如果不为空则获取需要查找的名称
            var $allname=$(".name_sort");//获取列表中所有项目名称
            if($search_name==""){
                alert("请输入要查询的名称！");
            }
            if($allname.text().indexOf($search_name)!=-1){
                $(".footer").empty();
                $(".addItem").empty();       //清空项目列表
                // console.log($allname.val().toString());
                    $allname.each(function(){
                        var str=$(this).text();      //获取查询到的单个名称
                        // console.log(str);
                        if(str.search($search_name)!=-1){
                            $(this).parents(".showInfo").appendTo(".addItem");
                            $(".search_name").val('');
                        }
                    }); 
            }else{
                $(".search_name").val('');
                alert("您搜索的用户名称不存在！");
            }
           });
        }

    }
}