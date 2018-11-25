<?php
namespace UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Sprunje;

use UserFrosting\Sprinkle\Admin\Sprunje\ActivitySprunje;

use Illuminate\Database\Capsule\Manager as Capsule;

class ActivityViewSprunje extends ActivitySprunje
{
    protected $name = 'activity_view_sprunje';

    protected $sortable = [
        'the_date',
        'type',
        'the_count'
    ];

    protected $filterable = [
        'the_date',
        'type',
        'the_count'
    ];
    
    protected function baseQuery()
    {

        $instance = $this->classMapper->createInstance('activity');
        $query = $instance->newQuery();
        $query->select(Capsule::raw('DATE(activities.occurred_at) as the_date'), 'activities.type', Capsule::raw('COUNT(activities.user_id) as the_count'))
            ->groupBy(Capsule::raw('DATE(activities.occurred_at)'), 'activities.type');
        $query->orderBy(Capsule::raw('DATE(activities.occurred_at)'),'activities.type');

        error_log("LOOK DEBUG sql stuff " . $query->toSql());
        
        return $query;
    }
    
}
