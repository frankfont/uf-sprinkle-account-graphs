<?php

namespace UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Database\Models;

use UserFrosting\Sprinkle\Core\Database\Models\Model;

class AccountGraphsUserprefsAux extends Model
{
    public $timestamps = false;

    /**
     * @var string The name of the table for the current model.
     */
    protected $table = 'account_graphs_userprefs';

    protected $fillable = [
        'chart_groups',
        'chart_roles',
        'chart_permissions'
    ];
}
