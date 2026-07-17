import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 text-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            MyWebsiteWithMumudayz
          </Link>

          {/* Menu */}
          <div className="flex gap-6">
            <Link
              href="/"
              className="hover:text-yellow-300 transition"
            >
              หน้าแรก
            </Link>

            <Link
              href="/about"
              className="hover:text-yellow-300 transition"
            >
              เกี่ยวกับ
            </Link>

            <Link
              href="/service"
              className="hover:text-yellow-300 transition"
            >
              บริการของเรา
            </Link>

            <Link
              href="/contact"
              className="hover:text-yellow-300 transition"
            >
              ติดต่อ
            </Link>

                        <Link
              href="/register"
              className="hover:text-yellow-300 transition"
            >
              สมัครสมาชิก
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
}