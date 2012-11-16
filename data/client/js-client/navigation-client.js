/**
 * [SweepSite description]
 * @type {[type]}
 */
Navigation = Backbone.View.extend({
    template : _.template($("#template-navigation").html()),
    events: {
        "click #navigation-button": "initNavigation"
    },
    initialize: function(opt) {
        this.socket = opt.socket;
        this.render();
        this.input = this.$("#navigation-seed");
        this.$resultNavigation = this.$("#result-navigation");
    },
    render: function() {
        this.$el.html(this.template());
    },
     initNavigation: function(a) {
        var self = this;
        self.$resultNavigation.show();
        var $resultNavigationList = self.$resultNavigation.find("tbody");

        this.socket.sender('Navigation', {url :this.input.val()}, function(result) {

            var a= document.createElement("iframe");
            $(a).css({visibility:"hidden"});
            $("#content").append(a);
            b=a.contentWindow.document;
            b.open();
           
            $(a.contentWindow).load(function(){
               var g=$(a).contents().find("body")[0];
               var queue = html2canvas.Parse(g);
              var canvas = html2canvas.Renderer(queue, { elements: { length: 10} });
                    var img = canvas.toDataURL();
                    $("#content").empty();
                    $("#img").attr("src", img);
            });
            result.html=result.html.replace(/\<script/gi,"<!--<script");
            result.html=result.html.replace(/\<\/script\>/gi,"<\/script>-->")
            b.write(result.html);
            b.close();

            var tr = "<tr>" + 
                        "<td>" + result.url + "</td><td>"+ result.host + "</td>" +
                        "<td>"+ result.status + "</td>" +
                    "</tr>";
            $resultNavigationList.prepend(tr);
        });
    }
});