<?php

namespace App\Filament\Resources\Testimonis\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class TestimoniForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name'),
                TextInput::make('status'),
                Textarea::make('message')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image(),
                TextInput::make('video'),
            ]);
    }
}
