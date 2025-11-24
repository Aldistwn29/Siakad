<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Response;

class StudentController extends Controller
{
    public function index() : Response
    {
        return inertia('Admin/Student/Index');
    }
}
