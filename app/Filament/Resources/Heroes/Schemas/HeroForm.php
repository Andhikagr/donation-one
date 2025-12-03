<?php

namespace App\Filament\Resources\Heroes\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;

class HeroForm
{

    protected static function handleFileUpload(string $field, string $directory)
    {
        return function ($state, $set, $get) use ($field, $directory) {
            $record = $get('record');

            if ($record && $record->$field && $record->$field !== $state) {
                Storage::disk('public')->delete($directory . '/' . $record->$field);
            }

            $set($field, $state);
        };
    }
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('images/hero')
                    ->afterStateUpdated(self::handleFileUpload('image', 'images/hero')),
                TextInput::make('title'),
                TextInput::make('subtitle'),
                TextInput::make('button_text'),
                TextInput::make('button_link'),
            ]);
    }
}
