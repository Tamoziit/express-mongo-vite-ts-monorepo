import { Types } from "mongoose";
import { Request } from "express";

export interface AdminToken {
    password: string
}

export interface UserSignupBody {
    fullName: string;
    username: string;
    email: string;
    password: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
}

export interface UserLoginBody {
   email: string;
    password: string; 
}