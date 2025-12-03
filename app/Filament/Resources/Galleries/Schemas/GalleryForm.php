<?php

namespace App\Filament\Resources\Galleries\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class GalleryForm
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
                Select::make('category_id')
                    ->required()
                    ->preload()
                    ->relationship('category', 'title'),
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('images/galeri')
                    ->afterStateUpdated(self::handleFileUpload('image', 'images/galeri')),
                FileUpload::make('video')
                    ->disk('public')
                    ->directory('video/galeri')
                    ->afterStateUpdated(self::handleFileUpload('video', 'video/galeri')),
                TextInput::make('title'),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('order')
                    ->numeric(),
            ]);
    }
}
