"use client";

import React, { useState } from "react";
import swal from "sweetalert2";

export default function Register() { // ประกาศ component ชื่อ Register
  const [form, setForm] = useState({ // สร้าง state ชื่อ form ไว้เก็บค่าที่ผู้ใช้กรอก
    txt_firstname: "", // ค่าเริ่มต้นของชื่อ = ว่าง
    txt_lastname: "", // ค่าเริ่มต้นของนามสกุล = ว่าง
    txt_username: "", // ค่าเริ่มต้นของชื่อผู้ใช้ = ว่าง
    txt_password: "", // ค่าเริ่มต้นของรหัสผ่าน = ว่าง
  });

  const handleChange = (e) => { // ฟังก์ชันทำงานทุกครั้งที่ผู้ใช้พิมพ์ใน input
    setForm ({ // อัปเดต state form
      ...form, // คงค่าเดิมทั้งหมดไว้ก่อน
      [e.target.name]: e.target.value, // แล้วเปลี่ยนเฉพาะ field ที่ตรงกับ name ของ input นั้น
    });
  };

  const handleSubmit = async (e) => { // ฟังก์ชันทำงานตอนกด submit ฟอร์ม (เป็น async เพราะต้องรอ fetch)
    e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บ reload เมื่อ submit ฟอร์ม (ค่า default ของ browser)
    console.log("Form Data :", form); // แสดงค่าฟอร์มปัจจุบันใน console เพื่อ debug
    try {
      const res = await fetch("https://api.itdev.cmtc.ac.th/users", { // ส่ง request ไปยัง API เพื่อสมัครสมาชิก
        method: "POST", // ใช้ method POST เพราะเป็นการสร้างข้อมูลใหม่
        headers: {
          "Content-Type": "application/json", // บอก server ว่าข้อมูลที่ส่งไปเป็นรูปแบบ JSON
        },
        body: JSON.stringify({ // แปลง object เป็น JSON string เพื่อส่งไปกับ request
          firstname: form.txt_firstname, // ส่งค่าชื่อจาก state
          lastname: form.txt_lastname, // ส่งค่านามสกุลจาก state
          username: form.txt_username, // ส่งค่าชื่อผู้ใช้จาก state
          password: form.txt_password, // ส่งค่ารหัสผ่านจาก state
        }),
      });

      const result = await res.json(); // แปลง response ที่ได้กลับมาให้เป็น JS object

      if (res.ok) {// สำเร็จ status 201
        await swal.fire({
          icon: "success",
          title: `บันทึกข้อมูลสำเร็จ (status: ${res.status})`,
          text: "บันทึกข้อมูลผู้ใช้งานเรียบร้อยแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#4f46e5",
        });

      } else if (res.status === 400) { // ถ้า status เป็น 400 (ข้อมูลที่ส่งไปไม่ถูกต้อง)

        await swal.fire({ // validation error status 400
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${res.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#e0e546",
        });

      } else if (res.status === 500) { // ถ้า status เป็น 500 (server มีปัญหา)

        await swal.fire({ // server error status 500
          icon: "error",
          title: `เกิดข้อผิดพลาด (status: ${res.status})`,
          text: result.message || "เซิร์ฟเวอร์มีปัญหา",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#e54646",
        });
      }

    } catch (error) { // ดักจับกรณี fetch ล้มเหลว เช่น เน็ตหลุด หรือเรียก API ไม่ได้เลย
      await swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเชิฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#e54646",
      });
    }
  };

  return ( // ส่วนแสดงผล UI ของฟอร์ม
    <div
  className="relative min-h-screen overflow-hidden flex items-center justify-center p-6 bg-cover bg-center"
  style={{ backgroundImage: "url('/image.png')" }}
>
      {/* กล่องหลักเต็มหน้าจอ พื้นหลังไล่สี และจัดฟอร์มไว้กึ่งกลาง */}

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white/85 backdrop-blur-xl shadow-xl border border-white/60 overflow-hidden">
        {/* การ์ดสีขาวโปร่งแสงที่ครอบฟอร์มทั้งหมด */}

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-200 via-rose-200 to-pink-300 px-8 pt-10 pb-14 text-center relative shadow-lg shadow-pink-200">
          {/* ส่วนหัวการ์ด พื้นหลังไล่สีน้ำเงิน-ม่วง */}
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Register
          </h1>
          {/* หัวข้อใหญ่ของฟอร์ม */}
          <p className="text-blue-100/90 text-sm mt-1.5">
            สมัครสมาชิกเพื่อเริ่มต้นใช้งาน
          </p>
          {/* คำอธิบายสั้นๆ ใต้หัวข้อ */}
          <div className="relative z-10">
           {/* Card */}
            </div>

          {/* Icon */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            {/* จัดตำแหน่งไอคอนให้ลอยอยู่กึ่งกลางขอบล่างของ header */}
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl border-4 border-white">
              ❤️
            </div>
            {/* วงกลมสีขาวใส่ emoji คนไว้เป็นไอคอนตกแต่ง */}
          </div>
        </div>
        {/* Floating Hearts */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="pt-12 pb-8 px-8 space-y-4">
          {/* แท็ก form เมื่อกด submit จะเรียก handleSubmit */}
            <div>
                <label className="block text-sm text-black font-medium mb-1.5">🌸 ชื่อ</label>
                {/* label กำกับช่องกรอกชื่อ */}
                <input type="text" name="txt_firstname" defaultValue={""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black" />
                {/* ช่องกรอกชื่อ, name ตรงกับ key ใน state, onChange อัปเดต state ทุกครั้งที่พิมพ์ */}

                <label className="block text-sm text-black font-medium mb-1.5">🩷 นามสกุล</label>
                {/* label กำกับช่องกรอกนามสกุล */}
                <input type="text" name="txt_lastname" defaultValue={""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black" />
                {/* ช่องกรอกนามสกุล ทำงานเหมือนช่องชื่อด้านบน */}

                <label className="block text-sm text-black font-medium mb-1.5">👤 ชื่อผู้ใช้</label>
                {/* label กำกับช่องกรอกชื่อผู้ใช้ */}
                <input type="text" name="txt_username" defaultValue={""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black" />
                {/* ช่องกรอกชื่อผู้ใช้ (username) สำหรับเข้าสู่ระบบ */}

                <label className="block text-sm text-black font-medium mb-1.5">🔒 รหัสผ่าน</label>
                {/* label กำกับช่องกรอกรหัสผ่าน */}
                <input type="password" name="txt_password" defaultValue={""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black" />
                {/* ช่องกรอกรหัสผ่าน type="password" จะซ่อนตัวอักษรที่พิมพ์ */}
            </div>
<div className="absolute top-10 left-10 text-pink-300 text-5xl animate-pulse">
  💖
</div>

<div className="absolute top-24 right-20 text-pink-200 text-4xl animate-bounce">
  🌸
</div>

<div className="absolute bottom-16 left-20 text-pink-300 text-3xl animate-pulse">
  ✨
</div>

<div className="absolute bottom-20 right-10 text-pink-200 text-5xl animate-bounce">
  🎀
</div>
          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-pink-300 via-pink-400 to-purple-300 text-white font-semibold text-sm shadow-md shadow-pink-200 transition-all duration-200 hover:shadow-lg hover:shadow-pink-300 hover:brightness-105 active:scale-[0.98]"
          >
            บันทึกข้อมูล
          </button>
<div className="text-center text-pink-400 text-xs mt-5">
🌸 Made with Love 🌸
</div>
          {/* ปุ่มกดส่งฟอร์ม type="submit" จะ trigger onSubmit ของ form ด้านบน */}
        </form>
      </div>
    </div>
  );
}