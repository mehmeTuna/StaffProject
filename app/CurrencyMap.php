<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CurrencyMap extends Model
{
    protected $fillable = ['id', 'symbol', 'name_plural', 'code', 'symbol_native', 'decimal_digits', 'name', 'rounding', 'codeNum', 'created_at', 'updated_at', 'active'];
    protected $visible = ['id', 'symbol', 'name_plural', 'code', 'symbol_native', 'decimal_digits', 'name', 'rounding', 'codeNum', 'created_at', 'updated_at', 'active'];
    protected $table = "currencymap";
    protected $primaryKey = "id";
    public $timestamps = true ;
}
