<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employment extends Model
{
    protected $visible = ['Manager', 'Business', 'Comment', 'OperationTime', 'Status', 'Staff'];
    protected $fillable = ['Manager', 'Business', 'Comment', 'OperationTime', 'Status', 'Staff'];
    protected $table = "employment";
    protected $primaryKey = "Id";
    public $timestamps = true ;
}
