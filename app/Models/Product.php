<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = ['name', 'description', 'price', 'quantity', 'category_id'];


    public static function getProductsWithCategory()
    {
        return DB::table('products')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->join('responsibles', 'products.responsible_id', '=', 'responsibles.id')
            ->select('products.*',  'categories.name as category_name', 'responsibles.name as responsible_name')
            ->orderBy('id', 'ASC')
            ->get();
    }
}
