/**
 * Target page: /charts-permission-membership
 * Open Source Released as MIT License
 * @author Frank Font <room4me.com>
 */
$(document).ready(function() 
{
    
    /**
     * Get template where you only need to populate the following:
     * -- labels[]
     * -- datasets.data[]
     */
    function getStackedChartData(labels_ar, dataset_ar)
    {
        var alpha = site.account_graphs.colors.default.fill.medium_alpha;
        var datasets = dataset_ar.map(function(item, i)
        {
            return {
                'label': item.label,
                'backgroundColor': mycolors().getOneColorFromPalette(i,alpha),
                'data': item.data
            };
        });
        
        return {
            'labels': labels_ar,
            'datasets': datasets
        };
    }
    
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = null;

    function setChart( chart_typename, data, day_limit )
    {
        var found_day_count = 0;
        var rows = data['rows'];
        var labels_ar = [];
        
        var dataset_ar = [];
        
        var keys={
            'typenames':{'keys':{},'ar':[]},
            'labels':{'keys':{},'ar':[]}
        };
        
        //Harvest all the keys first
        for (var i = 0; i < rows.length; i++)
        {
            var typename = rows[i].type;
            var stack_label = rows[i].the_date;
            
            if(!keys.typenames.keys.hasOwnProperty(typename))
            {
                keys.typenames.keys[typename] = typename;
                keys.typenames.ar.push(typename);
            }
            if(!keys.labels.keys.hasOwnProperty(stack_label))
            {
                keys.labels.keys[stack_label] = stack_label;
                keys.labels.ar.push(stack_label);
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
        
        found_day_count=labels_ar.length;
        
        //Now fill in the data for each dataset
        for (var i = 0; i < rows.length; i++)
        {
            var stack_label = rows[i].the_date;
            var typename = rows[i].type;
            var dataitem = rows[i].the_count;
                        
            var stack_offset=keys.labels.keys[stack_label];
            var dataset_offset=keys.typenames.keys[typename];

            var one_dataset=dataset_ar[dataset_offset];

            one_dataset.data[stack_offset] = dataitem;
        }

        if( myChart !== null )
        {
            myChart.destroy(); 
        }
        
        var chart_data = getStackedChartData(labels_ar, dataset_ar);
        
        myChart = new Chart(ctx, {
            type: chart_typename,
            data: chart_data,
            options: {
                legend: {display: true},
                title: {
                    display: day_limit > found_day_count,
                    text: 'Only Found ' + found_day_count + " Days of Data"
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true,
                        stepSize: 1
                    }]
                }
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
            var dataUrl = site.uri.public + '/api/graph/activity/view';
            $.ajax( dataUrl )
                .done(function( data ) 
                {
                    //console.log("LOOK data = " + JSON.stringify(data));
                    setChart( typename, data , age_scope);
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
    
    $("#account-graph-select-30day-bar").click(function()
    {
        createChart('bar',30);
    }); 
    
    $("#account-graph-select-100day-bar").click(function()
    {
        createChart('bar',100);
    }); 
    
    //Pop up the default chart
    var default_typename = site.account_graphs.activities.default.typename;
    var default_age = site.account_graphs.activities.default.age;
    if (page !== null && typeof(page.chart.default.typename) !== 'undefined')
    {
        default_typename = page.chart.default.typename;
    }
    if (page !== null && typeof(page.chart.default.age) !== 'undefined')
    {
        default_age = page.chart.default.age;
    }
    if(default_typename !== 'none' && default_typename !== 'bar')
    {
        alert("Invalid chart type '" + default_typename + "' declaration!");
        default_typename='none';
    }
    createChart(default_typename, default_age);
    
});
