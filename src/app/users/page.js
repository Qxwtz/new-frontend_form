async function getUsers() {
    try {
    console.log("กำลังเชื่อมต่อ API...");
    const res = await fetch('https://api.itdev.cmtc.ac.th/users');
   
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("ไม่พบข้อมูลผู้ใช้งานนี้ (404 Not Found)");
      } else if (res.status === 500) {
        throw new Error("เซิร์ฟเวอร์มีปัญหา (500 Internal Server Error)");
      } else {
        throw new Error(`เกิดข้อผิดพลาดจากการเชื่อมต่อ (Status: ${res.status})`);
      }
    }

    const data = await res.json();
    return data;

  } catch (error) {
    // จัดการข้อผิดพลาดและแสดงผลใน Console
    console.log("เกิดข้อผิดพลาด:", error.message);

    // ตรวจสอบชนิดของ Error (เช่น Network ล่ม หรือ เราโยน Error ขึ้นมาเอง)
    if (error.name === 'TypeError') {
      console.log("สาเหตุ: Network Error (เน็ตหลุด หรือ URL ไม่มีอยู่จริง)");
    } else {
      console.log("สาเหตุ:", error.message);
    }
   
    return []; // คืนค่าเป็น Array ว่างกลับไป เพื่อไม่ให้หน้าเว็บพัง
  }
}

// 2. Component หลัก (สังเกตว่ามีการเติมคำว่า async หน้าฟังก์ชัน)
export default async function UsersPage() {
  // สั่งให้รอ (await) ข้อมูลจากฟังก์ชัน getUsers() ให้เสร็จก่อน
  const users = await getUsers();
  console.log(users);
  return (
    <div>
        User List
    </div>
  );
}