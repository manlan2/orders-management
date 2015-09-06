/**
 * Created by WIN7 on 2015/8/11.
 */
define(['jquery','data' ],function($,data){
    return {
        init : function () {
            this.renderHtml ();
            this.bindEvent ();
            /*new dropDown({
                data : [
                    {
                        id:"1",
                        name:"时间"
                    },
                    {
                        id:"2",
                        name:"名称"
                    }
                ],
                direction : "up",
                $container : $(".sort-wrap")
            });*/
        },
        renderHtml:function(){
            var temp="<div class='showInfo'><div class='checkbox'><input type='checkbox' name='checkbox'></div><div class='name_date'>"+
            "<p class='name_sort'>{{name}}</p><p class='date_sort'>{{createDate}}</p></div><div class='count'>"+
            "<p class='bucount'>{{bucount}}</p><p>订阅数</p></div><div class='openRate'><p>{{openRate}}%</p>"+
            "<p>打开率</p></div><div class='clickRate'><p>{{clickRate}}%</p><p>点击率</p></div><div class='img'>"+
            "<a href='##'><img src='resource/img/add.png'></a>&nbsp;<a href='##'><img src='resource/img/guanli.png'></a></div></div>",
            htmlStr="";
            /*获取data.js中的数据并创建div*/
            for(var i=0,len=data.length;i<len;i++){
                var name=data[i].name,
                    createDate=data[i].createDate,
                    bucount=data[i].bucount,
                    openRate=data[i].openRate,
                    clickRate=data[i].clickRate;
                    htmlStr+=temp.replace(/{{name}}/g,name)
                        .replace(/{{createDate}}/g,createDate)
                        .replace(/{{bucount}}/g,bucount)
                        .replace(/{{openRate}}/g,openRate)
                        .replace(/{{clickRate}}/g,clickRate);
                }
                $(".addItem").html(htmlStr);
         },
    
        bindEvent:function(){
        /*全选功能、添加选中背景和删除线*/
            var $all=$(".checkAll");
            $all.click(function(){
                 var $this = $(this);
                 var state = $this.prop("checked");
                 if( state ){
                     $("input[name='checkbox']").prop("checked","true").parents('.showInfo').addClass('checked_bg');
                 }else{
                     $("input[name='checkbox']").removeAttr("checked").parents('.showInfo').removeClass('checked_bg');
                 }
                
            });

            /*选中显示背景*/
            $(".addItem").on("click","input",function(){
                $(this).parents(".showInfo").toggleClass("checked_bg");
            });

            /*点击新增按钮弹出新增窗口以及关闭*/
            $(".add_btn").on("click",function(){
                $(".addPage").fadeIn("slow");
            });

            $(".addItem").on("click","img",function(){
                $(".addPage").fadeIn("slow");
            });


            $(".cancel_btn").on("click",function(){
                $(".addPage").fadeOut("slow");
            });
            $(".cancel_btn").on("click",function(){
                $(".delPage").fadeOut("slow");
            });


            $(".addPage_menu a").on("click",function(){
                $(".addPage").fadeOut("slow");
            });
            $(".delPage_menu a").on("click",function(){
                $(".delPage").fadeOut("slow");
            });

            /*鼠标置于名称按钮上时显示下拉列表*/
            $("#menu .name").hover(function(){
                    $(this).find(".name_div").stop(true).delay(100).fadeIn("fast");
                    
                },function(){
                    $(this).find(".name_div").stop(true).delay(100).fadeOut("fast");
                });
            /*鼠标置于过滤查询按钮显示查询div*/
            $("#menu .find").hover(function(){
                    $(this).find(".search_div").stop(true).delay(100).fadeIn();
                },function(){
                    $(this).find(".search_div").stop(true).delay(100).fadeOut();
                });

            /*按名称升序排序*/
            var asc=function(a,b){
                return $(a).find(".name_sort").text()>$(b).find(".name_sort").text() ? 1:-1;
            }
            /*按名称降序排序*/
            /*var desc=function(a,b){
                return $(a).find(".name_sort").text()>$(b).find(".name_sort").text() ? -1:1;
            }*/
            var sortByName=function(asc){
                $(".showInfo").show();
                var sortEle=$(".addItem .showInfo").sort(asc);
                $(".addItem").empty().append(sortEle);
                var value=$(".line").text();
                $(".showInfo:gt("+(value-1)+")").hide();
            }

            $("#menu").on("click",".name_btn1",function(){
                sortByName(asc);
            }).on("click",".name_btn1",function(){
                $("#menu .name_btn").val("名称");
            });

            /*按创建日期降序排序*/
            var desc=function(a,b){
                return $(a).find(".date_sort").text()>$(b).find(".date_sort").text() ? -1:1;
            }
            var sortByDate=function(desc){
                $(".showInfo").show();
                var sortEle1=$(".addItem .showInfo").sort(desc);
                $(".addItem").empty().prepend(sortEle1);
                var value=$(".line").text();
                $(".showInfo:gt("+(value-1)+")").hide();
            }
            $("#menu").on("click",".time_btn",function(){           
                sortByDate(desc);
            }).on("click",".time_btn",function(){
                $("#menu .name_btn").val("时间");
            });

            /*单击删除按钮弹出删除确认页面*/
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
                            var count=$(".showInfo").size();
                            $(".all_count").text(count);
                            var value=$(".line").text();
                            current_page=1;
                            $(".show_start").text(1);
                            $(".show_end").text(value);
                            $(".showInfo").show();
                            $allname=$(".name_sort");//获取列表中所有项目名称
                            $(".showInfo:gt("+(value-1)+")").hide();
                            // 如果没有数据则不能对下一页和上一页进行操作
                            if($(".showInfo").size()==0){
                              $(".next").hide();
                              $(".show_start").text(0);
                              $(".show_end").text(0);
                              $(".addItem").text("没有数据！");
                            }
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

            /*创建格式化日期函数*/
            var nowTime=function getFormatDate() {
               var date=new Date(),
                   str1="-",str2=":",
                   year=date.getFullYear(),
                   month=date.getMonth() + 1,
                   day=date.getDate(),
                   hour=date.getHours(),
                   min=date.getMinutes(),
                   second=date.getSeconds(),
                   currentDate="";
               if (month >= 1 && month <= 9) {
                   month = "0" + month;
               }
               if (day >= 0 && day <= 9) {
                   day = "0" + day;
               }
               if( hour >= 0 && hour <= 9){
                    hour = "0" + hour;
               }
               if(min >= 0 && min <= 9){
                    min = "0" + min;
               }
               if(second >=0 && second <= 9){
                    second = "0" + second;
               }
               currentDate = year + str1 + month + str1 + day+ " " + hour + str2 + min+ str2 + second;
               return currentDate;
           };

           /*保存新增信息*/
           $(".save_btn").on("click",function(){
            if($(".add_name").val() && $(".add_email_addr").val() && $(".add_email_name").val()){
                var name=$(".add_name").val(),
                    createDate=nowTime();
                    bucount=0;
                    openRate=0;
                    clickRate=0;
                var str="<div class='showInfo'><div class='checkbox'><input type='checkbox' name='checkbox'></div>"+
                    "<div class='name_date'><p class='name_sort'>{{name}}</p>"+
                    "<p clas='date_sort'>{{createDate}}</p>"+
                    "</div><div class='count'><p>{{bucount}}</p>"+
                    "<p>订阅数</p></div><div class='openRate'><p>{{openRate}}%</p>"+
                    "<p>打开率</p></div><div class='clickRate'><p>{{clickRate}}%</p>"+
                    "<p>点击率</p></div><div class='img'><a href='##'><img src='resource/img/add.png'></a>&nbsp;"+
                    "<a href='##'><img src='resource/img/guanli.png'></a></div></div>";
                    var addStr="";
                    addStr+=str.replace(/{{name}}/g,name).
                            replace(/{{createDate}}/g,createDate).
                            replace(/{{bucount}}/g,bucount).
                            replace(/{{openRate}}/g,openRate).
                            replace(/{{clickRate}}/g,clickRate);
                $(".addItem").prepend(addStr);
                name=$(".add_name").val('');
                email=$(".add_email_name").val('');
                email_addr=$(".add_email_addr").val('');
                var count=$(".showInfo").size();
                $(".all_count").text(count);
                var value=$(".line").text();
                current_page=1;
                $(".show_start").text(1);
                $(".show_end").text(value);
                $(".showInfo").show();
                $allname=$(".name_sort");//获取列表中所有项目名称
                $(".showInfo:gt("+(value-1)+")").hide();
                alert("提交成功！");
            }else{
                alert("请完善信息再进行提交！");
            }
           }).on("click",function(){
            $(".addPage").fadeOut("slow");
           });

            /*输入关键字进行模糊查询*/
            var $allname=$(".name_sort");//获取列表中所有项目名称
            $("#menu").on("click",".search_btn",function(){
            $(".showInfo").show();
            var $search_name=$(".search_name").val(); //如果不为空则获取需要查找的名称
            
            if($search_name==""){
                alert("请输入要查询的名称！");
            }
            else if($allname.text().indexOf($search_name)!=-1){
                $(".results").empty();
                $(".footer").empty();
                $(".addItem").empty();       //清空项目列表
                var count=0;
                // console.log($allname.val().toString());
                    $allname.each(function(){
                        var str=$(this).text();      //获取查询到的单个名称
                        // console.log(str);
                        if(str.search($search_name)!=-1){
                          count++;
                          $(this).parents(".showInfo").appendTo(".addItem");
                          $(".search_name").val('');
                        }
                    });
                $("<span class='results'>模糊搜索到&ldquo;<label>"+count+"</label>&rdquo;条符合要求的数据！</span>").appendTo("#menu");  
            }else{
                $(".results").empty();
                $(".footer").empty();
                $(".addItem").empty(); 
                $(".search_name").val('');
                $("<span class='results'>模糊搜索到&ldquo;<label>"+0+"</label>&rdquo;条符合要求的数据！</span>").appendTo("#menu"); 
                alert("您搜索的用户名称不存在！");
            }
           });

           /*点击显示行数显示列表*/
           $(".footer").on("click",".line",function(){
                $(".show_line").slideToggle("slow");
            });

          /* $(".line").on("click",function(){
            $(".footer").children(".show_line").slideToggle("slow");
           });*/

           /*点击行数列表显示获取的行数值*/
           //初始化，前面5条数据显示，其他的数据隐藏。
           $(".showInfo:gt(4)").hide();
           $(".show_line li").on("click",function (){
              // var item=$(".showInfo");
              // $(".addItem").empty();
              // $(".addItem").html(item);
              // var size=$(".showInfo").size();
              // console.log(size);
              var value=$(this).text();
              $(".line").text(value);
              $(".showInfo").show();
              $(".showInfo:gt("+(value-1)+")").hide();
              $(".show_line").hide();
              $(".show_start").text(1);
              $(".show_end").text(value);
              current_page=1;
           });

          /*分页设置*/ 
          
          var current_page=1;//当前页数
          var next=$(".next");//下一页 
          var prev=$(".prev");//上一页 
         
          // $(".total").text(total_page);//显示总页数 
          // $(".current_page").text(current_page);//当前的页数 
          
          //下一页 
          $(".next").click(function(){
              var total=$(".addItem").children(".showInfo").size();//总数据  
              var page_line=$(".footer").find(".line").text();//每页显示的数据
              var total_page= Math.ceil(total/page_line);//总页数 
              var rest=total%page_line;
              if(current_page==total_page){
                  alert("已经是最后一页了！");
                  return false;//如果大于总页数就禁用下一页 
              } 
              else{
                  var show_start=$(".show_start").text(),
                      show_end=$(".show_end").text(); 
                  current_page++;//点击下一页的时候当前页数的值就加1
                  //console.log(current_page); 
                  if(current_page==total_page){
                    $(".show_start").text(1+(current_page-1)*page_line);
                    $(".show_end").text(total);
                  }else{
                    $(".show_start").text(1+(current_page-1)*page_line);
                    $(".show_end").text(parseInt(page_line)+parseInt((current_page-1)*page_line));
                  }
                  $.each($(".showInfo"),function(index){ 
                      var start = page_line* (current_page-1);//起始范围 
                      var end = page_line * current_page;//结束范围
                      if(index >= start && index < end){//如果索引值是在start和end之间的元素就显示，否则就隐 
                          $(this).show(); 
                      }else { 
                          $(this).hide();  
                      } 
                  }); 
              }
          }); 
         
          //上一页方法 
          $(".prev").click(function(){ 
              var total=$(".addItem").children(".showInfo").size();//总数据  
              var page_line=$(".footer").find(".line").text();//每页显示的数据
              var total_page= Math.ceil(total/page_line);//总页数
              var rest=total%page_line; 
              //console.log(rest);
              if(current_page==1){ 
                alert("已经到第一页了");
                  return false; 
              }else{
                  var show_start=$(".show_start").text(),
                      show_end=$(".show_end").text();  
                  current_page--;
                  if(current_page==total_page-1){
                    $(".show_start").text(parseInt(show_start)-page_line);
                    $(".show_end").text(parseInt(show_end)-rest);
                  }else{
                    $(".show_start").text(parseInt(show_start)-page_line);
                    $(".show_end").text(parseInt(show_end)-page_line);
                  }
                  $.each($(".showInfo"),function(index){ 
                      var start = page_line* (current_page-1);//起始范围 
                      var end = page_line * current_page;//结束范围 
                      if(index >= start && index < end){//如果索引值是在start和end之间的元素就显示，否则就隐藏 
                          $(this).show(); 
                      }else { 
                          $(this).hide();  
                      } 
                  });      
              } 
                
          });
      }
  }


});



