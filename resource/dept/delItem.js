define(['jquery','renderHtml'],function($,renderHtml) {
    return {
        init: function(){
            this.show_del();
            this.delItem();

        },
         /*点击刪除按钮弹出刪除窗口以及关闭*/
         show_del : function(){
             $(".cancel_btn").on("click",function(){
                $(".delPage").fadeOut("slow");
            });
        
            $(".delPage_menu a").on("click",function(){
                $(".delPage").fadeOut("slow");
            });
         }
           
         /*单击删除按钮弹出删除确认页面*/    
        delItem : function (){
          $(".del_btn").on("click",function(){
              if($("input[name='checkbox']").is(":checked"))
              {
                  var del_info_str="<div class='span_div'><span class='span_name'>{{name}}</span><span class='span_count'>{{bucount}}</span></div>",
                      str="";
                  $("input[name='checkbox']:checked").each(function(){
                      var name=$(this).parent(".checkbox").siblings(".name_date").children(".name_sort").text(),
                          bucount=$(this).parent(".checkbox").siblings(".count").children(".bucount").text();
                          //console.log(name,bucount);
                          str+=del_info_str.replace(/{{name}}/g,name).
                               replace(/{{bucount}}/g,bucount);
                          //console.log(str);
                  });
                  $(".del_info").html(str);
                  $(".delPage").fadeIn("slow");
                  $(".del_btn_check").click(function(){
                      if($("input[name='del_cb']").is(":checked")){
                          $(".showInfo input[name='checkbox']:checked").parents(".showInfo").remove();
                          alert("删除成功！");
                          $(".delPage").fadeOut("slow");
                      }else{
                          alert("请选中确认删除复选框再进行删除！");
                      }
                  });     
              }else{
                  alert("请选中删除项!");
              }
                      });
        }

    }
}