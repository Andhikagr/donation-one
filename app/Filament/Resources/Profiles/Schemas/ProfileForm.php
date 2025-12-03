<?php

namespace App\Filament\Resources\Profiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title'),
                TextInput::make('name'),
                Textarea::make('description')
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->image(),
                TextInput::make('video'),
                TextInput::make('address'),
                Textarea::make('google_maps')
                    ->columnSpanFull(),
                TextInput::make('day'),
                TextInput::make('open_time'),
                TextInput::make('close_time'),
                TextInput::make('phone')
                    ->tel(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email(),
                TextInput::make('youtube'),
                TextInput::make('facebook'),
                TextInput::make('instagram'),
                TextInput::make('tiktok'),
                TextInput::make('twitter'),
                TextInput::make('order')
                    ->numeric(),
            ]);
    }
}
