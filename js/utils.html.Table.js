// html
// $.utils.html
// .Table
(function ($) {
    var Table = {};
    // 固定表格标题
    function fixTableHeader(tables, param) {
        var defaults = {
            head: true,
            foot: false,
            left: 0,
            right: 0
        };

        var settings = $.extend({}, defaults, param);

        $(tables).each(function () {
            settings.table = this;
            settings.parent = $("<div></div>");
            setParent();

            if (settings.head == true)
                fixHead();

            if (settings.foot == true)
                fixFoot();

            if (settings.left > 0)
                fixLeft();

            if (settings.right > 0)
                fixRight();

            // self.setCorner();

            $(settings.parent).trigger("scroll");

            $(window).resize(function () {
                $(settings.parent).trigger("scroll");
            });
        });

        function setParent() {
            var container = $(settings.table).parent();
            var parent = $(settings.parent);
            var table = $(settings.table);

            table.before(parent);
            parent.append(table);
            parent
                .css({
                    'width': '100%',
                    'height': container.css("height"),
                    'overflow': 'scroll',
                    'max-height': container.css("max-height"),
                    'min-height': container.css("min-height"),
                    'max-width': container.css('max-width'),
                    'min-width': container.css('min-width')
                });

            parent.scroll(function () {
                var scrollWidth = parent[0].scrollWidth;
                var clientWidth = parent[0].clientWidth;
                var scrollHeight = parent[0].scrollHeight;
                var clientHeight = parent[0].clientHeight;
                var top = parent.scrollTop();
                var left = parent.scrollLeft();

                if (settings.head)
                    this.find("thead tr > *").css("top", top);

                if (settings.foot)
                    this.find("tfoot tr > *").css("bottom", scrollHeight - clientHeight - top);

                if (settings.left > 0)
                    settings.leftColumns.css("left", left);

                if (settings.right > 0)
                    settings.rightColumns.css("right", scrollWidth - clientWidth - left);
            }.bind(table));
        }

        function fixHead() {
            var thead = $(settings.table).find("thead");
            var tr = thead.find("tr");
            var cells = thead.find("tr > *");

            setBackground(cells);
            cells.css({
                'position': 'relative'
            });
        }

        function fixFoot() {
            var tfoot = $(settings.table).find("tfoot");
            var tr = tfoot.find("tr");
            var cells = tfoot.find("tr > *");

            setBackground(cells);
            cells.css({
                'position': 'relative'
            });
        }

        function fixLeft() {
            var table = $(settings.table);

            var fixColumn = settings.left;

            settings.leftColumns = $();

            for (var i = 1; i <= fixColumn; i++) {
                settings.leftColumns = settings.leftColumns
                    .add(table.find("tr > *:nth-child(" + i + ")"));
            }

            var column = settings.leftColumns;

            column.each(function (k, cell) {
                var cell = $(cell);

                setBackground(cell);
                cell.css({
                    'position': 'relative'
                });
            });
        }

        function fixRight() {
            var table = $(settings.table);

            var fixColumn = settings.right;
            settings.rightColumns = $();

            for (var i = 1; i <= fixColumn; i++) {
                settings.rightColumns = settings.rightColumns
                    .add(table.find("tr > *:nth-last-child(" + i + ")"));
            }

            var column = settings.rightColumns;

            column.each(function (k, cell) {
                var cell = $(cell);

                setBackground(cell);
                cell.css({
                    'position': 'relative'
                });
            });

        }

        function setBackground(elements) {
            elements.each(function (k, element) {
                var element = $(element);
                var parent = $(element).parent();

                var elementBackground = element.css("background-color");
                elementBackground = (elementBackground == "transparent" || elementBackground == "rgba(0, 0, 0, 0)") ? null : elementBackground;

                var parentBackground = parent.css("background-color");
                parentBackground = (parentBackground == "transparent" || parentBackground == "rgba(0, 0, 0, 0)") ? null : parentBackground;

                var background = parentBackground ? parentBackground : "white";
                background = elementBackground ? elementBackground : background;

                element.css("background-color", background);
            });
        }
    }
    // 表格颜色样式类
    function TableCsser() {
        var clickClass = "";
        var moveClass = "";
        var clickTR ;
        var moveTR ;
        var _self = this;
        this.table = null;
        this.cssOver = "";
        this.cssCheck = "";
        this.setTable = function (table) {
            _self.table = table;
            $(table).children("tr").on("onmouseover", rowHover).on("onmouseleave", rowChecked)
                .on("onclick", rowChecked);
        }

        function rowHover(me) {
            if (clickTR != me) {
                if (moveTR != me) {
                    moveClass = me.className;
                    moveTR = me;
                    me.className = _self.cssOver;
                }
            }
        }
        function rowLeave(me) {
            if (clickTR != me) {
                moveTR = null;
                me.className = moveClass;
            }
        }
        function rowChecked(me) {
            if (clickTR != me) {
                if (clickTR) {
                    clickTR.className = clickClass;
                }
                clickTR = me;
                clickClass = moveClass;
            }
            me.className = obj.cssCheck;
        }
    }
    // 设置表格颜色样式
    function cssTable(tables, params) {
        var def = { checked: "", over: "" };
        var _settings = $.extend({}, def, params);
        $(tables).each(function () {
            var _csser = new TableCsser();
            _csser.setTable(this);
            _csser.cssOver = _settings.over;
            _csser.cssCheck = _settings.cssCheck;
        });
    }

    Table.fixHeader = fixTableHeader;
    Table.cssTable = cssTable;
    if (!$.utils.html) $.utils.html = {};
    $.extend($.utils.html,
        {
            Table: Table,
        });
})(jQuery);