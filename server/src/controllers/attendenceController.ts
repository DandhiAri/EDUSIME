// import { ObjectId } from "mongodb";
// import { Request,Response } from "express";
// import { attendenceRepository } from "../repositories/attendence";
// import { Attendence } from "../models/attendence";
// // import { updateAttendenceSchema, createAttendenceSchema } from "@shareit/shared"
// import type { Attendence as AttendenceResponse } from "@shareit/shared"

// function toAttendenceResponse(attendence: Attendence): AttendenceResponse {
//     return {
//         _id: attendence._id.toString(),
//         tanggal : attendence.tanggal,
//         status : attendence.status,
//         keterangan : attendence.keterangan,
//         studentId : attendence.studentId.toString(),
//         classroomId : attendence.classroomId.toString(),
//     }
// }

// export async function updateAttendence(req: Request, res: Response) {
//     const {id} = req.params;
//     if (!id || Array.isArray(id)) {
//         return res.status(400).json({
//             message: "Id tidak valid"
//         })
//     }
//     const parsed = updateAttendenceSchema.safeParse(req.body)
//     if (!parsed.success) {
//         return res.status(400).json({
//             message: "Data tidak valid",
//             details: parsed.error.flatten()
//         })
//     }
//     try {
//         const result = await attendenceRepository.update(id, {
//             ...parsed.data,
//             updatedAt: new Date(),
//         });
//         if (result.matchedCount === 0) {
//             return res.status(404).json({
//                 message: "Absen tidak ditemukan"
//             })
//         }
//         res.json({
//             message: "Absen berhasil diperbaharui"
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Gagal memperbaharui absen"
//         })
//     }
// }

// export async function createAttendence(req:Request, res: Response) {
//     const parsed = createAttendenceSchema.safeParse(req.body);
//     if (!parsed.success) {
//         return res.status(400).json({
//             message: "Data tidak valid",
//             details: parsed.error.flatten(),
//         })
//     }
//     try {
        
//     } catch (error) {
        
//     }
// }