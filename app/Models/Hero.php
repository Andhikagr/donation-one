<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    protected $fillable = [
        'image',
        'title',
        'subtitle',
        'button_text',
        'button_link'
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }
}
