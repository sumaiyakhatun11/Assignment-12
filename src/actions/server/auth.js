"use server";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/dbConnect";

export const postUser = async( payLoad) =>{
    console.log(payLoad);

    if (!payLoad?.email || !payLoad?.password || !payLoad?.nidNo) {
        return {
            success: false,
            message: "Missing required fields"
        };
    }

    if (payLoad.password.length < 6 || !/[A-Z]/.test(payLoad.password) || !/[a-z]/.test(payLoad.password)) {
        return {
            success: false,
            message: "Password must be 6+ chars with uppercase and lowercase letters"
        };
    }

    // 1.Check User Exists

    const isExist= await dbConnect("users").findOne({email:payLoad.email});
    if (isExist) {
        return{
            success:  false,
            message: "User already exists"
        }
    }

    const hashedPassword= await bcrypt.hash(payLoad.password,10);

    // 2. If not create user
    const newUser={
        ...payLoad,
        createdAt: new Date().toISOString(),
        password: hashedPassword,
        role: "user"
    };

    //3. send user to database
    const result= await dbConnect("users").insertOne(newUser);

    if(result.acknowledged)
        return{
            success: true,
            message: "User created successfully"
        };

    return {
        success: false,
        message: "User creation failed"
    };
    



}