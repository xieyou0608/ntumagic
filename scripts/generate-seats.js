// 從舊專案 routes/generate_seats.js 移植過來，去掉 Mongoose 相關欄位。
// 換劇場時改這支即可，DB schema / API / 前端都不用動。
//
// 一樓佔 44 col x 17 row（依舊系統慣例）；二樓接在後面。
// 只有 area ∈ {S, A, B, C} 的座位最後會被寫入 Firestore；其他 X/M/T/F/D 是
// layout placeholder，種子腳本會過濾掉。

function generateSeats() {
  const seats = [];
  const push = (s) => seats.push({ ...s, sold: 0 });

  // ===== first floor =====
  // row 1
  for (let j = 29; j >= 23; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 21; j >= 9; j -= 2) push({ area: "S", row: 1, col: j });
  push({ area: "M", row: 1, col: 0 });
  for (let j = 0; j < 5; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 1, col: 0 });
  for (let j = 7; j >= 1; j -= 2) push({ area: "S", row: 1, col: j });
  for (let j = 2; j <= 6; j += 2) push({ area: "S", row: 1, col: j });
  push({ area: "M", row: 1, col: 0 });
  for (let j = 0; j < 6; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 1, col: 0 });
  for (let j = 8; j <= 20; j += 2) push({ area: "S", row: 1, col: j });
  for (let j = 22; j <= 28; j += 2) push({ area: "X", row: 0, col: j });

  // row 2
  for (let j = 29; j >= 23; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 21; j >= 9; j -= 2) push({ area: "S", row: 2, col: j });
  push({ area: "M", row: 2, col: 0 });
  for (let j = 0; j < 5; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 2, col: 0 });
  for (let j = 7; j >= 1; j -= 2) push({ area: "S", row: 2, col: j });
  for (let j = 2; j <= 8; j += 2) push({ area: "S", row: 2, col: j });
  push({ area: "M", row: 2, col: 0 });
  for (let j = 0; j < 5; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 2, col: 0 });
  for (let j = 10; j <= 22; j += 2) push({ area: "S", row: 2, col: j });
  for (let j = 24; j <= 30; j += 2) push({ area: "X", row: 0, col: j });

  // row 3
  for (let j = 31; j >= 27; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 25; j >= 19; j -= 2) push({ area: "B", row: 3, col: j });
  for (let j = 17; j >= 11; j -= 2) push({ area: "A", row: 3, col: j });
  push({ area: "M", row: 3, col: 0 });
  for (let j = 0; j < 4; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 3, col: 0 });
  for (let j = 9; j >= 1; j -= 2) push({ area: "A", row: 3, col: j });
  for (let j = 2; j <= 8; j += 2) push({ area: "A", row: 3, col: j });
  push({ area: "M", row: 3, col: 0 });
  for (let j = 0; j < 5; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 3, col: 0 });
  for (let j = 10; j <= 16; j += 2) push({ area: "A", row: 3, col: j });
  for (let j = 18; j <= 24; j += 2) push({ area: "B", row: 3, col: j });
  for (let j = 26; j <= 30; j += 2) push({ area: "X", row: 0, col: j });

  // row 4
  for (let j = 31; j >= 27; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 25; j >= 21; j -= 2) push({ area: "B", row: 4, col: j });
  for (let j = 19; j >= 11; j -= 2) push({ area: "A", row: 4, col: j });
  push({ area: "M", row: 4, col: 0 });
  for (let j = 0; j < 4; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 4, col: 0 });
  for (let j = 9; j >= 1; j -= 2) push({ area: "A", row: 4, col: j });
  for (let j = 2; j <= 10; j += 2) push({ area: "A", row: 4, col: j });
  push({ area: "M", row: 4, col: 0 });
  for (let j = 0; j < 4; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 4, col: 0 });
  for (let j = 12; j <= 20; j += 2) push({ area: "A", row: 4, col: j });
  for (let j = 22; j <= 26; j += 2) push({ area: "B", row: 4, col: j });
  for (let j = 28; j <= 32; j += 2) push({ area: "X", row: 0, col: j });

  // row 5
  for (let j = 33; j >= 31; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 29; j >= 23; j -= 2) push({ area: "B", row: 5, col: j });
  for (let j = 21; j >= 13; j -= 2) push({ area: "A", row: 5, col: j });
  push({ area: "M", row: 5, col: 0 });
  for (let j = 0; j < 3; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 5, col: 0 });
  for (let j = 11; j >= 1; j -= 2) push({ area: "A", row: 5, col: j });
  for (let j = 2; j <= 10; j += 2) push({ area: "A", row: 5, col: j });
  push({ area: "M", row: 5, col: 0 });
  for (let j = 0; j < 4; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 5, col: 0 });
  for (let j = 12; j <= 20; j += 2) push({ area: "A", row: 5, col: j });
  for (let j = 22; j <= 28; j += 2) push({ area: "B", row: 5, col: j });
  for (let j = 30; j <= 32; j += 2) push({ area: "X", row: 0, col: j });

  // row 6
  for (let j = 33; j >= 31; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 29; j >= 25; j -= 2) push({ area: "B", row: 6, col: j });
  for (let j = 23; j >= 13; j -= 2) push({ area: "A", row: 6, col: j });
  push({ area: "M", row: 6, col: 0 });
  for (let j = 0; j < 3; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 6, col: 0 });
  for (let j = 11; j >= 1; j -= 2) push({ area: "A", row: 6, col: j });
  for (let j = 2; j <= 12; j += 2) push({ area: "A", row: 6, col: j });
  push({ area: "M", row: 6, col: 0 });
  for (let j = 0; j < 3; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 6, col: 0 });
  for (let j = 14; j <= 24; j += 2) push({ area: "A", row: 6, col: j });
  for (let j = 26; j <= 30; j += 2) push({ area: "B", row: 6, col: j });
  for (let j = 32; j <= 34; j += 2) push({ area: "X", row: 0, col: j });

  // row 7
  push({ area: "X", row: 0, col: 35 });
  for (let j = 33; j >= 27; j -= 2) push({ area: "B", row: 7, col: j });
  for (let j = 25; j >= 15; j -= 2) push({ area: "A", row: 7, col: j });
  push({ area: "M", row: 7, col: 0 });
  for (let j = 0; j < 2; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 7, col: 0 });
  for (let j = 13; j >= 1; j -= 2) push({ area: "A", row: 7, col: j });
  for (let j = 2; j <= 12; j += 2) push({ area: "A", row: 7, col: j });
  push({ area: "M", row: 7, col: 0 });
  for (let j = 0; j < 3; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 7, col: 0 });
  for (let j = 14; j <= 24; j += 2) push({ area: "A", row: 7, col: j });
  for (let j = 26; j <= 32; j += 2) push({ area: "B", row: 7, col: j });
  push({ area: "X", row: 0, col: 34 });

  // row 8
  push({ area: "X", row: 0, col: 35 });
  for (let j = 33; j >= 29; j -= 2) push({ area: "B", row: 8, col: j });
  for (let j = 27; j >= 15; j -= 2) push({ area: "A", row: 8, col: j });
  push({ area: "M", row: 8, col: 0 });
  for (let j = 0; j < 2; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 8, col: 0 });
  for (let j = 13; j >= 1; j -= 2) push({ area: "A", row: 8, col: j });
  for (let j = 2; j <= 14; j += 2) push({ area: "A", row: 8, col: j });
  push({ area: "M", row: 8, col: 0 });
  for (let j = 0; j < 2; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 8, col: 0 });
  for (let j = 16; j <= 28; j += 2) push({ area: "A", row: 8, col: j });
  for (let j = 30; j <= 34; j += 2) push({ area: "B", row: 8, col: j });
  push({ area: "X", row: 0, col: 36 });

  // row 9
  for (let j = 37; j >= 31; j -= 2) push({ area: "B", row: 9, col: j });
  for (let j = 29; j >= 17; j -= 2) push({ area: "A", row: 9, col: j });
  push({ area: "M", row: 9, col: 0 });
  push({ area: "X", row: 0, col: 0 });
  push({ area: "M", row: 9, col: 0 });
  for (let j = 15; j >= 1; j -= 2) push({ area: "A", row: 9, col: j });
  for (let j = 2; j <= 14; j += 2) push({ area: "A", row: 9, col: j });
  push({ area: "M", row: 9, col: 0 });
  for (let j = 0; j < 2; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 9, col: 0 });
  for (let j = 16; j <= 28; j += 2) push({ area: "A", row: 9, col: j });
  for (let j = 30; j <= 36; j += 2) push({ area: "B", row: 9, col: j });

  // row 10
  for (let j = 37; j >= 17; j -= 2) push({ area: "B", row: 10, col: j });
  push({ area: "M", row: 10, col: 0 });
  push({ area: "X", row: 0, col: 0 });
  push({ area: "M", row: 10, col: 0 });
  for (let j = 15; j >= 1; j -= 2) push({ area: "A", row: 10, col: j });
  for (let j = 2; j <= 16; j += 2) push({ area: "A", row: 10, col: j });
  push({ area: "M", row: 10, col: 0 });
  push({ area: "X", row: 0, col: 0 });
  push({ area: "M", row: 10, col: 0 });
  for (let j = 18; j <= 38; j += 2) push({ area: "B", row: 10, col: j });

  // row 11
  for (let j = 39; j >= 37; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 35; j >= 19; j -= 2) push({ area: "B", row: 11, col: j });
  push({ area: "M", row: 11, col: 0 });
  push({ area: "M", row: 11, col: 0 });
  for (let j = 17; j >= 1; j -= 2) push({ area: "A", row: 11, col: j });
  for (let j = 2; j <= 16; j += 2) push({ area: "A", row: 11, col: j });
  push({ area: "M", row: 11, col: 0 });
  push({ area: "X", row: 0, col: 0 });
  push({ area: "M", row: 11, col: 0 });
  for (let j = 18; j <= 34; j += 2) push({ area: "B", row: 11, col: j });
  for (let j = 36; j <= 38; j += 2) push({ area: "X", row: 0, col: j });

  // padding row（保留與舊系統一致的版面長度）
  for (let j = 0; j < 88; j++) push({ area: "X", row: 0, col: j });

  // row 12
  for (let j = 0; j < 11; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 12, col: 0 });
  push({ area: "X", row: 0, col: 0 });
  for (let j = 17; j >= 1; j -= 2) push({ area: "B", row: 12, col: j });
  for (let j = 2; j <= 18; j += 2) push({ area: "B", row: 12, col: j });
  push({ area: "X", row: 0, col: 0 });
  push({ area: "M", row: 12, col: 0 });
  for (let j = 0; j < 11; j++) push({ area: "X", row: 0, col: j });

  // row 13
  for (let j = 0; j < 11; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 13, col: 0 });
  for (let j = 19; j >= 1; j -= 2) push({ area: "B", row: 13, col: j });
  for (let j = 2; j <= 18; j += 2) push({ area: "B", row: 13, col: j });
  push({ area: "X", row: 0, col: 0 });
  push({ area: "M", row: 13, col: 0 });
  for (let j = 0; j < 11; j++) push({ area: "X", row: 0, col: j });

  // row 14
  for (let j = 0; j < 11; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 14, col: 0 });
  for (let j = 19; j >= 1; j -= 2) push({ area: "B", row: 14, col: j });
  for (let j = 2; j <= 20; j += 2) push({ area: "B", row: 14, col: j });
  push({ area: "M", row: 14, col: 0 });
  for (let j = 0; j < 11; j++) push({ area: "X", row: 0, col: j });

  // row 15
  for (let j = 0; j < 11; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 15, col: 0 });
  for (let j = 0; j < 2; j++) push({ area: "X", row: 0, col: j });
  for (let j = 15; j >= 7; j -= 2) push({ area: "B", row: 15, col: j });
  push({ area: "M", row: 15, col: 0 });
  for (let j = 0; j < 4; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 15, col: 0 });
  for (let j = 8; j <= 16; j += 2) push({ area: "B", row: 15, col: j });
  for (let j = 0; j < 2; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 15, col: 0 });
  for (let j = 0; j < 11; j++) push({ area: "X", row: 0, col: j });

  // ===== second floor =====
  // row 1
  for (let j = 35; j >= 25; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 23; j >= 21; j -= 2) push({ area: "S", row: 1, col: j });
  for (let j = 19; j >= 15; j -= 2) push({ area: "C", row: 1, col: j });
  push({ area: "M", row: 1, col: 0 });
  for (let j = 0; j < 2; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 1, col: 0 });
  for (let j = 13; j >= 1; j -= 2) push({ area: "C", row: 1, col: j });
  for (let j = 2; j <= 12; j += 2) push({ area: "C", row: 1, col: j });
  push({ area: "M", row: 1, col: 0 });
  for (let j = 0; j < 3; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 1, col: 0 });
  for (let j = 14; j <= 18; j += 2) push({ area: "C", row: 1, col: j });
  for (let j = 20; j <= 22; j += 2) push({ area: "S", row: 1, col: j });
  for (let j = 24; j <= 34; j += 2) push({ area: "X", row: 0, col: j });

  // row 2
  for (let j = 29; j >= 27; j -= 2) push({ area: "S", row: 2, col: j });
  for (let j = 0; j < 3; j++) push({ area: "X", row: 0, col: j });
  for (let j = 25; j >= 21; j -= 2) push({ area: "S", row: 2, col: j });
  for (let j = 19; j >= 15; j -= 2) push({ area: "C", row: 2, col: j });
  push({ area: "M", row: 2, col: 0 });
  for (let j = 0; j < 2; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 2, col: 0 });
  for (let j = 13; j >= 1; j -= 2) push({ area: "C", row: 2, col: j });
  for (let j = 2; j <= 14; j += 2) push({ area: "C", row: 2, col: j });
  push({ area: "M", row: 2, col: 0 });
  for (let j = 0; j < 2; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 2, col: 0 });
  for (let j = 16; j <= 20; j += 2) push({ area: "C", row: 2, col: j });
  for (let j = 22; j <= 26; j += 2) push({ area: "S", row: 2, col: j });
  for (let j = 0; j < 3; j++) push({ area: "X", row: 0, col: j });
  for (let j = 28; j <= 30; j += 2) push({ area: "S", row: 2, col: j });

  // row 3
  for (let j = 37; j >= 23; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 21; j >= 17; j -= 2) push({ area: "C", row: 3, col: j });
  push({ area: "M", row: 3, col: 0 });
  push({ area: "X", row: 0, col: 0 });
  push({ area: "M", row: 3, col: 0 });
  for (let j = 15; j >= 1; j -= 2) push({ area: "C", row: 3, col: j });
  for (let j = 2; j <= 14; j += 2) push({ area: "C", row: 3, col: j });
  push({ area: "M", row: 3, col: 0 });
  for (let j = 0; j < 2; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 3, col: 0 });
  for (let j = 16; j <= 20; j += 2) push({ area: "C", row: 3, col: j });
  for (let j = 22; j <= 36; j += 2) push({ area: "X", row: 0, col: j });

  // padding
  for (let j = 0; j < 44; j++) push({ area: "X", row: 0, col: j });

  // row 4
  for (let j = 31; j >= 15; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 13; j >= 11; j -= 2) push({ area: "S", row: 4, col: j });
  push({ area: "M", row: 4, col: 0 });
  for (let j = 0; j < 4; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 4, col: 0 });
  for (let j = 9; j >= 1; j -= 2) push({ area: "S", row: 4, col: j });
  for (let j = 2; j <= 6; j += 2) push({ area: "S", row: 4, col: j });
  push({ area: "M", row: 4, col: 0 });
  for (let j = 0; j < 6; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 4, col: 0 });
  for (let j = 8; j <= 10; j += 2) push({ area: "S", row: 4, col: j });
  for (let j = 12; j <= 28; j += 2) push({ area: "X", row: 0, col: j });

  // row 5
  for (let j = 31; j >= 17; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 15; j >= 11; j -= 2) push({ area: "S", row: 5, col: j });
  push({ area: "M", row: 5, col: 0 });
  for (let j = 0; j < 4; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 5, col: 0 });
  for (let j = 9; j >= 1; j -= 2) push({ area: "S", row: 5, col: j });
  for (let j = 2; j <= 8; j += 2) push({ area: "S", row: 5, col: j });
  push({ area: "M", row: 5, col: 0 });
  for (let j = 0; j < 5; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 5, col: 0 });
  for (let j = 10; j <= 14; j += 2) push({ area: "S", row: 5, col: j });
  for (let j = 16; j <= 30; j += 2) push({ area: "X", row: 0, col: j });

  // row 6
  for (let j = 31; j >= 15; j -= 2) push({ area: "X", row: 0, col: j });
  for (let j = 13; j >= 11; j -= 2) push({ area: "S", row: 6, col: j });
  push({ area: "M", row: 6, col: 0 });
  for (let j = 0; j < 20; j++) push({ area: "X", row: 0, col: j });
  push({ area: "M", row: 6, col: 0 });
  for (let j = 10; j <= 12; j += 2) push({ area: "S", row: 6, col: j });
  for (let j = 14; j <= 30; j += 2) push({ area: "X", row: 0, col: j });

  // 標 floor：前 44*17 是一樓，其餘是二樓（與舊系統一致）
  const FLOOR_BREAK = 44 * 17;
  for (let i = 0; i < seats.length; i++) {
    seats[i].floor = i < FLOOR_BREAK ? 1 : 2;
  }

  // sortIndex 給 GET /api/seats 的 orderBy 用，前端 array slice 才能對齊 layout 順序。
  // 取代舊 Mongo 系統靠 ObjectId 時間戳 + sort({_id:1}) 隱性對齊 insertion order 的機制。
  // doc id 我們用 Firestore auto-id（見 seed-seats.js），所以 row/col 無唯一性需求，
  // X / M 維持原本「沒有座號」的語意（X row=0/col=借的，M row=真實排數/col=0）。
  for (let i = 0; i < seats.length; i++) {
    seats[i].sortIndex = i;
  }
  return seats;
}

module.exports = { generateSeats };
