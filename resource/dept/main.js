require.config({
	baseUrl: 'resource',
    urlArgs: 'version=20150811',
    paths: {
        jquery: 'libs/jquery-1.9.1',
        data: 'dept/data',
        renderHtml: 'dept/renderHtml'
    }
});

require(['jquery','data','renderHtml'],function($,data,renderHtml){
        renderHtml.init();
});

