<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agora;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class SettingController extends Controller
{
    public function index(): Response
    {
        $agora = Agora::first();

        return Inertia::render('Admin/SettingPage', ['agora' => $agora]);
    }
    public function agora(): Response
    {
        return Inertia::render('Admin/Settings/Agora');
    }
}
