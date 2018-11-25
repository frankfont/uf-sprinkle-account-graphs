<?php
namespace UserFrosting\Sprinkle\AccountGraphs\Sprunje;

use UserFrosting\Sprinkle\Admin\Sprunje\GroupSprunje;

use Illuminate\Database\Capsule\Manager as Capsule;

class GroupMembershipSprunje extends GroupSprunje
{
    protected $name = 'group_membership_sprunje';

    protected $sortable = [
        'name',
        'group_id',
        'member_count'
    ];

    protected $filterable = [
        'name',
        'group_id',
        'member_count'
    ];
    
    protected function baseQuery()
    {
        $instance = $this->classMapper->createInstance('user');

        $query = $instance->newQuery();
            
        $query->select('group_id', 'groups.name', Capsule::raw('COUNT(users.id) as member_count'))
            ->groupBy('group_id','groups.name');
 
        $query->join('groups', function ($join) use ($groupId) 
        {
            $join->on('users.group_id', 'groups.id');
        });
        
        return $query;
    }
    
}
