/**
 * Target page: /charts-permission-membership
 * Open Source Released as MIT License
 * @author Frank Font <room4me.com>
 */
$(document).ready(function() 
{
    var customTootipMarkupMap={};
    var legendOffsetToUsername=[];
    function setCustomTooltips(enabled)
    {
        var customFunction = function(tooltip) 
        {
           
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');
            
            // Hide if no tooltip
            if (tooltip.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            if (tooltip.dataPoints == 'undefined')
            {
                return {};
            }
            
            var username=null;
            var customBodyInfo=null;
            var dataIndex=tooltip.dataPoints[0].index;
            if(legendOffsetToUsername[dataIndex] != 'undefined')
            {
                username=legendOffsetToUsername[dataIndex];
                customBodyInfo=customTootipMarkupMap[username];
            }
            
            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltip.yAlign) {
                tooltipEl.classList.add(tooltip.yAlign);
            } else {
                tooltipEl.classList.add('no-transform');
            }
            function getBody(bodyItem) 
            {
                return bodyItem.lines;
            }
            // Set Text
            if (tooltip.body) 
            {
                var titleLines = tooltip.title || [];
                var bodyLines;
                if(customBodyInfo === null)
                {
                    bodyLines = tooltip.body.map(getBody);
                } else {
                    bodyLines = [];
                    bodyLines.push([]);
                    bodyLines[0].push(username)
                    for(var typename in customBodyInfo)
                    {
                        bodyLines[0].push(typename + ": " + customBodyInfo[typename]);
                    }
                }

                var innerHtml = '<thead>';
                titleLines.forEach(function(title) 
                {
                    innerHtml += '<tr><th>' + title + '</th></tr>';
                });
                innerHtml += '</thead><tbody>';
                bodyLines.forEach(function(body, i) 
                {
                    var colors = tooltip.labelColors[i];
                    var style = 'background:' + colors.backgroundColor;
                    style += '; border-color:' + colors.borderColor;
                    style += '; border-width: 2px';
                    var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                    innerHtml += '<tr><td>' + span + body + '</td></tr>';
                });
                innerHtml += '</tbody>';
                var tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
            }
            var positionY = this._chart.canvas.offsetTop;
            var positionX = this._chart.canvas.offsetLeft;
            
            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.left = positionX + tooltip.caretX + 'px';
            tooltipEl.style.top = positionY + tooltip.caretY + 'px';
            tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
            tooltipEl.style.fontSize = tooltip.bodyFontSize;
            tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
            tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
        };
        if(!enabled)
        {
            Chart.defaults.global.tooltips.custom = null;
        } else {
            Chart.defaults.global.tooltips.custom = customFunction;
        }
    }
    
    /**
     * Get template where you only need to populate the following:
     * -- labels[]
     * -- datasets.data[]
     */
    function getStackedChartData(labels_ar, dataset_ar)
    {
        var alpha = site.account_graphs.colors.default.fill.medium_alpha;
        var datasets = dataset_ar.map(function(item, i){
            return {
                'label': item.label,
                'data': item.data,
                'backgroundColor': mycolors().getOneColorFromPalette(i,alpha),
                //'borderColor': mycolors().getOneColorFromPalette(i,1),
                'borderWidth': 1
            };
        });
        
        return {
            'labels': labels_ar,
            'datasets': datasets
        };
    }
    
    /**
     * Get template where you only need to populate the following:
     * -- labels[]
     * -- datasets.data[]
     */
    function getSimpleChartData(labels_ar, data_ar)
    {
        return {
            'labels': labels_ar,
            'datasets': [{
                'label': '# of Users',
                'data': data_ar,
                'backgroundColor': mycolors().getColorPalette(data_ar.length,.2),
                'borderColor': mycolors().getColorPalette(data_ar.length,1),
                'borderWidth': 1
            }]
        };
    }    
    
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = null;

    function setChart( chart_typename, data , age_scope)
    {
        //Clear our custom tooltip variables now
        customTootipMarkupMap={};
        legendOffsetToUsername=[];
    
        var rows = data['rows'];
        var labels_ar = [];
        
        var dataset_ar = [];
        
        var keys={
            'typenames':{'keys':{},'ar':[]},
            'labels':{'keys':{},'ar':[],'maps':{}}
        };
        
        //Harvest all the keys first
        for (var i = 0; i < rows.length; i++)
        {
            var typename = rows[i].type;
            var stack_label = rows[i].user_name;
            
            if(!keys.typenames.keys.hasOwnProperty(typename))
            {
                keys.typenames.keys[typename] = typename;
                keys.typenames.ar.push(typename);
            }
            if(!keys.labels.keys.hasOwnProperty(stack_label))
            {
                keys.labels.keys[stack_label] = stack_label;
                keys.labels.ar.push(stack_label);
                keys.labels.maps[stack_label] = 0;
            }
        }
        
        //Create sorted maps of our keys
        keys.typenames.ar.sort();
        keys.labels.ar.sort();
        for (var i = 0; i < keys.labels.ar.length; i++)
        {
            var stack_label=keys.labels.ar[i];
            keys.labels.keys[stack_label]=i;
            labels_ar.push(stack_label);
        }
        for (var i = 0; i < keys.typenames.ar.length; i++)
        {
            var typename=keys.typenames.ar[i];
            keys.typenames.keys[typename]=i;
            var one_dataset={
                    'label':typename,
                    'data':new Array(keys.labels.ar.length).fill(0)
                };
            dataset_ar.push(one_dataset);
        }

        //Get summarized activity counts per user
        for (var i = 0; i < rows.length; i++)
        {
            var stack_label = rows[i].user_name;
            var the_count = rows[i].the_count;
            var typename = rows[i].type;
            if(!customTootipMarkupMap.hasOwnProperty(stack_label))
            {
                customTootipMarkupMap[stack_label] = {};
            }
            if(!customTootipMarkupMap[stack_label].hasOwnProperty(typename))
            {
                customTootipMarkupMap[stack_label][typename] = 0;
            }
            customTootipMarkupMap[stack_label][typename] += the_count;
            keys.labels.maps[stack_label]+=the_count;
        }
        var count_ar = [];
        legendOffsetToUsername=[];
        for (var i = 0; i < keys.labels.ar.length; i++)
        {
            var stack_label = keys.labels.ar[i];
            count_ar.push(keys.labels.maps[stack_label]);
            legendOffsetToUsername.push(stack_label);
        }
        count_ar.sort(function(a, b){return b-a});
        
        //Get map sorted by most active to least active
        var most_active = [];
        var max_include = 10;
        var includedMap={};
        for (var inctrack=0 ; inctrack < max_include; inctrack++)
        {
            var matchthis = count_ar[inctrack];
            for (var i = 0; i < count_ar.length && inctrack < max_include; i++)
            {
                
                var stack_label = keys.labels.ar[i];
                var thiscount = keys.labels.maps[stack_label];
                if( thiscount >= matchthis && !includedMap.hasOwnProperty(stack_label))
                {
                    includedMap[stack_label] = stack_label;
                    most_active.push(stack_label);
                }
            }
        }
        
        //Now, alter the sort keys array
        var arLen = keys.labels.ar.length;
        for (var i=0; i<arLen; i++)
        {
            var stack_label = most_active[i];
            keys.labels.keys[stack_label]=i;
            keys.labels.ar[i]=stack_label;
            labels_ar[i]=stack_label;
            legendOffsetToUsername[i]=stack_label;
        }
        
        var found_user_count=labels_ar.length;
        var included_user_count=most_active.length;
        
        //Now fill in the data for each dataset
        var tooltips;
        var scales;
        var chart_data;
        if(chart_typename == 'pie')
        {
            tooltips = {
                    enabled: false,
		};
            setCustomTooltips(true);
            scales = {};
            var data_ar = [];
            
            //Just aggregated activity
            for (var i = 0; i < keys.labels.ar.length; i++)
            {
                var stack_label = keys.labels.ar[i];
                var the_count = keys.labels.maps[stack_label];

                data_ar.push(the_count);                
            }    
        
            chart_data = getSimpleChartData(labels_ar, data_ar);
            
        } else {
            
            tooltips = {
                    mode: 'index',
                    intersect: false
                };
            setCustomTooltips(false);
            scales = {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                };
            
            //With type detail in stacked bar 
            for (var i = 0; i < rows.length; i++)
            {
                var stack_label = rows[i].user_name;
                var typename = rows[i].type;
                var dataitem = rows[i].the_count;

                var stack_offset=keys.labels.keys[stack_label];
                var dataset_offset=keys.typenames.keys[typename];

                var one_dataset=dataset_ar[dataset_offset];

                one_dataset.data[stack_offset] = dataitem;
            }
            
            chart_data = getStackedChartData(labels_ar, dataset_ar);
            
        }
        
        if( myChart !== null )
        {
            myChart.destroy(); 
        }
        
        myChart = new Chart(ctx, {
            type: chart_typename,
            data: chart_data,
            options: {
                legend: {display: true},
                title: {
                    display: true,
                    text: 'Most Active Users in ' + age_scope + ' Day Scope'
                },
                tooltips: tooltips,
                responsive: true,
                scales: scales
            }
        });
    }

    function createChart( typename , age_scope )
    {
        $(".account-graph-selected")
                .addClass("account-graph-unselected")
                .removeClass("account-graph-selected");
        var clicked_elem_id;
        if(typename === 'none')
        {
            clicked_elem_id="#account-graph-select-"+typename;
        } else {
            clicked_elem_id="#account-graph-select-"+age_scope+"day-"+typename;
        }
        $(clicked_elem_id).removeClass("account-graph-unselected").addClass("account-graph-selected");
        
        if( typename === 'none' )
        {
            
            //Hide any existing chart
            $("#myChart").hide("slow");
            
        } else {
            
            //Lets draw a chart
            if( myChart !== null )
            {
                //Remove the existing chart
                myChart.destroy(); 
            }
            $("#myChart").show("slow");
            
            //Draw the chart from data query result now
            var dataUrl = '/api/graph/users-activity-summary/view';
            $.ajax( dataUrl )
                .done(function( data ) 
                {
                    //console.log("LOOK data = " + JSON.stringify(data));
                    setChart( typename, data, age_scope);
                })
                .fail(function() {
                    console.log( "error getting data from " + dataUrl );
                })
                .always(function() {
                    //alert( "complete" );
                    console.log( "got data from " + dataUrl );
                });
        }
    }
        
    $("#account-graph-select-none").click(function()
    {
        createChart('none');
    }); 

    $("#account-graph-select-7day-bar").click(function()
    {
        createChart('bar',7);
    }); 
    
    $("#account-graph-select-7day-pie").click(function()
    {
        createChart('pie',7);
    }); 
    
    //Pop up the default chart
    var default_typename = site.account_graphs.users.default.typename;
    var default_age = site.account_graphs.users.default.age;
    if (page !== null && typeof(page.chart.default.typename) !== 'undefined')
    {
        default_typename = page.chart.default.typename;
    }
    if (page !== null && typeof(page.chart.default.age) !== 'undefined')
    {
        default_age = page.chart.default.age;
    }
    createChart(default_typename, default_age);
    
});
