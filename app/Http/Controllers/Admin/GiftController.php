<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Google\Cloud\Firestore\FirestoreClient;

class GiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Gift/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Gift/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     'name' => 'required',
        //     'photoURL' => 'required',
        //     'diamond' => 'required',
        // ]);

        try {
            $db = new FirestoreClient([
                'projectId' => 'mklive-ba68e',
            ]);

            $uid = 'PLnS5hpAslQgTIgaQA3MZFuw0yo1';

            $firebaseUser = $db->collection('gifts')->document($uid);

            $firebaseUser->update([
                ['path' => 'isHost', 'value' => true]
            ]);

            return to_route('admin.user.show', $uid);
        } catch (\Throwable $th) {
            dd($th);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
