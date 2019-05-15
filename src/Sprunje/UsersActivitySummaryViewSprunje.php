<?php
namespace UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Sprunje;

use UserFrosting\Sprinkle\Admin\Sprunje\ActivitySprunje;

use Illuminate\Database\Capsule\Manager as Capsule;

class UsersActivitySummaryViewSprunje extends ActivitySprunje
{
    protected $name = 'users_activity_summary_view_sprunje';

    protected $sortable = [
        'user_name',
        'type',
        'the_count'
    ];

    protected $filterable = [
        'user_name',
        'type',
        'the_count'
    ];
    
    protected function baseQuery()
    {

        $date7DaysAgo = date('Y-m-d', strtotime('-7 days'));
        //$date2DaysAgo = date('Y-m-d', strtotime('-2 days'));
        
        error_log("LOOK DEBUG sql date7DaysAgo = " . $date7DaysAgo);
        
        $instance = $this->classMapper->createInstance('activity');
        $query = $instance->newQuery();
        
        $query->join('users', function ($join)
        {
            $join->on('users.id', 'activities.user_id');
        });
                
        $query->select('activities.user_id', 'users.user_name', 'activities.type', Capsule::raw('COUNT(activities.id) as the_count'))
            ->groupBy('users.user_name', 'activities.user_id', 'activities.type');
        $query->orderBy('users.user_name', 'activities.user_id', 'activities.type');
        $query->where(Capsule::raw("DATE(activities.occurred_at)"),">=",$date7DaysAgo);

        error_log("LOOK DEBUG sql stuff " . $query->toSql());
        
        return $query;
    }
    
}
