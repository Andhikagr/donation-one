<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Gallery extends Model
{
    protected $fillable = [
        'category_id',
        'image',
        'video',
        'title',
        'description',
        'order',
    ];

    protected $appends = ['image_url', 'video_url',];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }
    public function getVideoUrlAttribute()
    {
        return $this->video ? asset('storage/' . $this->video) : null;
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
