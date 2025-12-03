<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'parent_id',
    ];

    // Relasi ke kategori induk (self-referencing)
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Relasi ke kategori anak-anak
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
    public function news()
    {
        return $this->hasMany(Article::class);
    }

    public function infos()
    {
        return $this->hasMany(Info::class, 'category_id');
    }
    public function galleries()
    {
        return $this->hasMany(gallery::class, 'category_id');
    }


    protected static function booted()
    {
        // Saat create: buat slug dari title jika belum diset
        static::creating(function ($category) {
            if (empty($category->slug) && !empty($category->title)) {
                $category->slug = Str::slug($category->title);
            }
        });

        // Saat update: regenerasi slug jika title berubah
        static::updating(function ($category) {
            if ($category->isDirty('title') && !empty($category->title)) {
                $category->slug = Str::slug($category->title);
            }
        });
    }
}
