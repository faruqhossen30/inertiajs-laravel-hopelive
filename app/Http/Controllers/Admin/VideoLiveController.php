<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Google\Cloud\Firestore\FirestoreClient;

class VideoLiveController extends Controller
{
    public function index()
    {

        return Inertia::render('Admin/VideoLive/Index');
    }
    public function stopLive($id)
    {

        $firestore =  new FirestoreClient([
            'projectId' => env('FIREBASE_PROJECT_ID')
        ]);

        $firebaseUser = $firestore->collection('gifts')->document($id)->delete();
        // return to_route('gifts.index');

        return to_route('dashboard');
    }
}
