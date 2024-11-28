<?php

use App\Http\Controllers\Admin\AgentController;
use App\Http\Controllers\Admin\AgoraController;
use App\Http\Controllers\Admin\AudioLiveController;
use App\Http\Controllers\Admin\AvatarController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboarController;
use App\Http\Controllers\Admin\DepositController;
use App\Http\Controllers\Admin\EmojiController;
use App\Http\Controllers\Admin\EntryFrameController;
use App\Http\Controllers\Admin\GiftAnimationController;
use App\Http\Controllers\Admin\GiftController;
use App\Http\Controllers\Admin\HostController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TestController;
use App\Http\Controllers\Admin\TopupController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VideoLiveController;
use App\Http\Controllers\Admin\WallpeperController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('dashboard', [DashboarController::class, 'index'])->name('dashboard');
    Route::resource('category', CategoryController::class);
    Route::get('settings', [SettingController::class, 'index'])->name('settings');
    Route::get('setting/agora', [SettingController::class, 'agora'])->name('settings.agora.create');
    Route::post('setting/agora', [AgoraController::class, 'store'])->name('settings.agora.store');


    Route::prefix('users')->group(function(){
        Route::get('/', [UserController::class, 'index'])->name('admin.users');
        Route::post('/disable/{uid}', [UserController::class, 'disableAccount'])->name('admin.user.disable');
    });

    // Users

    Route::get('hosts', [HostController::class, 'index'])->name('admin.hosts');
    Route::get('agents', [AgentController::class, 'index'])->name('admin.agents');

    Route::get('topups', [TopupController::class, 'index'])->name('admin.topups');

    Route::resource('avatar', AvatarController::class);
    Route::resource('entry/frame', EntryFrameController::class);
    Route::resource('gift/animation', GiftAnimationController::class);

    Route::get('audio/live', [AudioLiveController::class, 'index'])->name('admin.audio.live');
    Route::get('video/live', [VideoLiveController::class, 'index'])->name('admin.video.live');


    Route::get('user/{uid}', [UserController::class, 'show'])->name('admin.user.show');

    Route::post('user/{uid}/sethost', [UserController::class, 'setAsHost'])->name('admin.user.sethost');

    Route::get('{uid}/deposit/user', [DepositController::class, 'create'])->name('admin.user.deposit');
    Route::post('{uid}/deposit/user', [DepositController::class, 'store'])->name('admin.user.deposit.store');

    Route::get('{uid}/deposit/topup', [DepositController::class, 'createTopup'])->name('admin.topup.deposit');
    Route::post('{uid}/deposit/topup', [DepositController::class, 'storeTopup'])->name('admin.topup.deposit.store');




    Route::get('test', [TestController::class, 'index'])->name('admin.test');

    Route::resource('gifts', GiftController::class);
    Route::resource('emojis', EmojiController::class);
    Route::resource('wallpapers', WallpeperController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
