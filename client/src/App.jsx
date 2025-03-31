import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import TripList from './components/TripList';

function App() {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // เพิ่มการจัดการหน้า
  const [totalPages, setTotalPages] = useState(1); // จำนวนหน้าทั้งหมด
  const apiUrl = 'http://localhost:4001/trips';

  useEffect(() => {
    fetchTrips('');
  }, []);

  const fetchTrips = async (keywords, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}?keywords=${keywords}&page=${page}`);
      setTrips(response.data.data);
      setTotalPages(response.data.totalPages); // ตั้งค่าจำนวนหน้า
    } catch (err) {
      setError(`เกิดข้อผิดพลาด: ${err.response ? err.response.status : 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์'}`);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = () => {
    fetchTrips(searchTerm.trim(), 1); // เริ่มต้นหน้าแรกเมื่อค้นหา
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('คัดลอกลิงก์เรียบร้อย!');
  };

  const handleTagClick = (tag) => {
    const updatedSearchTerm = searchTerm.trim() ? `${searchTerm} ${tag}` : tag;
    setSearchTerm(updatedSearchTerm);
    fetchTrips(updatedSearchTerm, 1); // ทำการค้นหาด้วยคำค้นหาที่อัปเดตและเริ่มต้นที่หน้า 1
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      fetchTrips(searchTerm, page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchTrips(searchTerm, page - 1);
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <header className="bg-white py-8 text-center">
        <h1 className="text-3xl font-bold text-blue-500">เที่ยวไหนดี</h1>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchInputChange}
          onSearchClick={handleSearchButtonClick}
        />
      </header>

      <main className="bg-white py-8 px-4 md:px-16 max-w-4xl mx-auto">
        {loading && <p className="text-center text-gray-600">กำลังโหลดข้อมูล...</p>}
        {error && <p className="text-center text-red-500">เกิดข้อผิดพลาด: {error}</p>}
        {trips.length === 0 && !loading && <p className="text-center text-gray-600">ไม่พบผลลัพธ์</p>}

        <TripList trips={trips} copyToClipboard={copyToClipboard} handleTagClick={handleTagClick} />

        {/* ปุ่มสำหรับเปลี่ยนหน้า */}
        {trips.length > 0 && (
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={handlePrevPage} disabled={page === 1} className="text-blue-500">
              ก่อนหน้า
            </button>
            <span>หน้า {page} จาก {totalPages}</span>
            <button onClick={handleNextPage} disabled={page === totalPages} className="text-blue-500">
              ถัดไป
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
