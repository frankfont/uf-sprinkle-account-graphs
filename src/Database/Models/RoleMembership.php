<?php
/**
 * UserFrosting (http://www.userfrosting.com)
 *
 * @link      https://github.com/userfrosting/UserFrosting
 * @license   https://github.com/userfrosting/UserFrosting/blob/master/licenses/UserFrosting.md (MIT License)
 */
namespace UserFrosting\Sprinkle\AccountGraphs\Database\Models;

use Illuminate\Database\Capsule\Manager as Capsule;
use UserFrosting\Sprinkle\Core\Database\Models\Model;

/**
 * RoleMembership Class
 *
 * Represents a role memberships
 */
class RoleMembership extends Model
{
    protected $table = "role_users";
    public $timestamps = true;
    
    /**
     * Query to return all user counts for each role
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function memberUserCounts($query)
    {
        return $query->join('roles', function ($join) {
            $join->on('role_users.role_id', 'roles.id');
        });
    }
}
