'use strict'

var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({
    el: $('#graphContainer'),
    width: '100%', height: '100%', gridSize: 1,
    model: graph,
    defaultLink: new joint.dia.Link({
        attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
    }),
    // validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
    //     // Prevent linking from input ports.
    //     if (magnetS && magnetS.getAttribute('type') === 'input') return false;
    //     // Prevent linking from output ports to input ports within one element.
    //     if (cellViewS === cellViewT) return false;
    //     // Prevent linking to input ports.
    //     return magnetT && magnetT.getAttribute('type') === 'input';
    // },
    // validateMagnet: function(cellView, magnet) {
    //     // Note that this is the default behaviour. Just showing it here for reference.
    //     // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
    //     return magnet.getAttribute('magnet') !== 'passive';
    // }
});

// Create a custom element.
// ------------------------

joint.shapes.html = {};
joint.shapes.html.Element = joint.shapes.basic.Rect.extend({
    defaults: joint.util.deepSupplement({
        type: 'html.Element',
        attrs: {
            rect: { stroke: 'none', 'fill-opacity': 0 }
        },
        inPorts: [],
        outPorts: [],
    }, joint.shapes.basic.Rect.prototype.defaults)
});

// Create a custom view for that element that displays an HTML div above it.
// -------------------------------------------------------------------------

joint.shapes.html.ElementView = joint.dia.ElementView.extend({
        link: null,
        canUpdateLink: !1,
        template: ['<div class="component">', '<button class="edit glyphicon glyphicon-wrench" data-container="body" data-toggle="modal" data-target="#myModal"></button>', '<button class="close">&times;</button>','<div class="element">', '<span class=""></span>', '<span class="name"></span>', "</div>", '<div class="tools">', '<div class="create-link glyphicon glyphicon-record"></div>',"</div>", "</div>"].join(""),
        initialize: function() {
          _.bindAll(this, "updateBox"), joint.dia.ElementView.prototype.initialize.apply(this, arguments), this.$box = $(_.template(this.template)()), this.model.on("change", this.updateBox, this), this.model.on("remove", this.removeBox, this), this.updateBox()
        },
        render: function() {
          return joint.dia.ElementView.prototype.render.apply(this, arguments), this.paper.$el.prepend(this.$box), this.updateBox(), this.$box.find(".create-link").on("mousedown", this.createLink.bind(this)), this.$box.find(".edit").on("click", this.triggerOpenDetail.bind(this)), this.$box.find(".close").on("click", _.bind(this.model.remove, this.model)), this.$box.attr("data-type", this.model.get("componentType")), this.$box.find(".image").html('<img alt="MySQL" src="' + this.model.get("logo") + '">'), this.$box.find(".name").html(this.model.get("name")), this.$box.addClass(this.model.get("binary") ? "binary" : ""), this.paper.$el.mousemove(this.onMouseMove.bind(this)), this.paper.$el.mouseup(this.onMouseUp.bind(this)), this.updateName(), this
        },
        updateName: function() {
          this.$box.find(".name").html(this.model.get("name"))
        },
        updateBox: function() {
          var bbox = this.model.getBBox();
          this.updateName(), this.$box.css({
            width: bbox.width,
            height: bbox.height,
            left: bbox.x,
            top: bbox.y,
            transform: "rotate(" + (this.model.get("angle") || 0) + "deg)"
          })
        },
        removeBox: function() {
          this.model.trigger("onRemove"), this.$box.remove()
        },
        triggerOpenDetail: function(e) {
          // e.preventDefault(), this.model.trigger("onOpenDetail")
        },
        createLink: function(evt) {
          var self = this,
            paperOffset = this.paper.$el.offset(),
            targetOffset = $(evt.target).offset(),
            x = targetOffset.left - paperOffset.left,
            y = targetOffset.top - paperOffset.top;
          this.link = new joint.dia.Link({
            source: {
              id: this.model.get("id")
            },
            target: g.point(x, y),
            z: -1,
            attrs: {
              ".connection": {
                stroke: "#49ae80",
                "stroke-width": 6,
                opacity: .5
              },
              ".marker-target": {
                stroke: "#49ae80",
                fill: "#49ae80",
                "stroke-width": 2,
                d: "M 10 0 L 0 5 L 10 10 z"
              },
              ".marker-source": {
                display: "none"
              },
              ".marker-vertices": {
                display: "none"
              }
            }
          }), this.paper.model.addCell(this.link), this.link.on("remove", function(lnk) {
            self.model.trigger("removeLink", lnk.get("source").id, lnk.get("target").id)
          }), this.link.on("change:target", function(lnk) {
            var target = lnk.get("target");
            if ("undefined" == typeof target.id) {
              var rect = self.paper.findViewsFromPoint(g.point(target.x, target.y))[0];
              if (!rect || lnk.get("source").id === rect.model.get("id")) return;
              return target = rect, target.$el.addClass("arrowOver"), void lnk.set("target", {
                id: target.model.get("id")
              })
            }
            self.model.trigger("createLink", target.id)
          }), this.canUpdateLink = !0
        },
        onMouseUp: function() {
          this.canUpdateLink = !1, this.paper.$el.find(".component").css("z-index", 1)
        },
        onMouseMove: function(evt) {
          if (this.link && this.canUpdateLink && !(evt.clientX <= 10)) {
            var droppableDocumentOffset = $(board).offset();
            console.log(evt.offsetX + "," + evt.clientX), this.link.set("target", g.point(evt.clientX - droppableDocumentOffset.left, evt.clientY - droppableDocumentOffset.top))
          }
        }
      });

// joint.shapes.basic.Rect = joint.shapes.basic.Generic.extend({

//     markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',
    
//     defaults: joint.util.deepSupplement({
    
//         type: 'basic.Rect',
//         attrs: {
//             'rect': { fill: 'white', stroke: 'black', 'follow-scale': true, width: 80, height: 40 },
//             'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle' }
//         }
        
//     }, joint.shapes.basic.Generic.prototype.defaults)
// });
     
var m = [];
m[0] = new joint.shapes.html.Element({ /*position: { x: 80, y: 80 },*/ size: { width: 170, height: 100 }, label: 'I am HTML', select: 'one',inPorts: ['in1','in2'],
    outPorts: ['out'] });

$(".component").draggable({
  helper: "clone",
  cursor: "move",
  drag: function(e, ui) {
    // console.log(ui);
  }
});

$("#graphContainer").droppable({
  drop: function(event, ui) {
    // var draggable = $(ui.draggable).clone();
    // draggable.appendTo(this);
    // debugger
    var position = ui.position;
    var newPosX = ui.offset.left - $(this).offset().left;
    var newPosY = ui.offset.top - $(this).offset().top;
    var elem = graph.getElements().length;
    if (elem == 0) {
      m[0].position(newPosX, newPosY);
      graph.addCell(m[0]);
    } else {
      m[elem + 1] = m[0].clone();
      m[elem + 1].position(newPosX, newPosY);
      graph.addCell(m[elem + 1]);
    }
  }
});