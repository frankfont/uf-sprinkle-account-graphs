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
    function getChartData(labels_ar, data_ar)
    {
        var alpha = site.account_graphs.colors.default.fill.medium_alpha;
        return {
            'labels': labels_ar,
            'datasets': [{
                'label': '# of Roles',
                'data': data_ar,
                'backgroundColor': mycolors().getColorPalette(data_ar.length,alpha),
                'borderColor': mycolors().getColorPalette(data_ar.length,1),
                'borderWidth': 1
            }]
        };
    }
    
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = null;

    function setChart( typename, data )
    {
        
        var rows = data['rows'];
        var labels_ar = [];
        var data_ar = [];
        
        for (var i = 0; i < rows.length; i++)
        {
            var label = rows[i].name + '(' + rows[i].permission_id +')';
            var dataitem = rows[i].member_count;
            labels_ar.push(label);
            data_ar.push(dataitem);
        }
        
        if( myChart !== null )
        {
            myChart.destroy(); 
        }
        
        var scales;
        if( typename !== 'bar' )
        {
            scales = {};
        } else {
            scales = {
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            stepSize: 1
                        }
                    }]
                };
        }
        
        myChart = new Chart(ctx, {
            type: typename,
            data: getChartData(labels_ar, data_ar),
            options: {
                legend: {display:typename == 'pie'},
                'title': {
                    display: true,
                    text: 'Roles having Assigned Permission'
                },
                scales: scales
            }
        });
    }

    function createChart( typename )
    {
        $(".account-graph-selected")
                .addClass("account-graph-unselected")
                .removeClass("account-graph-selected");
        $("#account-graph-select-"+typename).removeClass("account-graph-unselected").addClass("account-graph-selected");
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
            var dataUrl = site.uri.public + '/api/graph/permission/memberships';
            $.ajax( dataUrl )
                .done(function( data ) 
                {
                    setChart( typename, data );
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

    $("#account-graph-select-bar").click(function()
    {
        createChart('bar');
    }); 
    
    $("#account-graph-select-pie").click(function()
    {
        createChart('pie');
    }); 
    
    //Pop up the default chart
    var default_typename = site.account_graphs.permissions.default.typename;
    if (page !== null && typeof(page.chart.default.typename) !== 'undefined')
    {
        default_typename = page.chart.default.typename;
    }
    createChart(default_typename);
    
});
