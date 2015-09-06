define(['jquery','renderHtml'],function($,renderHtml) {
    return {
        init: function(){
            this.show_add();
            this.addItem();

        },
         /*点击新增按钮弹出新增窗口以及关闭*/
         show_add : function(){
            $(".add_btn").on("click",function(){
                $(".addPage").fadeIn("slow");
            });

            $(".addItem").on("click","img",function(){
                $(".addPage").fadeIn("slow");
            });

            $(".cancel_btn").on("click",function(){
                $(".addPage").fadeOut("slow");
            });

            $(".addPage_menu a").on("click",function(){
                $(".addPage").fadeOut("slow");
            });
         }
           
         /*点击新增按钮弹出新增窗口以及关闭*/   
        addItem : function (){
          $(".save_btn").on("click",function(){
              if($(".add_name").val() && $(".add_email_addr").val() && $(".add_email_name").val()){
                  var name=$(".add_name").val(),
                      createDate=nowTime();
                      bucount=0;
                      openRate=0;
                      clickRate=0;
                  $("<div class='showInfo'><div class='checkbox'><input type='checkbox' name='checkbox'></div>"+
                      "<div class='name_date'><p class='name_sort'>"+name+
                      "</p><p clas='date_sort'>"+createDate+"</p></div><div class='count'><p>"+bucount+
                      "</p><p>订阅数</p></div><div class='openRate'><p>"+openRate+"%</p><p>打开率</p></div><div class='clickRate'><p>"+clickRate+
                      "%</p><p>点击率</p></div><div class='img'><a href='##'><img src='resource/img/add.png'></a>&nbsp;"+
                      "<a href='##'><img src='resource/img/guanli.png'></a></div></div>").appendTo(".addItem");
                  name=$(".add_name").val('');
                  email=$(".add_email_name").val('');
                  email_addr=$(".add_email_addr").val('');
                  alert("提交成功！");
              }else{
                  alert("请完善信息再进行提交！");
              }
             }).on("click",function(){
              $(".addPage").fadeOut("slow");
             });
        }

    }
}